import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

// const handleMenuClick: MenuProps['onClick'] = (e) => {
//     message.info('Click on menu item.');
//     console.log('click', e);
// };

const items: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: '4rd menu item',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
];

const menuProps = {
    items,
    // onClick: handleMenuClick,
};

export default function DropDownField({ className, title }: { className?: string; title: string }) {
    return (
        <div>
            <Space wrap>
                <Dropdown menu={menuProps} className={className}>
                    <Button>
                        <Space>
                            {title}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Space>
        </div>
    );
}
