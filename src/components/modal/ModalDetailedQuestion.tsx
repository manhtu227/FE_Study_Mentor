'use client';
import { DownloadOutlined } from '@ant-design/icons';
import CustomSkeletonTitle from '@components/skeleton/CustomSkeletonTitle';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import Link from 'next/link';

export default function ModalDetailedQuestion({
    currentQuestionId,
    isModalOpen,
    setIsModalOpen,
}: {
    currentQuestionId: string;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}) {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const query = useQuery({
        queryKey: detailedQuestionKeys.list({ currentQuestionId }),
        queryFn: () => getDetailedQuestionApi(currentQuestionId),
        select: (data) => data?.data.data,
    });

    return (
        <div className='detailed-question-modal'>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className='!w-[600px] h-[500px] flex flex-col text-center items-center justify-center'
                title='Chi tiết câu hỏi'
            >
                <div className='w-full'>
                    <div className='flex flex-col text-left w-full mb-4'>
                        <h3 className='m-0 border mb-2 flex items-center'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            <div className='text-black-800 font-bold text-lg leading-[27px]'>
                                Thông tin câu hỏi
                            </div>
                        </h3>
                        {query.isFetching ? (
                            <CustomSkeletonTitle height='50px' />
                        ) : (
                            <>
                                <div
                                    dangerouslySetInnerHTML={{ __html: query.data?.content || '' }}
                                />
                                {query.data?.fileQuestions &&
                                    query.data?.fileQuestions?.length > 0 && (
                                        <>
                                            <h3 className='m-0 border mb-2'>
                                                <div className='text-black-800 font-bold text-sm leading-[27px]'>
                                                    Tệp đính kèm
                                                </div>
                                            </h3>
                                            {query.data?.fileQuestions?.map((file) => {
                                                return (
                                                    <div
                                                        key={file.fileKey}
                                                        className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                                                    >
                                                        <div className='flex items-center'></div>
                                                        <DownloadOutlined className='text-[#4EA8B4] text-2xl cursor-pointer' />
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                            </>
                        )}
                    </div>
                    <div className='flex flex-col text-left mb-4'>
                        <h3 className='m-0 border mb-2 flex items-center'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            <div className='text-black-800 font-bold text-lg leading-[27px]'>
                                Thông tin câu trả lời
                            </div>
                        </h3>
                        {query.isFetching ? (
                            <CustomSkeletonTitle height='50px' />
                        ) : (
                            query.data?.answers && (
                                <>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: query.data?.answers[0]?.content || '',
                                        }}
                                    />
                                    {query.data?.answers[0]?.fileAttachmentAnswers?.length > 0 && (
                                        <h3 className='m-0 border mb-2'>
                                            <div className='text-black-800 font-bold text-sm leading-[27px]'>
                                                Tệp đính kèm
                                            </div>
                                        </h3>
                                    )}
                                    {query.data?.answers[0]?.fileAttachmentAnswers &&
                                        query.data?.answers[0]?.fileAttachmentAnswers?.map(
                                            (file) => {
                                                return (
                                                    <div
                                                        key={file.fileKey}
                                                        className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                                                    >
                                                        <div className='flex items-center'>
                                                            <div className='font-bold text-md mx-4 max-w-4/5 truncate text-black-800'>
                                                                {file.fileName}
                                                            </div>
                                                        </div>
                                                        <Link
                                                            href={`${process.env.NEXT_PUBLIC_PHOTO}${file.fileKey}`}
                                                            type='download'
                                                            className='hover:opacity-90'
                                                        >
                                                            <DownloadOutlined className='text-[#4EA8B4] text-2xl cursor-pointer' />
                                                        </Link>
                                                    </div>
                                                );
                                            },
                                        )}
                                </>
                            )
                        )}
                    </div>
                    <div className='flex flex-col text-left w-full'>
                        <h3 className='m-0 border mb-2 flex items-center'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            <div className='text-black-800 font-bold text-lg leading-[27px]'>
                                Trạng thái thanh toán
                            </div>
                        </h3>
                        <div>
                            {query?.isFetching ? (
                                <CustomSkeletonTitle height='50px' />
                            ) : query.data?.isPaid ? (
                                <div className='text-lg text-blue-600 font-medium'>
                                    Đã thanh toán
                                </div>
                            ) : (
                                <div className='text-lg text-red-400 font-medium'>
                                    Chưa được thanh toán
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
