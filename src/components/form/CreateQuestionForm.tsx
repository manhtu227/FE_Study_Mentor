import UploadIconIcon from '@assets/icons/upload';
import { QuestionInput } from '@core/models/question.model';
import type { UploadProps } from 'antd';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import Link from 'next/link';
import { useRef } from 'react';
import { CustomEditorInput } from './CustomEditorInput';

function CreateQuestionForm({ onNext }: { onNext: () => void }) {
    const [form] = Form.useForm<QuestionInput>();
    const refEditor = useRef<any>(null);
    const refFile = useRef<any>(null);
    const { Dragger } = Upload;
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        listType: 'text',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            console.log(info);

            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = (values: QuestionInput) => {
        if (refEditor.current) {
            values.contentEditor = refEditor.current.currentContent;
        }

        if (refFile.current) {
            values.fileContent = refFile.current.fileList;
        }

        console.log(values);
        onNext();
    };

    return (
        <div className='m-8'>
            <div className='w-full font-bold text-lg text-black mb-8'>Nội dung câu hỏi</div>
            <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
            <Form
                name='questionForm'
                onFinish={handleSubmit}
                form={form}
                //cancel

                autoComplete='off'
            >
                {/* Question level */}
                <Form.Item name='questionLevel' className='mb-2'>
                    <div className='font-bold text-base mb-2'>Cấp độ câu hỏi</div>
                    <Form.Item
                        name='level'
                        style={{ display: 'inline-block', width: 'calc(50% - 28px)' }}
                        // rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            className='h-12 font-medium text-base text-gray-700'
                            placeholder='Chọn cấp độ'
                            onChange={(e) => form.setFieldsValue({ questionLevel: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name='class'
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                            margin: '0 0 0 32px',
                        }}
                        // rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            className='h-12 font-medium text-base text-gray-700'
                            placeholder='Chọn lớp'
                            onChange={(e) => form.setFieldsValue({ class: e.target.value })}
                        />
                    </Form.Item>
                </Form.Item>
                {/* Requirement for mentor */}
                <Form.Item name='mentorRequirement' className='mb-2'>
                    <div className='font-bold text-base mb-2'>Yêu cầu cho người hướng dẫn</div>
                    <Form.Item
                        name='numberOfStars'
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 28px)',
                        }}
                        // rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            className='h-12 font-medium text-base text-gray-700'
                            placeholder='Chọn số sao'
                        />
                    </Form.Item>
                    <Form.Item
                        name='criteria'
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                            margin: '0 0 0 32px',
                        }}
                        // rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            className='h-12 font-medium text-base text-gray-700'
                            placeholder='Chọn tiêu chí'
                        />
                    </Form.Item>
                </Form.Item>
                {/* Time for handle the question */}
                <Form.Item
                    name='timeForAnswerQuestion'
                    // rules={[{ required: true, message: 'Please input!' }]}
                >
                    <div className='font-bold text-base mb-2'>Thời gian giải đáp</div>
                    <Input
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Nhập số phút'
                    />
                </Form.Item>
                {/* Question content */}
                <Form.Item name='questionContent'>
                    <div className='font-bold text-base mb-2'>Nội dung câu hỏi</div>
                    <CustomEditorInput<QuestionInput>
                        name='contentEditor'
                        refEditor={refEditor}
                        // rules={[{ required: true, message: 'Please input your report content!' }]}
                        onChange={(value) => {
                            console.log(refEditor.current.currentContent);

                            form.setFieldValue('content', value);
                            form.validateFields(['content']);
                        }}
                    />
                    <Form.Item name='fileContent'>
                        <Dragger {...props} ref={refFile}>
                            <p className='ant-upload-drag-icon'>
                                <UploadIconIcon />
                            </p>
                            <p className='font-bold text-base text-gray-700'>
                                Tải lên hoặc thả tệp tại đây
                            </p>
                        </Dragger>
                    </Form.Item>
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
                Bạn cảm thấy mức giá không phù hợp?{' '}
                <Link className='font-bold text-base text-primary-900 no-underline' href={'#'}>
                    Tùy chọn khác
                </Link>
            </div>
        </div>
    );
}

export default CreateQuestionForm;
