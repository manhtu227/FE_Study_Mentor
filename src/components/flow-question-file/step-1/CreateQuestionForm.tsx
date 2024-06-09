import images from '@assets/images';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { starOptions } from '@core/constants/options.contanst';
import { useGetLevels } from '@core/hooks/options/useGetLevels';
import { useUpdateStepApi } from '@core/hooks/useUpdateStepApi';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import { CreatePaymentRequestModel } from '@core/models/payment.model';
import {
    CreateFileQuestionReducer,
    CreateFileQuestionRequestModel,
    ICalculatePriceRequestModel,
    QuestionInput,
    QuestionStep,
} from '@core/models/question.model';
import { createNewPaymentRequestApi } from '@core/services/payment.service';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Modal, Popover, Select, Spin, message } from 'antd';
import { HmacSHA256 } from 'crypto-js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomEditorInput } from '../../form-input/CustomEditorInput';
import PopoverVoucher from './PopoverVoucher';
import { VoucherItem } from './VoucherItem';

function CreateQuestionForm() {
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
    const updateStepMutation = useUpdateStepApi();
    const questionId = useSelector((state: RootState) => state.questions.currentQuestionId);
    const dispatch = useDispatch();

    /* create question api */
    const mutateCreateQuestions = useMutation({
        mutationFn: (data: CreateFileQuestionRequestModel) => createQuestions(data),
    });

    /* caculate price question api */
    const mutateCaculatePrice = useMutation({
        mutationFn: (data: ICalculatePriceRequestModel) => calculatePriceQuestions(data),
        onSuccess: () => {
            if (isOpenVoucher) {
                setIsOpenVoucher(false);
            }
            message.open({
                type: 'success',
                content: 'Calculate price successfully',
            });
        },
    });

    // create new payment request api
    const mutateCreatePaymentRequest = useMutation({
        mutationFn: (data: CreatePaymentRequestModel) => createNewPaymentRequestApi(data),
        onSuccess: () => {
            message.open({
                type: 'success',
                content: 'Create new payment request successfully',
            });
            updateStepMutation.mutate({ step: QuestionStep.ONE, questionId: questionId });
        },
        onError: () => {
            message.open({
                type: 'error',
                content: 'Create new payment request failed',
            });
            updateStepMutation.mutate({ step: QuestionStep.ONE, questionId: questionId });
        },
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
            voucherCode: values.voucher,
        };

        mutateCreateQuestions.mutate(requestCreate, {
            onSuccess: (resp) => {
                const requestReducer: CreateFileQuestionReducer = requestCreate;
                requestReducer.questionId = resp.data.data.questionId;
                dispatch(addQuestion(requestReducer));
                dispatch(setCurrentQuestionId(requestReducer.questionId!));

                // handle create payment request
                const orderCode = Math.floor(Math.random() * 1000000);
                const cancelUrl = `${window.location.origin}/mentor/file?step=1`;
                const des = 'Thanh toán cho câu hỏi';
                const returnUrl = `${window.location.origin}/mentor/file?step=1`;
                const message = `amount=${2000}&cancelUrl=${cancelUrl}&description=${des}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
                const hash = HmacSHA256(
                    message,
                    process.env.NEXT_PUBLIC_PAY_OS_CHECK_SUM_KEY || '',
                );
                const request: CreatePaymentRequestModel = {
                    amount: 2000,
                    description: des,
                    orderCode: orderCode,
                    cancelUrl: cancelUrl,
                    returnUrl: returnUrl,
                    signature: hash.toString(),
                };

                mutateCreatePaymentRequest.mutate(request);
            },
        });
    };

    useEffect(() => {
        const checkoutUrl = mutateCreatePaymentRequest.data?.data.data.checkoutUrl;

        if (checkoutUrl) {
            router.push(checkoutUrl);
        }
    }, [mutateCreatePaymentRequest.data]);

    return (
        <Spin spinning={mutateCreateQuestions.isPending || file.isFetching}>
            <div className='p-8 bg-white-900'>
                <div className='w-full font-bold text-lg text-black mb-8'>Nội dung câu hỏi</div>
                <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8'>
                    <Image
                        src={images.createQuestion}
                        alt='Create a new question'
                        className='w-full h-full object-cover'
                    />
                </div>
                <Form name='questionForm' onFinish={handleSubmit} form={form} autoComplete='off'>
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
                                rules={[{ required: true, message: 'Please input!' }]}
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
                                rules={[{ required: true, message: 'Please input!' }]}
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
                                rules={[{ required: true, message: 'Please input!' }]}
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
                    {/* Requirement for mentor */}
                    <div className='mb-2'>
                        <div className='font-bold text-base mb-2'>Yêu cầu cho người hướng dẫn</div>
                        <Form.Item<QuestionInput>
                            name='tutorRating'
                            style={{
                                display: 'inline-block',
                                width: '100%',
                            }}
                            rules={[{ required: true, message: 'Please input!' }]}
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
                        Thời gian bạn muốn tìm kiếm câu trả lời cho hỏi
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
                        rules={[{ required: true, message: 'Please input!' }]}
                    />

                    <Form.Item<QuestionInput> name={'voucher'} noStyle />

                    {/* Question content */}
                    <Form.Item className='mb-0'>
                        <div className='font-bold text-base mb-2'>Nội dung câu hỏi</div>
                        <CustomEditorInput<QuestionInput>
                            name='content'
                            rules={[{ required: true, message: 'Please input!' }]}
                        />
                        <CustomDragDropFile<QuestionInput>
                            name='attachFiles'
                            // rules={[{ required: true, message: 'Please input!' }]}
                        />
                    </Form.Item>
                    {/* <Form.Item>
                        <div className='font-bold text-base mb-2'>Hãy chọn voucher phù hợp</div>
                        <CustomSelectInput<QuestionInput>
                            name='voucher'
                            allowClear
                            optionsSelect={voucherQuery.data || []}
                        />
                    </Form.Item> */}
                    {/* <div className='flex justify-end'></div> */}

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
                <div className='font-medium text-sm text-left text-[#313636]'>
                    Bạn cảm thấy mức giá không phù hợp?
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
                                            message.error('Vui lòng nhập đầy đủ thông tin');
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
