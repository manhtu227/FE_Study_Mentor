'use client';

import RightOutlined from '@ant-design/icons/RightOutlined';
import Logo from '@components/logo/Logo';
import MessageIcon from '@components/message/MessageIcon';
import NotificationPanelToggleButton from '@components/notification/NotificationPanelToggleButton';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { onConnect, onDisconnect } from '@core/store/reducers/socket.reducer';
import { Button, Dropdown, MenuProps } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { defaultSocket } from '../../socket';

const Header = () => {
    const items: MenuProps['items'] = [
        {
            label: (
                <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
                    Toán
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
                    Lý
                </a>
            ),
            key: '1',
        },
    ];

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

    const handleClickLogin = () => {
        router.push(MY_ROUTE.LOGIN);
    };

    const handleClickSignUp = () => {
        router.push(MY_ROUTE.SIGN_UP);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.user.user.id) {
            const socket = defaultSocket(data?.user?.user?.id);
            if (socket) {
                const onConnectSocket = () => {
                    dispatch(onConnect(socket));
                    console.log('connect with id:', data?.user?.user?.id);
                };

                const onDisconnectSocket = () => {
                    dispatch(onDisconnect());
                };

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

    return (
        <header className='h-[64px] min-h-[64px] w-full items-center fixed z-50 shadow-md'>
            <nav className='flex h-full items-center px-[44px] bg-white-900'>
                <div className='flex h-full w-2/3 items-center gap-8'>
                    <Logo title='Study Mentor' className='cursor-pointer' />
                </div>
                {data?.user.user ? (
                    <div className='flex w-1/3 items-center justify-end gap-4'>
                        {/* <Button
                            className='h-12 w-12 flex items-center justify-center'
                            type='primary'
                            shape='circle'
                        >
                            <BellIcon />
                        </Button> */}
                        <NotificationPanelToggleButton />
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
        </header>
    );
};

export default Header;
