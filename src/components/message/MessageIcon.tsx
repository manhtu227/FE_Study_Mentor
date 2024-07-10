'use client';
import ChatIcon from '@assets/icons/chat';
import { RootState } from '@core/store';
import { Badge, Button } from 'antd';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { SideBarMessage } from './SidebarMessage';

type NotificationPanelToggleButtonProps = {
    children?: ReactNode;
};

/**
 * The notification panel toggle button.
 */
export default function MessageIcon(props: NotificationPanelToggleButtonProps) {
    const { children = <ChatIcon /> } = props;
    const [active, setActive] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const roomChatReducer = useSelector((state: RootState) => state.roomChat);

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef?.current && !sidebarRef.current.contains(event.target as Node)) {
            setActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    //     if (active) {
    //     }
    // }, [roomChatReducer.roomIds.length]);

    return (
        <>
            <Badge count={roomChatReducer.roomIds?.length}>
                <Button
                    className='h-10 w-10 flex items-center justify-center'
                    type='primary'
                    shape='circle'
                    onClick={() => setActive(!active)}
                >
                    {children}
                </Button>
            </Badge>
            <SideBarMessage
                sideBarRef={sidebarRef}
                className={clsx('sidebar-message', active ? 'active' : ' ')}
            />
        </>
    );
}
