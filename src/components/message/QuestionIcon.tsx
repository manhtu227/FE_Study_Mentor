'use client';
import ChatIcon from '@assets/icons/chat';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { Badge, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type NotificationPanelToggleButtonProps = {
    children?: ReactNode;
};

export default function QuestionIcon(props: NotificationPanelToggleButtonProps) {
    const { children = <ChatIcon /> } = props;
    const router = useRouter();

    return (
        <>
            <Badge count={0} className='fixed bottom-10 right-6 z-10'>
                <Button
                    className='h-10 w-10 flex items-center justify-center '
                    type='primary'
                    shape='circle'
                    onClick={() => router.push(MY_ROUTE.LIST_QUESTION)}
                >
                    {children}
                </Button>
            </Badge>
        </>
    );
}
