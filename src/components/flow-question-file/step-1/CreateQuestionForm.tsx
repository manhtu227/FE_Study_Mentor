import images from '@assets/images';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { starOptions } from '@core/constants/options.contanst';
import { useGetLevels } from '@core/hooks/options/useGetLevels';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import {
    CreateFileQuestionReducer,
    CreateFileQuestionRequestModel,
    ICalculatePriceRequestModel,
    QuestionInput,
} from '@core/models/question.model';
import { PaymentReq, PaymentType, paymemtSystemApi } from '@core/services/payment.service';
import {
    ConvertGradeToOption,
    ConvertLevelToOption,
    ConvertSubjectToOption,
    calculatePriceQuestions,
    createQuestions,
} from '@core/services/questions.service';
import { getListVoucherApi, voucherKeys } from '@core/services/user.service';
import { RootState } from '@core/store';
import { addQuestion, setCurrentQuestionId } from '@core/store/reducers/question.reducer';
import { formatPriceVND } from '@core/utilities/caculate-price.utility';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastError, toastSuccess } from '@core/utilities/toast.utility';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Image, Modal, Popover, Select, Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomEditorInput } from '../../form-input/CustomEditorInput';
import PopoverVoucher from './PopoverVoucher';
import { VoucherItem } from './VoucherItem';

type Props = {
    isGoogleMeet?: boolean;
};

function CreateQuestionForm({ isGoogleMeet }: Props) {
    const [form] = Form.useForm<QuestionInput>();
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [isOpenVoucher, setIsOpenVoucher] = useState<boolean>(false);
    const router = useRouter();

    const levelData = useGetLevels();
    const levelOptions = levelData?.map(ConvertLevelToOption) ?? [];
    // Filter grades based on selected levels
    const filteredGrades = levelData?.find((level) => level.id === selectedLevel)?.grades ?? [];
    const gradeOptions = filteredGrades.map(ConvertGradeToOption);
    const subjectData = filteredGrades.find((grade) => grade.id === selectedGrade)?.subjects ?? [];
    const subjectOptions = subjectData?.map(ConvertSubjectToOption) ?? [];
    const questionId = useSelector((state: RootState) => state.questions.currentQuestionId);
    const dispatch = useDispatch();

    /* create question api */
    const mutateCreateQuestions = useMutation({
        mutationFn: (data: CreateFileQuestionRequestModel) => createQuestions(data),
        onError: handleError,
    });

    /* caculate price question api */
    const mutateCaculatePrice = useMutation({
        mutationFn: (data: ICalculatePriceRequestModel) => calculatePriceQuestions(data),
        onSuccess: () => {
            if (isOpenVoucher) {
                setIsOpenVoucher(false);
            }

            toastSuccess('Tính giá tiền thành công');
        },
        onError: handleError,
    });

    // create new payment request api
    const mutateCreatePaymentRequest = useMutation({
        mutationFn: (body: PaymentReq) => paymemtSystemApi(body),
        onSuccess: (resp) => {
            toastSuccess('Tạo yêu cầu thanh toán thành công');
            router.push(resp.data.data.checkoutUrl);
        },
        onError: handleError,
    });

    const voucherQuery = useQuery({
        queryKey: voucherKeys.all,
        queryFn: () => getListVoucherApi(),
        select: (resp) => resp.data.data,
    });

    /* Handler */
    const { data } = useSession();
    const file = useUploadFileApi();
    const handleSubmit = async (values: QuestionInput) => {
        const request: ICalculatePriceRequestModel = {
            level:
                (levelOptions.find((level) => level.value === selectedLevel)?.label as string) ||
                '',
            numberOfStar: values.tutorRating,
            timeFindTutor: values.timeAnswer,
            voucherCode: values.voucher,
        };
        mutateCaculatePrice.mutate(request);

        // onNext();
    };

    const handleChangeLevels = (newLevel: string) => {
        setSelectedLevel(newLevel);
        form.setFieldsValue({ levelId: newLevel });

        handleUpdateGradesWhenChanging();
        handleUpdateSubjectsWhenChanging();
    };

    const handleChangeGrades = (newGrades: string) => {
        setSelectedGrade(newGrades);
        form.setFieldsValue({ gradeId: newGrades });

        handleUpdateSubjectsWhenChanging();
    };

    const handleUpdateSubjectsWhenChanging = () => {
        setSelectedSubject('');
        form.setFieldsValue({ subjectId: undefined });
    };

    const handleUpdateGradesWhenChanging = () => {
        setSelectedGrade('');
        form.setFieldsValue({ gradeId: undefined });
    };

    const handleChangeSubjects = (value: string) => {
        setSelectedSubject(value);
        form.setFieldsValue({ subjectId: value });
    };

    const handleSubmitPayment = async () => {
        const values = form.getFieldsValue();
        const attachFiles = file && (await file.uploadMultipleFiles(values?.attachFiles?.fileList));
        const requestCreate: CreateFileQuestionRequestModel = {
            userId: data?.user.user.id || '',
            subjectId: selectedSubject,
            timeFindTutor: values.timeAnswer,
            numberOfStar: values.tutorRating,
            content: values.content,
            attachFiles: attachFiles,
            title: values.title,
            voucherCode: values.voucher,
            timeMeeting: values.timeForAnswerQuestion,
        };

        mutateCreateQuestions.mutate(requestCreate, {
            onSuccess: (resp) => {
                const requestReducer: CreateFileQuestionReducer = requestCreate;
                requestReducer.questionId = resp.data.data.questionId;
                dispatch(addQuestion(requestReducer));
                dispatch(setCurrentQuestionId(requestReducer.questionId!));

                // handle create payment request
                const cancelUrl = `${window.location.origin}${window.location.pathname}?step=0`;
                const returnUrl = `${window.location.origin}${window.location.pathname}?step=1`;

                mutateCreatePaymentRequest.mutate({
                    questionId: resp.data.data.questionId!,
                    type: PaymentType.QUESTION,
                    cancelUrl: cancelUrl,
                    returnUrl: returnUrl,
                });
            },
        });
    };

    return (
        <Spin spinning={mutateCreateQuestions.isPending || file.isFetching}>
            <div className='p-8 bg-white-900'>
                {isGoogleMeet ? (
                    <h2 className='text-3xl leading-[27px] text-center'>
                        Trả lời thông qua Google meet
                    </h2>
                ) : (
                    <div className='w-full font-bold text-lg text-black mb-8'>Nội dung câu hỏi</div>
                )}
                {!isGoogleMeet && (
                    <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8'>
                        <Image
                            src={images.createQuestion.src}
                            alt='Create a new question'
                            className='w-full h-full object-cover'
                            preview={false}
                        />
                    </div>
                )}
                <Form name='questionForm' onFinish={handleSubmit} form={form} autoComplete='off'>
                    <div className='flex w-full gap-8'>
                        <div className='w-full'>
                            {/* Question level */}
                            <Form.Item className='mb-2'>
                                <div className='font-bold text-base mb-2'>Cấp độ câu hỏi</div>
                                <div className='flex items-center justify-between h-max'>
                                    <Form.Item<QuestionInput>
                                        name='levelId'
                                        style={{
                                            display: 'inline-block',
                                            width: '30%',
                                            height: 'max-content',
                                        }}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập giá trị!' },
                                        ]}
                                    >
                                        <Select
                                            className='h-12 font-medium text-base'
                                            placeholder='Chọn cấp học'
                                            options={levelOptions}
                                            onChange={handleChangeLevels}
                                        />
                                    </Form.Item>
                                    <Form.Item<QuestionInput>
                                        name='gradeId'
                                        style={{
                                            display: 'inline-block',
                                            width: '30%',
                                        }}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập giá trị!' },
                                        ]}
                                    >
                                        <Select
                                            className='h-12 font-medium text-base'
                                            placeholder='Chọn khối/ lớp'
                                            options={gradeOptions}
                                            onChange={handleChangeGrades}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='subjectId'
                                        style={{
                                            display: 'inline-block',
                                            width: '30%',
                                        }}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập giá trị!' },
                                        ]}
                                    >
                                        <Select
                                            className='h-12 font-medium text-base text-gray-700'
                                            placeholder='Chọn môn học/ kỹ năng'
                                            options={subjectOptions}
                                            onChange={handleChangeSubjects}
                                        />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            {/* Title question */}
                            <div className='font-bold text-base mb-2'>
                                Tiêu đề câu hỏi (mô tả ngắn)
                            </div>
                            <CustomTextInput<QuestionInput>
                                name='title'
                                classNameForm='mb-6'
                                rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                                placeholder='Nhập tiêu đề câu hỏi'
                            />
                            {/* Requirement for mentor */}
                            <div className='mb-2'>
                                <div className='font-bold text-base mb-2'>
                                    Yêu cầu cho người hướng dẫn
                                </div>
                                <Form.Item<QuestionInput>
                                    name='tutorRating'
                                    style={{
                                        display: 'inline-block',
                                        width: '100%',
                                    }}
                                    rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                                >
                                    <Select
                                        className='h-12 font-medium text-base'
                                        placeholder='Chọn số sao'
                                        options={starOptions}
                                    />
                                </Form.Item>
                            </div>
                            {/* Time for handle the question */}
                            <div className='font-bold text-base mb-2'>
                                Thời gian bạn muốn hệ thống tìm kiếm câu trả lời cho câu hỏi
                            </div>
                            <CustomSelectInput<QuestionInput>
                                name='timeAnswer'
                                showSearch
                                optionsSelect={[
                                    { value: 10, label: '10 phút' },
                                    { value: 15, label: '15 phút' },
                                    { value: 20, label: '20 phút' },
                                    { value: 30, label: '30 phút' },
                                    { value: 45, label: '45 phút' },
                                    { value: 60, label: '60 phút' },
                                ]}
                                rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                                placeholder='Chọn thời gian tìm kiếm câu trả lời cho câu hỏi'
                            />

                            {/* Time in Google meet*/}
                            {isGoogleMeet && (
                                <>
                                    <div className='font-bold text-base mb-2'>
                                        Thời gian giải đáp thắc mắc
                                    </div>
                                    <CustomSelectInput<QuestionInput>
                                        name='timeForAnswerQuestion'
                                        showSearch
                                        optionsSelect={[
                                            { value: 10, label: '10 phút' },
                                            { value: 15, label: '15 phút' },
                                            { value: 20, label: '20 phút' },
                                            { value: 30, label: '30 phút' },
                                            { value: 45, label: '45 phút' },
                                            { value: 60, label: '60 phút' },
                                        ]}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập giá trị!' },
                                        ]}
                                        placeholder='Chọn thời gian giải đáp thắc mắc'
                                    />
                                </>
                            )}

                            <Form.Item<QuestionInput> name={'voucher'} noStyle />

                            {/* Question content */}
                            <Form.Item className='mb-0'>
                                <div className='font-bold text-base mb-2'>Nội dung câu hỏi</div>
                                <CustomEditorInput<QuestionInput>
                                    name='content'
                                    rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                                />
                                <CustomDragDropFile<QuestionInput>
                                    name='attachFiles'
                                    // rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                                />
                            </Form.Item>
                        </div>
                        {isGoogleMeet && (
                            <div className='  '>
                                <img src={images.gg.src} alt='' />
                            </div>
                        )}
                    </div>

                    <div className='flex items-center justify-between '>
                        <Form.Item label=' ' colon={false}>
                            {mutateCaculatePrice.data?.data.data ? (
                                <Popover
                                    title='Chi tiết khuyến mãi'
                                    content={
                                        <PopoverVoucher
                                            priceDiscount={
                                                mutateCaculatePrice.data?.data.data.promoPrice
                                            }
                                            priceTotal={mutateCaculatePrice.data?.data.data.price}
                                        ></PopoverVoucher>
                                    }
                                >
                                    <Button
                                        type='primary'
                                        size='large'
                                        className='!h-12 font-bold text-base'
                                        disabled={!mutateCaculatePrice.data?.data.data.price}
                                        onClick={handleSubmitPayment}
                                    >
                                        Giá:{' '}
                                        {formatPriceVND(
                                            mutateCaculatePrice.data.data.data.promoPrice,
                                        )}
                                        &nbsp; | &nbsp; Thanh toán
                                    </Button>
                                </Popover>
                            ) : (
                                <Button
                                    type='primary'
                                    size='large'
                                    className='!h-12 font-bold text-base'
                                    disabled={!mutateCaculatePrice.data?.data.data.price}
                                    onClick={handleSubmitPayment}
                                >
                                    Giá: {formatPriceVND(0)} &nbsp; | &nbsp; Thanh toán
                                </Button>
                            )}
                        </Form.Item>
                        <Button
                            type='primary'
                            size='large'
                            htmlType='submit'
                            className='!h-12 font-bold text-base'
                        >
                            Xem phí
                        </Button>
                    </div>
                </Form>

                <div className='flex items-center gap-2 font-medium text-sm text-left text-[#313636]'>
                    <div>Bạn cảm thấy mức giá không phù hợp?</div>
                    <div
                        className='font-bold text-base text-primary-900 no-underline cursor-pointer'
                        onClick={() => setIsOpenVoucher(true)}
                    >
                        Lựa chọn mã giảm giá
                    </div>
                </div>
            </div>
            <Modal
                open={isOpenVoucher}
                onCancel={() => setIsOpenVoucher(false)}
                footer={null}
                width={500}
                centered
                title='Chọn mã khuyến mãi'
                className='px-4'
            >
                <div className='flex flex-col gap-3 w-full'>
                    {voucherQuery.data?.map((voucher, index) => {
                        return (
                            <VoucherItem
                                key={index}
                                percent={voucher.percentage}
                                quantity={voucher.quantity}
                                time={voucher.endDate}
                                onClick={() => {
                                    form.validateFields().then(
                                        (values) => {
                                            form.setFieldValue('voucher', voucher.code);
                                            values.voucher = voucher.code;
                                            handleSubmit(values);
                                        },
                                        () => {
                                            setIsOpenVoucher(false);
                                            toastError('Vui lòng nhập đầy đủ thông tin');
                                        },
                                    );
                                }}
                            />
                        );
                    })}
                </div>
            </Modal>
        </Spin>
    );
}

export default CreateQuestionForm;
