import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { starOptions } from '@core/constants/options.contanst';
import { useGetGrade } from '@core/hooks/options/useGetGrade';
import { useGetLevel } from '@core/hooks/options/useGetLevel';
import { QuestionInput } from '@core/models/question.model';
import { createQuestions } from '@core/services/questions.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message, Select, Spin } from 'antd';
import Link from 'next/link';
import { CustomEditorInput } from '../form-input/CustomEditorInput';

function CreateQuestionForm({ onNext }: { onNext: () => void }) {
    const [form] = Form.useForm<QuestionInput>();

    /* get options api */
    const levelOpts = useGetLevel();
    const { mutateGrades, gradeOpts } = useGetGrade();

    /* create question api */
    const mutateCreateQuestions = useMutation({
        mutationFn: (data: QuestionInput) => createQuestions(data),
        onSuccess: () => {
            message.open({
                type: 'success',
                content: 'This is a success message',
            });
            onNext();
        },
    });

    /* Handler */
    const handleSubmit = (values: QuestionInput) => {
        mutateCreateQuestions.mutate(values);
    };

    return (
        <Spin spinning={mutateCreateQuestions.isPending}>
            <div className='p-8 bg-white-900'>
                <div className='w-full font-bold text-lg text-black mb-8'>Nội dung câu hỏi</div>
                <div className='bg-blue-800 w-full h-[100px] rounded-md mb-8' />
                <Form name='questionForm' onFinish={handleSubmit} form={form} autoComplete='off'>
                    {/* Question level */}
                    <Form.Item className='mb-2'>
                        <div className='font-bold text-base mb-2'>Cấp độ câu hỏi</div>
                        <Form.Item<QuestionInput>
                            name='levelId'
                            style={{ display: 'inline-block', width: 'calc(50% - 28px)' }}
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn cấp độ'
                                options={levelOpts.data}
                                onChange={(e) => {
                                    console.log(e);
                                    form.setFieldsValue({ levelId: e });
                                    mutateGrades.mutate(e);
                                }}
                            />
                        </Form.Item>
                        <Form.Item<QuestionInput>
                            name='grade'
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 0 0 32px',
                            }}
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn lớp'
                                options={gradeOpts}
                            />
                        </Form.Item>
                    </Form.Item>
                    {/* Requirement for mentor */}
                    <div className='mb-2'>
                        <div className='font-bold text-base mb-2'>Yêu cầu cho người hướng dẫn</div>
                        <Form.Item<QuestionInput>
                            name='tutorRating'
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 28px)',
                            }}
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn số sao'
                                options={starOptions}
                            />
                        </Form.Item>
                        <Form.Item<QuestionInput>
                            name='tutorCriteria'
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 0 0 32px',
                            }}
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn tiêu chí'
                            />
                        </Form.Item>
                    </div>
                    {/* Time for handle the question */}
                    <div className='font-bold text-base mb-2'>Thời gian giải đáp</div>
                    <Form.Item<QuestionInput>
                        name='timeAnswer'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input
                            type='number'
                            className='h-12 font-medium text-base text-gray-700'
                            placeholder='Nhập số phút'
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
                    <Form.Item label=' ' colon={false}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            size='large'
                            className='!h-12 font-bold text-base'
                        >
                            Giá: 22.999 USD &nbsp; | &nbsp; Thanh toán
                        </Button>
                    </Form.Item>
                </Form>
                <div className='font-medium text-sm text-[#313636]'>
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
