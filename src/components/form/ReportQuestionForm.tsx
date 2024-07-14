'use client';
import { DownloadOutlined } from '@ant-design/icons';
import RightOutlined from '@ant-design/icons/RightOutlined';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import CustomSkeletonParagraph from '@components/skeleton/CustomSkeletonParagraph';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import { ReportAnswer, ReportQuestionReq } from '@core/models/question.model';
import { UserRole } from '@core/models/user.model';
import { reportQuestionApi, reportQuestionStudentApi } from '@core/services/questions.service';
import {
    getStudentReportApi,
    getStudentReportKeys,
    getTutorReportApi,
    getTutorReportKeys,
} from '@core/services/user.service';
import { downloadUrl } from '@core/utilities/download.util';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { imageUtility } from '@core/utilities/image.utility';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { CustomEditorInput } from '../form-input/CustomEditorInput';

type IProps = {
    questionId?: string;
    studentId?: string;
    reportId?: string;
    tutorId?: string;
};

function ReportQuestionForm({ questionId, studentId, reportId, tutorId }: IProps) {
    const params = useParams();
    const [form] = Form.useForm<ReportAnswer>();
    const file = useUploadFileApi();
    const [isReported, setIsReported] = useState<boolean>(false);
    const router = useRouter();
    const session = useSession();

    const detailedTutorReportQuery = useQuery({
        queryKey:
            session.data?.user.user.role === UserRole.STUDENT
                ? getStudentReportKeys.all
                : getTutorReportKeys.all,
        queryFn: () =>
            session.data?.user.user.role === UserRole.STUDENT
                ? getStudentReportApi((params?.slug as string) || (reportId as string))
                : getTutorReportApi((params?.slug as string) || (reportId as string)),
        select: (data) => data?.data.data,
        enabled: !!params?.slug || !!reportId || !!session.data?.user.user.role,
    });

    const handleSubmit = async (values: ReportAnswer) => {
        const attachFiles =
            file &&
            values?.attachFiles?.fileList &&
            (await file.uploadMultipleFiles(values?.attachFiles?.fileList));

        if (!questionId || !studentId) return;

        const request: ReportQuestionReq = {
            questionId: questionId,
            content: values.reportContent,
            attachFiles: attachFiles,
            studentId: studentId,
        };

        reportQuestionMutate.mutate(request);
    };

    const reportQuestionMutate = useMutation({
        mutationFn: (values: ReportQuestionReq) =>
            session.data?.user.user.role === UserRole.STUDENT
                ? reportQuestionStudentApi({
                      ...values,
                      tutorId,
                  })
                : reportQuestionApi(values),
        onSuccess: () => {
            toastSuccess('Báo cáo câu hỏi thành công');
            setIsReported(true);
            if (session.data?.user.user.role === UserRole.STUDENT) {
                router.back();
            } else router.push(MY_ROUTE.REPORT);
        },
        onError: handleError,
    });

    return (
        <div className='p-8 pb-0'>
            <div className='w-full font-bold text-2xl text-black mb-8 items-center flex'>
                <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                Báo cáo câu hỏi
            </div>
            {detailedTutorReportQuery?.isFetching ? (
                <CustomSkeletonParagraph height={200} />
            ) : (
                <>
                    <div className='w-full font-bold text-lg text-black mb-4'>Nội dung báo cáo</div>
                    {detailedTutorReportQuery?.data?.id && reportId ? (
                        <>
                            {detailedTutorReportQuery?.data?.content ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: detailedTutorReportQuery?.data.content,
                                    }}
                                    className='border rounded-lg border-gray-600 border-solid p-2 mt-2'
                                />
                            ) : (
                                <div className='text-gray-300 text-base italic'>
                                    Không có nội dung
                                </div>
                            )}
                            <ul className='flex gap-2 flex-wrap pl-0'>
                                {detailedTutorReportQuery?.data.attachFiles?.map((file, index) => {
                                    return (
                                        <div
                                            key={file.fileKey}
                                            className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid w-[300px]'
                                        >
                                            <div className='flex items-center text-base truncate max-w-2/3'>
                                                {file.fileName}
                                            </div>
                                            <DownloadOutlined
                                                className='text-[#4EA8B4] text-2xl cursor-pointer'
                                                onClick={async () => {
                                                    await downloadUrl(imageUtility(file.fileKey));
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </ul>
                            <div className='mt-2 text-gray-400 italic text-base'>
                                Bạn đã báo cáo câu hỏi này rồi nên không thể báo cáo lại.
                            </div>
                        </>
                    ) : (
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
                                rules={[
                                    { required: true, message: 'Vui lòng nhập nội dung báo cáo!' },
                                ]}
                            />
                            <div className='w-full font-bold text-lg text-black my-4 '>
                                Minh chứng
                            </div>
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
                    )}
                </>
            )}
        </div>
    );
}

export default ReportQuestionForm;
