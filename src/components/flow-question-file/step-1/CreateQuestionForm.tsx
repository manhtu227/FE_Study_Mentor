import images from '@assets/images';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { starOptions } from '@core/constants/options.contanst';
import { useGetLevels } from '@core/hooks/options/useGetLevels';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import { CreatePaymentRequestModel } from '@core/models/payment.model';
import {
    CreateFileQuestionReducer,
    CreateFileQuestionRequestModel,
    QuestionInput,
} from '@core/models/question.model';
import { createNewPaymentRequestApi } from '@core/services/payment.service';
import {
    ConvertGradeToOption,
    ConvertLevelToOption,
    ConvertSubjectToOption,
    createQuestions,
} from '@core/services/questions.service';
import { addQuestion, setCurrentQuestionId } from '@core/store/reducers/question.reducer';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, InputNumber, Select, Spin, message } from 'antd';
import { HmacSHA256 } from 'crypto-js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomEditorInput } from '../../form-input/CustomEditorInput';

function CreateQuestionForm({ onNext }: { onNext: () => void }) {
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

    /* create question api */
    const mutateCreateQuestions = useMutation({
        mutationFn: (data: CreateFileQuestionRequestModel) => createQuestions(data),
        onSuccess: () => {
            message.open({
                type: 'success',
                content: 'Create new question successfully',
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
        },
    });

    useEffect(() => {
        const newPrice = mutateCreateQuestions.data?.data.data.price;

        if (newPrice) {
            setPrice(newPrice);
        }
    }, [mutateCreateQuestions.data]);

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
            attachFiles: attachFiles ? attachFiles : null,
        };
        const requestReducer: CreateFileQuestionReducer = request;

        requestReducer.questionId = Math.floor(Math.random() * 1000000).toString();
        dispatch(addQuestion(requestReducer));
        dispatch(setCurrentQuestionId(requestReducer.questionId));
        // mutateCreateQuestions.mutate(request);
        onNext();
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
        const cancelUrl = process.env.NEXT_PUBLIC_HOME_PAGE_URL || 'http://localhost:3000/';
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
                    <Form.Item<QuestionInput>
                        name='timeAnswer'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber
                            className='font-medium text-base !w-full'
                            placeholder='Nhập số phút'
                            controls={false}
                        />
                    </Form.Item>
                    {/* Question content */}
                    <Form.Item>
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
                    <div className='flex items-center justify-between'>
                        <Form.Item label=' ' colon={false}>
                            <Button
                                type='primary'
                                size='large'
                                className='!h-12 font-bold text-base'
                                disabled={!price}
                                onClick={handleSubmitPayment}
                            >
                                Giá: {price} VND &nbsp; | &nbsp; Thanh toán
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
