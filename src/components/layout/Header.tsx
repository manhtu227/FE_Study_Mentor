'use client';

import RightOutlined from '@ant-design/icons/RightOutlined';
import Logo from '@components/logo/Logo';
import MessageIcon from '@components/message/MessageIcon';
import ModalFoundTutor from '@components/modal/ModalFoundTutor';
import ModalJoinGoogleMeet from '@components/modal/ModalJoinGoogleMeet';
import NotificationBell from '@components/notification-bell/NotificationBell';
import CompletedQuestionNotification from '@components/notification/CompletedQuestionNotification';
import NewQuestionNotification from '@components/notification/NewQuestionNotification';
import { DEFAULT_DEPLAY_AUTO_CLOSE_NOTIFICATION } from '@core/constants/questions.constant';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { NotificationType } from '@core/enums/notification.enum';
import { QuestionType } from '@core/enums/question.enum';
import { SocketEvent } from '@core/enums/socket.enum';
import { UserType } from '@core/enums/user.enum';
import { QuestionEnum, ReceiveNewQuestionModel } from '@core/models/question.model';
import { UserModel } from '@core/models/user.model';
import { RootState } from '@core/store';
import { addNotification, removeNotification } from '@core/store/reducers/notification.reducer';
import { setCurrentQuestionId } from '@core/store/reducers/question.reducer';
import {
    addReceivedQuestion,
    setIsWatchedLater,
} from '@core/store/reducers/received-questions.reducer';
import { onConnect, onDisconnect } from '@core/store/reducers/socket.reducer';
import { addTutor } from '@core/store/reducers/tutor.reducer';
import { Button, Dropdown, MenuProps } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { defaultSocket } from '../../socket';

const Header = () => {
    const userItems: MenuProps['items'] = [
        {
            label: <Link href='/profile'>Profile</Link>,
            key: '0',
        },
        {
            label: (
                <div
                    onClick={() => {
                        signOut();
                    }}
                >
                    Logout
                </div>
            ),
            key: '2',
        },
    ];

    const router = useRouter();
    const { data } = useSession();
    const [newQuestion, setNewQuestion] = useState<ReceiveNewQuestionModel>();
    const toastId = useRef<any>(null);
    const [isOpenModalFoundTutor, setIsOpenModalFoundTutor] = useState(false);
    const [questionInfo, setQuestionInfo] = useState<{
        questionId: string;
        tutor: UserModel;
        isAccepted: number;
        methodAnswer: QuestionEnum;
    }>();
    const dispatch = useDispatch();
    const receivedQuestions = useSelector(
        (state: RootState) => state.receivedQuestions.receivedQuestions,
    );
    const [completedQuestion, setCompletedQuestion] = useState<any>();
    const [isShowModalReceiveGoogleMeet, setIsShowModalReceiveGoogleMeet] = useState(true);

    const handleReceiveNewQuestion = (data: ReceiveNewQuestionModel) => {
        if (receivedQuestions.find((rq) => rq.questionId === data.questionId)) return;

        toastId.current = toast(
            <NewQuestionNotification
                onClickNotification={handleClickOkNotification}
                onCloseNotification={handleWatchLaterNotification}
                subjectName={data.subject.name}
                price={data.price}
            />,
            {
                position: 'top-left',
                autoClose: DEFAULT_DEPLAY_AUTO_CLOSE_NOTIFICATION,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
                type: 'info',
                onClose: handleWatchLaterNotification,
            },
        );

        dispatch(
            addNotification({
                id: data.questionId,
                message: `Bạn vừa mới nhận được câu hỏi mới từ chủ đề ${data.subject.name} với giá ${data.price} đồng`,
                type: NotificationType.NEW_QUESTION,
                createdAt: data.createdAt,
                questionId: data.questionId,
            }),
        );
        dispatch(addReceivedQuestion({ questionId: data.questionId, isWatchLater: false }));
    };

    const handleClickLogin = () => {
        router.push(MY_ROUTE.LOGIN);
    };

    const handleClickSignUp = () => {
        router.push(MY_ROUTE.SIGN_UP);
    };

    const handleCompleteQuestion = (data: any) => {
        toastId.current = toast(
            <CompletedQuestionNotification
                questionName='Python là gì?'
                subjectName={data.subject.name}
                price={data.price}
            />,
            {
                position: 'top-left',
                autoClose: DEFAULT_DEPLAY_AUTO_CLOSE_NOTIFICATION,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
                type: 'success',
            },
        );

        dispatch(
            addNotification({
                id: data.questionId,
                message: `Câu hỏi chủ đề ${data.subject.name} với giá ${data.price} đồng đã được học viên xác nhận hoàn thành`,
                type: NotificationType.COMPLETED_QUESTION,
                createdAt: data.createdAt,
                questionId: data.questionId,
            }),
        );
    };

    useEffect(() => {
        if (newQuestion) {
            handleReceiveNewQuestion(newQuestion);
        }
    }, [newQuestion]);

    useEffect(() => {
        if (completedQuestion) {
            handleCompleteQuestion(completedQuestion);
        }
    }, [completedQuestion]);

    const mockData = {
        questionId: '1',
        subject: {
            name: 'Python',
        },
        price: 100000,
        createdAt: new Date(),
        questionName: 'Python là gì?',
    };

    useEffect(() => {
        if (data?.user.user.id) {
            dispatch(onDisconnect());

            const socket = defaultSocket(data?.user?.user?.id);

            if (socket) {
                const onConnectSocket = () => {
                    dispatch(onConnect(socket));
                    console.log('connect with id:', data?.user?.user?.id);
                };

                const onDisconnectSocket = () => {
                    dispatch(onDisconnect());
                };

                if (data?.user?.user?.role === UserType.TUTOR) {
                    socket.on(SocketEvent.NEW_QUESTION, (data) => {
                        data.data.createdAt = new Date();
                        setNewQuestion(data.data);

                        if (data.data.methodAnswer === QuestionType.MEETING) {
                            socket.on(SocketEvent.RECEIVE_GGMEET, () => {
                                setIsShowModalReceiveGoogleMeet(true);
                            });
                        }
                    });

                    setTimeout(() => setCompletedQuestion(mockData), 5000);
                }
                if (data?.user?.user?.role === UserType.STUDENT) {
                    socket.on(
                        SocketEvent.TUTOR_ACCEPTED_QUESTION,
                        (data: {
                            data: {
                                questionId: string;
                                tutor: UserModel;
                                methodAnswer: QuestionEnum;
                            };
                        }) => {
                            setIsOpenModalFoundTutor(true);
                            setQuestionInfo({
                                ...data.data,
                                isAccepted: 1,
                            });
                            dispatch(addTutor(data.data.tutor));
                            dispatch(setCurrentQuestionId(data.data.questionId));
                        },
                    );

                    socket.on(
                        SocketEvent.PICKED_TUTOR_ACCEPTED_QUESTION,
                        (data: {
                            data: {
                                questionId: string;
                                tutor: UserModel;
                                isAccepted: number;
                                methodAnswer: QuestionEnum;
                            };
                        }) => {
                            setIsOpenModalFoundTutor(true);
                            setQuestionInfo(data.data);
                            if (data.data.isAccepted === 1) {
                                dispatch(setCurrentQuestionId(data.data.questionId));
                                dispatch(addTutor(data.data.tutor));
                            }
                        },
                    );
                }

                socket.on('connect', onConnectSocket);
                socket.on('disconnect', onDisconnectSocket);
                socket.on('error', (error) => {
                    console.error('Socket error:', error);
                });

                return () => {
                    socket.off('connect', onConnectSocket);
                    socket.off('disconnect', onDisconnectSocket);
                    socket.off('error');
                };
            }
        }
    }, [data?.user.user.id]);

    const handleWatchLaterNotification = () => {
        if (!newQuestion) return;

        dispatch(setIsWatchedLater({ questionId: newQuestion?.questionId, isWatchedLater: true }));
    };

    const handleClickOkNotification = () => {
        toast.dismiss(toastId.current);

        if (newQuestion) {
            router.push(`${MY_ROUTE.MENTOR.RECEIVED_QUESTIONS}/${newQuestion.questionId}`);
            dispatch(removeNotification(newQuestion.questionId));
        }
    };

    return (
        <header className='h-[64px] min-h-[64px] w-full items-center fixed z-50 shadow-md'>
            <ToastContainer />
            {isShowModalReceiveGoogleMeet && (
                <ModalJoinGoogleMeet
                    googleMeetUrl='https://meet.google.com/caf-yvtx-jfk'
                    price={3000}
                    questionName='Test câu hỏi'
                    subjectName='Sinh học'
                />
            )}
            <nav className='flex h-full items-center px-[44px] bg-white-900'>
                <div className='flex h-full w-2/3 items-center gap-8'>
                    <Logo title='Study Mentor' className='cursor-pointer' />
                    {data?.user.user?.role === UserType.TUTOR && (
                        <Link
                            type='link'
                            className='text-primary-900 text-base font-bold no-underline hover:opacity-80'
                            href={MY_ROUTE.MENTOR.RECEIVED_QUESTIONS}
                        >
                            Câu hỏi hiện có
                        </Link>
                    )}
                </div>
                {data?.user.user ? (
                    <div className='flex w-1/3 items-center justify-end gap-4'>
                        <NotificationBell />
                        <MessageIcon />
                        <Button
                            type='link'
                            className='font-bold bg-white-800 hover:!bg-white-800 rounded-full h-max'
                        >
                            <Dropdown menu={{ items: userItems }}>
                                <div className='flex items-center gap-2 '>
                                    <div className='rounded-full w-8 h-8 bg-[#D9D9D9]' />
                                    <div className='text-primary-900 text-base'>
                                        {data.user.user.fullName}
                                    </div>
                                    <RightOutlined />
                                </div>
                            </Dropdown>
                        </Button>
                    </div>
                ) : (
                    <div className='flex w-1/3 items-center justify-end gap-8'>
                        <Button
                            type='default'
                            size='large'
                            shape='round'
                            className='text-lightBlue border text-base font-bold'
                            onClick={handleClickLogin}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            type='default'
                            size='large'
                            shape='round'
                            className='bg-lightBlue border text-base font-bold bg-primary-800 text-white-900 hover:!text-white-900 hover:opacity-85'
                            onClick={handleClickSignUp}
                        >
                            Đăng ký
                        </Button>
                    </div>
                )}
            </nav>

            <ModalFoundTutor
                isModalOpen={isOpenModalFoundTutor}
                setIsModalOpen={setIsOpenModalFoundTutor}
                user={questionInfo?.tutor}
                methodAnswer={questionInfo?.methodAnswer}
                isAccepted={questionInfo?.isAccepted}
                questionId={questionInfo?.questionId}
            />
        </header>
    );
};

export default Header;
