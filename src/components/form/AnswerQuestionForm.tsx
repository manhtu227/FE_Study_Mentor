import RightOutlined from '@ant-design/icons/RightOutlined';
import UploadIconIcon from '@assets/icons/upload';
import { AnswerQuestion, QuestionInput } from '@core/models/question.model';
import type { UploadProps } from 'antd';
import { Button, Form, Upload, message } from 'antd';
import { useRef } from 'react';
import { CustomEditorInput } from '../form-input/CustomEditorInput';

function AnswerQuestionForm() {
    const [form] = Form.useForm<AnswerQuestion>();
    const refEditor = useRef<any>(null);
    const refFile = useRef<any>(null);
    const { Dragger } = Upload;
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        listType: 'text',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {},
    };

    const handleSubmit = (values: AnswerQuestion) => {
        if (refEditor.current) {
            values.contentEditor = refEditor.current.currentContent;
        }

        if (refFile.current) {
            values.fileContent = refFile.current.fileList;
        }

        console.log(values);
    };

    return (
        <div className='p-8'>
            <div className='w-full font-bold text-2xl text-black mb-8 items-center flex'>
                <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                Câu trả lời
            </div>
            <div className='w-full font-bold text-lg text-black mb-4'>Nội dung câu trả lời</div>
            <Form
                name='answerForm'
                onFinish={handleSubmit}
                form={form}
                //cancel

                autoComplete='off'
            >
                {/* Question content */}
                <Form.Item name='questionContent'>
                    <CustomEditorInput<QuestionInput>
                        name='content'
                        // refEditor={refEditor}
                        // // rules={[{ required: true, message: 'Please input your report content!' }]}
                        // onChange={(value) => {
                        //     console.log(refEditor.current.currentContent);

                        //     form.setFieldValue('content', value);
                        //     form.validateFields(['content']);
                        // }}
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
                <Form.Item colon={false}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        className='!h-12 font-bold text-base w-[220px] bg-primary-800'
                    >
                        Gửi câu trả lời <RightOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AnswerQuestionForm;
