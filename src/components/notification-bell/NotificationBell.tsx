// components/NotificationBell.tsx
import {
    CheckCircleOutlined,
    CheckSquareOutlined,
    CloseOutlined,
    DollarOutlined,
    GiftOutlined,
    PushpinOutlined,
    QuestionCircleOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons';
import BellIcon from '@assets/icons/bell';
import ModalConfirmGoogleMeet from '@components/modal/ModalConfirmGoogleMeet';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { NotificationTitle, NotificationType } from '@core/enums/notification.enum';
import { Notification } from '@core/models/notification.model';
import { CreateGGMeetModel, QuestionEnum } from '@core/models/question.model';
import { UserRole } from '@core/models/user.model';
import {
    createGoogleMeetApi,
    deleteAllNotificationApi,
    deleteNotificationApi,
} from '@core/services/user.service';
import { clearNotifications, removeNotification } from '@core/store/reducers/notification.reducer';
import { setCurrentQuestionId } from '@core/store/reducers/question.reducer';
import { calculateTimeAgo } from '@core/utilities/calculate-time-ago';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation } from '@tanstack/react-query';
import { Badge, Button, Drawer, List } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

type IProps = {
    notifications?: Notification[];
};

const NotificationBell: React.FC<IProps> = ({ notifications }: IProps) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { data } = useSession();
    const [isOpenGoogleMeet, setIsOpenGoogleMeet] = useState(false);
    const [notifcation, setNotification] = useState<Notification | null>(null);

    // Query
    const deleteNotification = useMutation({
        onMutate: async (id: string) => {
            deleteNotificationApi(id);
        },
    });

    const deleteAllNotifications = useMutation({
        onMutate: async () => {
            deleteAllNotificationApi();
        },
    });

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    const handleDismissAllNotifications = () => {
        dispatch(clearNotifications());
        deleteAllNotifications.mutate();
    };

    const drawerTitle = (
        <div className='flex items-center justify-between'>
            <span className='font-bold text-2xl'>Thông báo</span>
            {notifications && notifications?.length > 0 && (
                <button
                    className='underline text-blue-600 text-sm cursor-pointer hover:opacity-80 bg-transparent border-none'
                    onClick={handleDismissAllNotifications}
                >
                    Xóa tất cả
                </button>
            )}
        </div>
    );

    const handleShowTitleNotification = (type: NotificationType): string => {
        switch (type) {
            case NotificationType.NEW_QUESTION:
                return NotificationTitle.NEW_QUESTION;
            case NotificationType.COMPLETED_QUESTION:
                return NotificationTitle.COMPLETED_QUESTION;
            case NotificationType.STUDENT_PICK_TUTOR:
                return NotificationTitle.STUDENT_PICK_TUTOR;
            case NotificationType.PAID_SUCCESS_FOR_TUTOR:
                return NotificationTitle.PAID_SUCCESS_FOR_TUTOR;
            case NotificationType.TUTOR_ACCEPTED_QUESTION:
                return NotificationTitle.TUTOR_ACCEPTED_QUESTION;
            case NotificationType.PICKED_TUTOR_ACCEPTED_QUESTION:
                return NotificationTitle.PICKED_TUTOR_ACCEPTED_QUESTION;
            case NotificationType.SEND_VOUCHER:
                return NotificationTitle.SEND_VOUCHER;
            default:
                return '';
        }
    };

    const handleShowIconNotification = (type: NotificationType): React.ReactNode => {
        switch (type) {
            case NotificationType.NEW_QUESTION:
                return <QuestionCircleOutlined />;
            case NotificationType.COMPLETED_QUESTION:
                return <CheckCircleOutlined />;
            case NotificationType.STUDENT_PICK_TUTOR:
                return <PushpinOutlined />;
            case NotificationType.PAID_SUCCESS_FOR_TUTOR:
                return <DollarOutlined />;
            case NotificationType.TUTOR_ACCEPTED_QUESTION:
                return <UsergroupDeleteOutlined />;
            case NotificationType.PICKED_TUTOR_ACCEPTED_QUESTION:
                return <CheckSquareOutlined />;
            case NotificationType.SEND_VOUCHER:
                return <GiftOutlined />;
            default:
                return null;
        }
    };

    const handleRemoveNotification = (e: MouseEvent<HTMLDivElement>, id: string) => {
        e.stopPropagation();
        dispatch(removeNotification(id));
        deleteNotification.mutate(id);
    };

    const handleRedirectWhenClickedNoti = (notification: Notification) => {
        switch (notification.type) {
            case NotificationType.NEW_QUESTION:
                if (data?.user?.user?.role === UserRole.STUDENT) {
                    dispatch(setCurrentQuestionId(notification.question.id || ''));
                    router.push(
                        `${
                            notification.question.questionType === QuestionEnum.GG_MEET
                                ? MY_ROUTE.MENTOR.GOOGLE_MEET
                                : MY_ROUTE.MENTOR.FILE
                        }?step=1`,
                    );
                } else {
                    router.push(
                        `${MY_ROUTE.MENTOR.RECEIVED_QUESTIONS}/${notification.question.id}`,
                    );
                }
                break;
            case NotificationType.STUDENT_PICK_TUTOR:
                router.push(`${MY_ROUTE.MENTOR.RECEIVED_QUESTIONS}/${notification.question.id}`);
                break;
            case NotificationType.COMPLETED_QUESTION:
                if (data?.user?.user?.role === UserRole.STUDENT) {
                    dispatch(setCurrentQuestionId(notification.question.id || ''));
                    router.push(
                        `${
                            notification.question.questionType === QuestionEnum.GG_MEET
                                ? MY_ROUTE.MENTOR.GOOGLE_MEET
                                : MY_ROUTE.MENTOR.FILE
                        }?step=3`,
                    );
                } else {
                    router.push(`${MY_ROUTE.DASHBOARD_TUTOR}`);
                }
                break;
            case NotificationType.PAID_SUCCESS_FOR_TUTOR:
                if (data?.user?.user?.role === UserRole.TUTOR) {
                    router.push(`${MY_ROUTE.DASHBOARD_TUTOR}`);
                } else {
                    router.push(`${MY_ROUTE.DASHBOARD_STUDENT}`);
                }
                break;
            case NotificationType.TUTOR_ACCEPTED_QUESTION:
                if (data?.user?.user?.role === UserRole.STUDENT) {
                    dispatch(setCurrentQuestionId(notification.question.id || ''));
                    router.push(
                        `${
                            notification.question.questionType === QuestionEnum.GG_MEET
                                ? MY_ROUTE.MENTOR.GOOGLE_MEET
                                : MY_ROUTE.MENTOR.FILE
                        }?step=2`,
                    );
                }
                break;
            case NotificationType.PICKED_TUTOR_ACCEPTED_QUESTION:
                if (data?.user?.user?.role === UserRole.STUDENT) {
                    dispatch(setCurrentQuestionId(notification.question.id || ''));
                    router.push(
                        `${
                            notification.question.questionType === QuestionEnum.GG_MEET
                                ? MY_ROUTE.MENTOR.GOOGLE_MEET
                                : MY_ROUTE.MENTOR.FILE
                        }?step=2`,
                    );
                }
                break;
            case NotificationType.SEND_VOUCHER:
                dispatch(removeNotification(notification!.id!));
                deleteNotification.mutate(notification!.id!);
            default:
                break;
        }
    };

    const handleClickNotification = (item: Notification) => {
        closeDrawer();

        handleRedirectWhenClickedNoti(item);
    };

    const mutationCreate = useMutation({
        mutationFn: (data: CreateGGMeetModel) => createGoogleMeetApi(data),
        onError: handleError,
    });

    return (
        <div className='notification-bell-custom'>
            <Badge count={notifications && notifications?.length}>
                <Button
                    className='h-10 w-10 flex items-center justify-center'
                    type='primary'
                    shape='circle'
                    onClick={showDrawer}
                >
                    <BellIcon />
                </Button>
            </Badge>
            <Drawer
                style={{ backgroundColor: '#f1f5f9' }}
                title={drawerTitle}
                placement='right'
                onClose={closeDrawer}
                visible={visible}
            >
                <List
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <div
                                className='flex gap-3 justify-between items-center bg-white-900 rounded-lg shadow-md p-4 cursor-pointer
                                hover:bg-gray-100 transition-colors duration-300 ease-in-out'
                                onClick={() => handleClickNotification(item)}
                            >
                                <div className='text-3xl'>
                                    {handleShowIconNotification(item.type)}
                                </div>
                                <div>
                                    <div className='font-medium text-lg'>
                                        {handleShowTitleNotification(item.type)}
                                    </div>
                                    <div>{item.message}</div>
                                    <div className='text-gray-400 font-light'>
                                        {item?.createdAt && calculateTimeAgo(item?.createdAt)}
                                    </div>
                                </div>
                                <div
                                    className='flex self-baseline cursor-pointer'
                                    onClick={(e) => handleRemoveNotification(e, item.id ?? '')}
                                >
                                    <CloseOutlined />
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </Drawer>

            <ModalConfirmGoogleMeet
                isModalOpen={isOpenGoogleMeet}
                setIsModalOpen={() => {
                    setIsOpenGoogleMeet(false);
                }}
                questionDetail={
                    {
                        questionId: notifcation?.question.id || '',
                        tutor: notifcation?.tutor,
                        student: notifcation?.student,
                        price: notifcation?.question.price || '',
                        answers: notifcation?.question.answers || null,
                        subject: notifcation?.question.subject,
                        title: notifcation?.question.title,
                    } as any
                }
                timeStart={notifcation?.meeting_start_time || ''}
                onAccept={() => {
                    mutationCreate.mutate(
                        {
                            questionId: notifcation!.question!.id!,
                            tutorId: notifcation!.tutor!.id!,
                            studentId: notifcation!.student!.id,
                            meeting_start_time: notifcation?.meeting_start_time,
                            // meeting_start_time
                        },
                        {
                            onSuccess: () => {
                                setIsOpenGoogleMeet(false);
                                toastSuccess('Tạo cuộc họp thành công');
                            },
                        },
                    );
                }}
            />
        </div>
    );
};

export default NotificationBell;
