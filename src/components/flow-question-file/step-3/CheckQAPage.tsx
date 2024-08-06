'use client';
import { DownloadOutlined } from '@ant-design/icons';
import ButtonPrimary from '@components/button/ButtonPrimary';
import CustomSkeletonParagraph from '@components/skeleton/CustomSkeletonParagraph';
import { SocketEvent } from '@core/enums/socket.enum';
import { MentorType } from '@core/models/profile.model';
import {
    AnswerResponseModel,
    CreateGGMeetModel,
    GetQuestionResponseModel,
    GoogleMeetInfoResp,
    QuestionEnum,
    StatusQuestionReq,
} from '@core/models/question.model';

import images from '@assets/images';
import { CustomDateInput } from '@components/form-input/CustomDateTimeInput';
import { DATE_FORMAT } from '@core/constants/date.constant';
import { QuestionStatus } from '@core/enums/question.enum';
import { UserModel } from '@core/models/user.model';
import { CreateRoomUserReq, createRoomUserIdApi } from '@core/services/chat.service';
import {
    detailedQuestionKeys,
    getDetailedQuestionApi,
    updateStatusQuestionApi,
} from '@core/services/questions.service';
import { RootState } from '@core/store';
import { downloadUrl } from '@core/utilities/download.util';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { imageUtility } from '@core/utilities/image.utility';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Divider } from 'antd';
import { format } from 'date-fns';
import { Dayjs } from 'dayjs';
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
    const [dateGoogleMeet, setDateGoogleMeet] = useState<Dayjs | null>(null);

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
            socketReducer.on(SocketEvent.RECEIVE_GGMEET, (data: GoogleMeetInfoResp) => {
                toastSuccess('Tạo cuộc họp thành công');
                query.refetch();
            });
        }
        return () => {
            socketReducer?.off(SocketEvent.ANSWER);
            socketReducer?.off(SocketEvent.RECEIVE_GGMEET);
        };
    }, [socketReducer, currentQuestionId]);

    const mutateCreateRoom = useMutation({
        mutationFn: (body: CreateRoomUserReq) => createRoomUserIdApi(body),
        onSuccess: () => {
            setIsChat(true);
            toastSuccess('Tạo room chat thành công');
        },
        onError: handleError,
    });

    const mutateUpdateStatusQuestion = useMutation({
        mutationFn: (body: StatusQuestionReq) => updateStatusQuestionApi(body, currentQuestionId),
        onSuccess: () => {
            onNext();
            toastSuccess('Chúc mừng bạn đã hoàn thành câu hỏi');
        },
        onError: handleError,
    });

    const handleCreateGoogleMeet = async () => {
        if (socketReducer) {
            socketReducer?.emit(SocketEvent.SEND_INFO_GOOGLE_MEET, {
                questionId: query.data?.questionId,
                studentId: query.data?.student.id,
                tutorId: query.data?.tutor?.id,
                isStudent: true,
                meeting_start_time: dateGoogleMeet?.toISOString(),
            } as CreateGGMeetModel);
        }
    };

    return (
        <div>
            {isChat ? (
                <ChatMentorPage
                    setIsChat={setIsChat}
                    idRoom={mutateCreateRoom.data?.data.roomId || query.data?.roomId || ''}
                    senderId={query.data?.tutor?.id || ''}
                    tutor={query.data?.tutor}
                    isChat={query.data?.status !== QuestionStatus.DONE}
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
                                        title={
                                            query.data?.status === QuestionStatus.DONE
                                                ? 'Xem đoạn chat'
                                                : query.data?.roomId
                                                ? 'Giải đáp'
                                                : 'Tạo đoạn chat'
                                        }
                                        className='w-full'
                                        onClick={() => {
                                            if (
                                                query.data?.roomId ||
                                                query.data?.status === QuestionStatus.DONE
                                            ) {
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
                                        <div>
                                            <div className='text-base px-2'>
                                                Tham gia tại: {''}
                                                <a
                                                    href={query.data.meetingURL}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    {query.data.meetingURL}
                                                </a>
                                            </div>
                                            <div className='text-base px-2'>
                                                Thời gian: {''}
                                                <span className='font-bold'>
                                                    {format(
                                                        query.data.meeting_start_time ?? new Date(),
                                                        DATE_FORMAT.DATE_TIME.HYPHEN_24H,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className='text-xl '>
                                                Thời gian bạn muốn tham gia google meet
                                            </span>
                                            <CustomDateInput
                                                showTime
                                                classNameForm='mt-4 '
                                                placeholder='Chọn thời gian'
                                                value={dateGoogleMeet}
                                                disabledBeforeDate
                                                onChange={(value) => {
                                                    setDateGoogleMeet(value as Dayjs);
                                                }}
                                            />
                                            <ButtonPrimary
                                                title={'Gửi lời mời'}
                                                className='!w-fit'
                                                disabled={!dateGoogleMeet}
                                                onClick={handleCreateGoogleMeet}
                                            />
                                        </div>
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
                                            <h3 className='text-black-800 font-bold text-lg leading-[27px] m-0 border mb-2'>
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
                                                                extension={
                                                                    file.fileKey.split('.').pop() ||
                                                                    ''
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
                                    </>
                                ) : (
                                    <CustomSkeletonParagraph />
                                )}
                            </div>
                        </SideBarMentor>
                    </div>
                    {query.data?.status === QuestionStatus.DONE && !query.data.isFeedback && (
                        <ButtonPrimary
                            title={'Vui lòng đánh giá'}
                            className='ml-[432px] mt-6 !w-fit'
                            onClick={() => {
                                onNext();
                            }}
                        />
                    )}
                    {query.data?.status !== QuestionStatus.DONE &&
                        query.data?.status !== QuestionStatus.EXPIRED &&
                        query.data?.status !== QuestionStatus.REJECTED && (
                            <ButtonPrimary
                                title={'Xác nhận hoàn thành câu hỏi'}
                                className='ml-[432px] mt-6 !w-fit'
                                disabled={
                                    query.data?.questionType === QuestionEnum.FILE
                                        ? !answer
                                        : !query.data?.meetingURL
                                }
                                onClick={() => {
                                    mutateUpdateStatusQuestion.mutate({
                                        status: QuestionStatus.DONE,
                                    });
                                }}
                            />
                        )}
                </>
            )}
        </div>
    );
}
