// components/NotificationBell.tsx
import {
    CheckCircleOutlined,
    CloseOutlined,
    NotificationOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import BellIcon from '@assets/icons/bell';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { NotificationTitle, NotificationType } from '@core/enums/notification.enum';
import { Notification } from '@core/models/notification.model';
import { RootState } from '@core/store';
import { clearNotifications, removeNotification } from '@core/store/reducers/notification.reducer';
import { calculateTimeAgo } from '@core/utilities/calculate-time-ago';
import { Badge, Button, Drawer, List } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NotificationBell: React.FC = () => {
    const notifications = useSelector((state: RootState) => state.notification.notifications);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    const handleDismissAllNotifications = () => {
        dispatch(clearNotifications());
    };

    const drawerTitle = (
        <div className='flex items-center justify-between'>
            <span className='font-bold text-2xl'>Thông báo</span>
            {notifications.length > 0 && (
                <button
                    className='underline text-blue-600 text-sm cursor-pointer hover:opacity-80 bg-transparent border-none'
                    onClick={handleDismissAllNotifications}
                >
                    xóa tất cả
                </button>
            )}
        </div>
    );

    const handleShowTitleNotification = (type: NotificationType): string => {
        switch (type) {
            case NotificationType.NEW_QUESTION:
                return NotificationTitle.NEW_QUESTION;
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
            default:
                return <NotificationOutlined />;
        }
    };

    const handleRemoveNotification = (id: string) => {
        dispatch(removeNotification(id));
    };

    const handleClickNotification = (item: Notification) => {
        closeDrawer();

        if (item.type === NotificationType.NEW_QUESTION) {
            router.push(`${MY_ROUTE.MENTOR.RECEIVED_QUESTIONS}/${item.questionId}`);
            dispatch(removeNotification(item.id));
        }
    };

    return (
        <div className='notification-bell-custom'>
            <Badge count={notifications.length}>
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
                                        {calculateTimeAgo(item?.createdAt)}
                                    </div>
                                </div>
                                <div
                                    className='flex self-baseline cursor-pointer'
                                    onClick={() => handleRemoveNotification(item.id)}
                                >
                                    <CloseOutlined />
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </Drawer>
        </div>
    );
};

export default NotificationBell;
