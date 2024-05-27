import RightOutlined from '@ant-design/icons/RightOutlined';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import { AnswerQuestion, AnswerRequestModel } from '@core/models/question.model';
import { sendAnswerToStudentApi } from '@core/services/questions.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, message } from 'antd';
import { CustomEditorInput } from '../form-input/CustomEditorInput';

function AnswerQuestionForm({
    questionId,
    tutorId,
    onHideForm,
}: {
    questionId: string;
    tutorId: string;
    onHideForm: () => void;
}) {
    const [form] = Form.useForm<AnswerQuestion>();

    const mutateSendAnswer = useMutation({
        mutationFn: (values: AnswerRequestModel) => sendAnswerToStudentApi(values),
        onSuccess: () => {
            message.open({
                type: 'success',
                content: 'send answer to student successfully',
            });
            onHideForm();
        },
    });

    const file = useUploadFileApi();
    const handleSubmit = async (values: AnswerQuestion) => {
        const attachFiles = file && (await file.uploadMultipleFiles(values?.attachFiles?.fileList));
        const request: AnswerRequestModel = {
            attachFiles: attachFiles ? attachFiles : null,
            content: values.contentEditor,
            questionId: questionId,
            tutorId: tutorId,
        };

        mutateSendAnswer.mutate(request);
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
                {/* Answer content */}
                <Form.Item>
                    <CustomEditorInput<AnswerQuestion>
                        name='contentEditor'
                        rules={[{ required: true, message: 'Please input!' }]}
                    />
                    <CustomDragDropFile<AnswerQuestion>
                        name='attachFiles'
                        // rules={[{ required: true, message: 'Please input!' }]}
                    />
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
