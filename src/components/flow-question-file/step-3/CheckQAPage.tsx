'use client';
import { DownloadOutlined } from '@ant-design/icons';
import ButtonPrimary from '@components/button/ButtonPrimary';
import CustomSkeletonParagraph from '@components/skeleton/CustomSkeletonParagraph';
import { SocketEvent } from '@core/enums/socket.enum';
import { MentorType } from '@core/models/profile.model';
import {
    AnswerResponseModel,
    GetQuestionResponseModel,
    QuestionEnum,
} from '@core/models/question.model';

import images from '@assets/images';
import { UserModel } from '@core/models/user.model';
import { CreateRoomUserReq, createRoomUserIdApi } from '@core/services/chat.service';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { RootState } from '@core/store';
import { downloadUrl } from '@core/utilities/download.util';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { imageUtility } from '@core/utilities/image.utility';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { FileIcon } from 'react-file-icon';
import { useSelector } from 'react-redux';
import { SideBarMentor } from '../SideBarMentor';
import ChatMentorPage from './ChatMentorPage';

const mockDataInfo: MentorType = {
    id: '4',
    image: images.feedback.src,
    name: 'Nguyễn Hương',
    age: 23,
    rating: 5,
};

const questionFile = {
    extension: 'docx',
    fileName: 'FileCauHoi.docx',
    size: 3.4,
};

type Props = {
    onNext: () => void;
};

export default function CheckQAPage({ onNext }: Props) {
    const [isChat, setIsChat] = useState(false);
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const currentQuestionId = useSelector((state: RootState) => state.questions.currentQuestionId);
    const [answer, setAnswer] = useState<AnswerResponseModel>();

    const query = useQuery({
        queryKey: detailedQuestionKeys.list({ currentQuestionId }),
        queryFn: () => getDetailedQuestionApi(currentQuestionId),
        select: (data) => data?.data.data,
    });

    useEffect(() => {
        if (query.data) {
            setAnswer(query.data.answers?.[0]);
        }
    }, [query.data]);

    useEffect(() => {
        if (socketReducer) {
            socketReducer.on(
                SocketEvent.ANSWER,
                (data: {
                    data: {
                        answer: AnswerResponseModel;
                        tutor: UserModel;
                        student: UserModel;
                        question: GetQuestionResponseModel;
                    };
                }) => {
                    setAnswer(data.data.answer);
                },
            );
        }
    }, [socketReducer, currentQuestionId]);

    const mutateCreateRoom = useMutation({
        mutationFn: (body: CreateRoomUserReq) => createRoomUserIdApi(body),
        onSuccess: () => {
            setIsChat(true);
            toastSuccess('Tạo room chat thành công');
        },
        onError: handleError,
    });

    return (
        <div>
            {isChat ? (
                <ChatMentorPage
                    setIsChat={setIsChat}
                    idRoom={mutateCreateRoom.data?.data.roomId || ''}
                    senderId={query.data?.tutor?.id || ''}
                    tutor={query.data?.tutor}
                />
            ) : (
                <>
                    <div>
                        <SideBarMentor
                            className='p-8'
                            button={
                                query.data?.questionType === QuestionEnum.GG_MEET ? (
                                    <></>
                                ) : (
                                    <ButtonPrimary
                                        title={query.data?.roomId ? 'Trò chuyện' : 'Tạo đoạn chat'}
                                        className='w-full'
                                        onClick={() => {
                                            if (query.data?.roomId) {
                                                setIsChat(true);
                                                return;
                                            }
                                            mutateCreateRoom.mutate({
                                                tutorId: query.data?.tutor?.id || '',
                                                questionId: currentQuestionId,
                                            });
                                        }}
                                        isRightIcon
                                    />
                                )
                            }
                        >
                            <div className='flex flex-col text-left'>
                                <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                                    Thông tin câu hỏi
                                </h3>
                                <Divider />
                                <div
                                    dangerouslySetInnerHTML={{ __html: query.data?.content || '' }}
                                />

                                <br />
                                {query.data?.fileQuestions &&
                                    query.data?.fileQuestions?.length > 0 && (
                                        <>
                                            <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border mb-2'>
                                                Tệp đính kèm
                                            </h3>
                                            <div className='flex flex-col gap-2'>
                                                {query.data?.fileQuestions?.map((file) => {
                                                    return (
                                                        <div
                                                            key={file.fileKey}
                                                            className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                                                        >
                                                            <div className='flex items-center'>
                                                                <div className='w-[30px]'>
                                                                    <FileIcon
                                                                        extension={
                                                                            file.fileKey
                                                                                .split('.')
                                                                                .pop() || ''
                                                                        }
                                                                        // {...defaultStyles.docx}
                                                                    />
                                                                </div>
                                                                <div className='font-bold text-md mx-4 max-w-[145px] truncate text-black-800'>
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
                                            </div>
                                        </>
                                    )}
                            </div>
                            <div className='flex flex-col text-left'>
                                <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                                    {query.data?.questionType === QuestionEnum.FILE
                                        ? 'Thông tin câu trả lời'
                                        : 'Thông tin google meet'}
                                </h3>
                                <Divider />
                                {query.data?.questionType === QuestionEnum.GG_MEET ? (
                                    query.data.meetingURL ? (
                                        <div
                                            className='text-base px-2 hover:text-primary-600'
                                            onClick={() => window.open(query.data?.meetingURL)}
                                        >
                                            {query.data.meetingURL}
                                        </div>
                                    ) : (
                                        <ButtonPrimary title={'Create google meet'} />
                                    )
                                ) : answer ? (
                                    <>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: answer?.content || '',
                                            }}
                                        />

                                        <br />
                                        {answer.fileAttachmentAnswers?.length > 0 && (
                                            <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                                                Tệp đính kèm
                                            </h3>
                                        )}
                                        {answer.fileAttachmentAnswers?.map((file) => {
                                            return (
                                                <div
                                                    key={file.fileKey}
                                                    className='border rounded-lg border-gray-600 flex items-center justify-between p-4 border-solid'
                                                >
                                                    <div className='flex items-center'>
                                                        <div className='w-[30px]'>
                                                            <FileIcon
                                                                extension={questionFile.extension}
                                                                // {...defaultStyles.docx}
                                                            />
                                                        </div>
                                                        <div className='font-bold text-md mx-4 max-w-[145px] truncate text-black-800'>
                                                            {questionFile.fileName}
                                                        </div>
                                                        <div className='text-sm text-black-800'>
                                                            {questionFile.size} MB
                                                        </div>
                                                    </div>
                                                    <DownloadOutlined className='text-[#4EA8B4] text-2xl cursor-pointer' />
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <CustomSkeletonParagraph />
                                )}
                            </div>
                        </SideBarMentor>
                    </div>
                    <ButtonPrimary
                        title={
                            query.data?.questionType === QuestionEnum.FILE
                                ? 'Kết thúc cuộc trò chuyện'
                                : 'Hoàn thành buổi meet room'
                        }
                        className='ml-[432px] mt-6 !w-fit'
                        disabled={
                            query.data?.questionType === QuestionEnum.FILE
                                ? !answer
                                : !query.data?.meetingURL
                        }
                        onClick={() => {
                            onNext();
                        }}
                    />
                </>
            )}
        </div>
    );
}
