'use client';
import { DownloadOutlined } from '@ant-design/icons';
import ReportQuestionForm from '@components/form/ReportQuestionForm';
import CustomSkeletonParagraph from '@components/skeleton/CustomSkeletonParagraph';
import { GetQuestionResponseModel } from '@core/models/question.model';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { downloadUrl } from '@core/utilities/download.util';
import { imageUtility } from '@core/utilities/image.utility';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ReportQuestionPage() {
    const params = useParams();
    const searchParams = useSearchParams();

    // queries for detailed question
    const detailedQuestionQuery = useQuery({
        queryKey: detailedQuestionKeys.all,
        queryFn: () =>
            getDetailedQuestionApi(
                (params?.questionId as string) || (searchParams.get('questionId') as string),
            ),
        select: (data) => data?.data.data,
    });

    const [currentQuestion, setCurrentQuestion] = useState<GetQuestionResponseModel | undefined>();

    useEffect(() => {
        if (!((params?.questionId as string) || (searchParams.get('questionId') as string))) return;

        const question = detailedQuestionQuery?.data;

        setCurrentQuestion(question);
    }, [
        detailedQuestionQuery?.data,
        (params?.questionId as string) || (searchParams.get('questionId') as string),
    ]);

    return (
        <div className='px-[180px] pb-16 pt-4'>
            <div className='w-full flex gap-8'>
                <div className='w-2/5 rounded-lg bg-white-900 p-8'>
                    {detailedQuestionQuery?.isFetching ? (
                        <CustomSkeletonParagraph height={60} />
                    ) : (
                        <div className='flex items-center gap-4'>
                            <img
                                src={imageUtility(currentQuestion?.student?.avatar?.fileKey)}
                                alt='avatar'
                                className='rounded-full h-12 w-12'
                            />
                            <div>
                                <div className='text-xl'>Câu hỏi của</div>
                                <div className='font-bold text-2xl'>
                                    {currentQuestion?.student.fullName}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='h-[1px] w-full my-8 bg-gray-600' />
                    <div>
                        <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Thông tin câu hỏi
                        </div>
                        <div className='h-[1px] w-full mb-4 bg-gray-600' />
                        {detailedQuestionQuery?.isFetching ? (
                            <CustomSkeletonParagraph height={60} />
                        ) : (
                            <>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: currentQuestion?.content || '',
                                    }}
                                    className='text-lg text-black'
                                />
                                {currentQuestion?.fileQuestions &&
                                    currentQuestion?.fileQuestions?.length > 0 && (
                                        <>
                                            <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                                                Tệp đính kèm
                                            </div>
                                            <ul className='flex gap-2 flex-wrap pl-0 w-full'>
                                                {currentQuestion?.fileQuestions?.map((file) => {
                                                    return (
                                                        <div
                                                            key={file.fileKey}
                                                            className='w-full border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                                                        >
                                                            <div className='flex items-center'>
                                                                <div className='font-bold text-md max-w-4/5 truncate text-black-800'>
                                                                    {file.fileName}
                                                                </div>
                                                            </div>
                                                            <DownloadOutlined
                                                                className='text-[#4EA8B4] text-2xl cursor-pointer'
                                                                onClick={async () => {
                                                                    await downloadUrl(
                                                                        imageUtility(file.fileKey),
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </ul>
                                        </>
                                    )}
                            </>
                        )}
                    </div>
                    <div className='mt-8'>
                        <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Thông tin câu trả lời
                        </div>
                        <div className='h-[1px] w-full mb-4 bg-gray-600' />
                        {detailedQuestionQuery?.isFetching ? (
                            <CustomSkeletonParagraph height={60} />
                        ) : (
                            <>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: currentQuestion?.answers?.[0]?.content || '',
                                    }}
                                    className='text-lg text-black'
                                />
                                {currentQuestion?.answers &&
                                    currentQuestion?.answers[0]?.fileAttachmentAnswers?.length >
                                        0 && (
                                        <>
                                            <div className='w-full font-bold text-lg text-black mb-4 items-center flex'>
                                                Tệp đính kèm
                                            </div>
                                            <ul className='flex gap-2 flex-wrap pl-0 w-full'>
                                                {currentQuestion?.answers?.[0].fileAttachmentAnswers?.map(
                                                    (file) => {
                                                        return (
                                                            <div
                                                                key={file.fileKey}
                                                                className='w-full border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                                                            >
                                                                <div className='flex items-center'>
                                                                    <div className='font-bold text-md max-w-4/5 truncate text-black-800'>
                                                                        {file.fileName}
                                                                    </div>
                                                                </div>
                                                                <DownloadOutlined
                                                                    className='text-[#4EA8B4] text-2xl cursor-pointer'
                                                                    onClick={async () => {
                                                                        await downloadUrl(
                                                                            imageUtility(
                                                                                file.fileKey,
                                                                            ),
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </ul>
                                        </>
                                    )}
                            </>
                        )}
                    </div>
                </div>
                <div className='w-3/5 rounded-lg bg-white-900'>
                    <ReportQuestionForm
                        questionId={currentQuestion?.questionId}
                        studentId={currentQuestion?.student?.id}
                        reportId={currentQuestion?.reportId}
                        tutorId={currentQuestion?.tutor?.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReportQuestionPage;
