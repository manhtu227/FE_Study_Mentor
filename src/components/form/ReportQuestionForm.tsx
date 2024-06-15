'use client';
import RightOutlined from '@ant-design/icons/RightOutlined';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import { ReportAnswer, ReportQuestionReq } from '@core/models/question.model';
import { reportQuestionApi } from '@core/services/questions.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, message } from 'antd';
import { useState } from 'react';
import { CustomEditorInput } from '../form-input/CustomEditorInput';

function ReportQuestionForm({ questionId, studentId }: { questionId: string; studentId: string }) {
    const [form] = Form.useForm<ReportAnswer>();
    const file = useUploadFileApi();
    const [isReported, setIsReported] = useState<boolean>(false);

    const handleSubmit = async (values: ReportAnswer) => {
        const attachFiles =
            file &&
            values?.attachFiles?.fileList &&
            (await file.uploadMultipleFiles(values?.attachFiles?.fileList));
        const request: ReportQuestionReq = {
            questionId: questionId,
            content: values.reportContent,
            attachFiles: attachFiles,
            studentId: studentId,
        };

        reportQuestionMutate.mutate(request);
    };

    const reportQuestionMutate = useMutation({
        mutationFn: (values: ReportQuestionReq) => reportQuestionApi(values),
        onSuccess: () => {
            message.open({
                type: 'success',
                content: 'Báo cáo câu hỏi thành công',
            });
            setIsReported(true);
        },
    });

    return (
        <div className='p-8 pb-0'>
            <div className='w-full font-bold text-2xl text-black mb-8 items-center flex'>
                <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                Báo cáo câu hỏi
            </div>
            <div className='w-full font-bold text-lg text-black mb-4'>Nội dung báo cáo</div>
            <Form
                name='ReportQuestionForm'
                onFinish={handleSubmit}
                form={form}
                //cancel

                autoComplete='off'
            >
                {/* Report content */}
                <CustomEditorInput<ReportAnswer>
                    name='reportContent'
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung báo cáo!' }]}
                />
                <div className='w-full font-bold text-lg text-black my-4 '>Minh chứng</div>
                <CustomDragDropFile<ReportAnswer> name='attachFiles' />
                <Form.Item colon={false} className='mt-8'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        disabled={isReported}
                        className='!h-12 font-bold text-base w-[220px] bg-primary-800'
                    >
                        Gửi báo cáo <RightOutlined />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ReportQuestionForm;
