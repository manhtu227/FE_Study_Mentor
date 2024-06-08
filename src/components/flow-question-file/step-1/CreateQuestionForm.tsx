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
    QuestionInput,
    QuestionStep,
} from '@core/models/question.model';
import { createNewPaymentRequestApi } from '@core/services/payment.service';
import {
    ConvertGradeToOption,
    ConvertLevelToOption,
    ConvertSubjectToOption,
    createQuestions,
} from '@core/services/questions.service';
import {
    convertVoucherToOption,
    getListVoucherApi,
    voucherKeys,
} from '@core/services/user.service';
import { RootState } from '@core/store';
import { addQuestion, setCurrentQuestionId } from '@core/store/reducers/question.reducer';
import { formatPriceVND } from '@core/utilities/caculate-price.utility';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Select, Spin, message } from 'antd';
import { HmacSHA256 } from 'crypto-js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomEditorInput } from '../../form-input/CustomEditorInput';

function CreateQuestionForm() {
    const [form] = Form.useForm<QuestionInput>();
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const router = useRouter();
    const dispatch = useDispatch();

    const levelData = useGetLevels();
    const levelOptions = levelData?.map(ConvertLevelToOption) ?? [];
    // Filter grades based on selected levels
    const filteredGrades = levelData?.find((level) => level.id === selectedLevel)?.grades ?? [];

    const gradeOptions = filteredGrades.map(ConvertGradeToOption);
    const subjectData = filteredGrades.find((grade) => grade.id === selectedGrade)?.subjects ?? [];
    const subjectOptions = subjectData?.map(ConvertSubjectToOption) ?? [];
    const updateStepMutation = useUpdateStepApi();
    const questionId = useSelector((state: RootState) => state.questions.currentQuestionId);

    /* create question api */
    const mutateCreateQuestions = useMutation({
        mutationFn: (data: CreateFileQuestionRequestModel) => createQuestions(data),
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
            console.log('loi');
            updateStepMutation.mutate({ step: QuestionStep.ONE, questionId: questionId });
        },
    });

    const voucherQuery = useQuery({
        queryKey: voucherKeys.all,
        queryFn: () => getListVoucherApi(),
        select: (resp) => resp.data.data.map(convertVoucherToOption),
    });

    /* Handler */
    const { data } = useSession();
    const file = useUploadFileApi();
    const handleSubmit = async (values: QuestionInput) => {
        const attachFiles = file && (await file.uploadMultipleFiles(values?.attachFiles?.fileList));
        const request: CreateFileQuestionRequestModel = {
            userId: data?.user.user.id || '',
            subjectId: selectedSubject,
            timeFindTutor: values.timeAnswer,
            numberOfStar: values.tutorRating,
            content: values.content,
            attachFiles: attachFiles,
            voucherCode: values.voucher,
        };
        mutateCreateQuestions.mutate(request, {
            onSuccess: (resp) => {
                const requestReducer: CreateFileQuestionReducer = request;
                requestReducer.questionId = resp.data.data.questionId;
                dispatch(addQuestion(requestReducer));
                dispatch(setCurrentQuestionId(requestReducer.questionId));
                setPrice(resp.data.data.price);
                message.open({
                    type: 'success',
                    content: 'Create new question successfully',
                });
            },
        });

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

    const handleSubmitPayment = () => {
        const orderCode = Math.floor(Math.random() * 1000000);
        const cancelUrl = `${window.location.origin}/mentor/file?step=1`;
        const des = 'Thanh toán cho câu hỏi';
        const returnUrl = `${window.location.origin}/mentor/file?step=1`;
        const message = `amount=${2000}&cancelUrl=${cancelUrl}&description=${des}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
        const hash = HmacSHA256(message, process.env.NEXT_PUBLIC_PAY_OS_CHECK_SUM_KEY || '');
        const request: CreatePaymentRequestModel = {
            amount: 2000,
            description: des,
            orderCode: orderCode,
            cancelUrl: cancelUrl,
            returnUrl: returnUrl,
            signature: hash.toString(),
        };

        mutateCreatePaymentRequest.mutate(request);
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
                    <Form.Item>
                        <div className='font-bold text-base mb-2'>Hãy chọn voucher phù hợp</div>
                        <CustomSelectInput<QuestionInput>
                            name='voucher'
                            allowClear
                            optionsSelect={voucherQuery.data || []}
                        />
                    </Form.Item>
                    {/* <div className='flex justify-end'></div> */}

                    <div className='flex items-center justify-between '>
                        <Form.Item label=' ' colon={false}>
                            <Button
                                type='primary'
                                size='large'
                                className='!h-12 font-bold text-base'
                                disabled={!price}
                                onClick={handleSubmitPayment}
                            >
                                Giá: {formatPriceVND(price)} &nbsp; | &nbsp; Thanh toán
                            </Button>
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
                    <Link className='font-bold text-base text-primary-900 no-underline' href={'#'}>
                        Tùy chọn khác
                    </Link>
                </div>
            </div>
        </Spin>
    );
}

export default CreateQuestionForm;
