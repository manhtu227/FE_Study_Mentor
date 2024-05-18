import BellIcon from '@assets/icons/bell';
import { Button } from 'antd';
import { ReactNode } from 'react';

type NotificationPanelToggleButtonProps = {
    children?: ReactNode;
};

/**
 * The notification panel toggle button.
 */
export default function NotificationPanelToggleButton(props: NotificationPanelToggleButtonProps) {
    const { children = <BellIcon /> } = props;
    return (
        <Button
            className='h-10 w-10 flex items-center justify-center'
            type='primary'
            shape='circle'
        >
            {children}
        </Button>
    );
}
