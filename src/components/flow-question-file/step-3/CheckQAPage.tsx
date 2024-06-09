'use client';
import { DownloadOutlined } from '@ant-design/icons';
import ButtonPrimary from '@components/button/ButtonPrimary';
import CustomSkeletonParagraph from '@components/skeleton/CustomSkeletonParagraph';
import { SocketEvent } from '@core/enums/socket.enum';
import { useUpdateStepApi } from '@core/hooks/useUpdateStepApi';
import {
    AnswerResponseModel,
    GetQuestionResponseModel,
    QuestionStep,
} from '@core/models/question.model';
import { UserModel } from '@core/models/user.model';
import { CreateRoomUserReq, createRoomUserIdApi } from '@core/services/chat.service';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { RootState } from '@core/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { FileIcon } from 'react-file-icon';
import { useSelector } from 'react-redux';
import { SideBarMentor } from '../SideBarMentor';
import ChatMentorPage from './ChatMentorPage';

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
    const updateStepMutation = useUpdateStepApi();

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
        },
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
                                            <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                                                Tệp đính kèm
                                            </h3>
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
                                                                        questionFile.extension
                                                                    }
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
                                    )}
                            </div>
                            <div className='flex flex-col text-left'>
                                <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border'>
                                    Thông tin câu trả lời
                                </h3>
                                <Divider />
                                {answer ? (
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
                        title={'Kết thúc cuộc trò chuyện'}
                        className='ml-[432px] mt-6 !w-fit'
                        disabled={!answer}
                        onClick={() => {
                            updateStepMutation.mutate({
                                step: QuestionStep.FOUR,
                                questionId: currentQuestionId,
                            });
                            onNext();
                        }}
                    />
                </>
            )}
        </div>
    );
}
