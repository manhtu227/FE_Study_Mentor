'use client';

import RightOutlined from '@ant-design/icons/RightOutlined';
import BellIcon from '@assets/icons/bell';
import CatalogIcon from '@assets/icons/catalog';
import ChatIcon from '@assets/icons/chat';
import Logo from '@components/logo/Logo';
import { RootState } from '@core/store';
import { setAccessToken } from '@core/store/reducers/authentication.reducer';
import { Button, Dropdown, MenuProps } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
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
            label: <Link href='/logout'>Logout</Link>,
            key: '1',
        },
    ];

    const dispatch = useDispatch();
    const accessToken = useSelector((state: RootState) => state.authentication)?.accessToken ?? '';

    const handleClickLogin = () => {
        dispatch(setAccessToken('access token'));
    };

    return (
        <header className='h-[100px] min-h-[100px] w-full items-center '>
            <nav className='flex h-full items-center px-[44px] bg-white-900'>
                <div className='flex h-full w-2/3 items-center gap-8'>
                    <Logo title='Study Mentor' className='cursor-pointer' />
                    <Button type='link' className='text-primary-900 text-base font-bold '>
                        <Dropdown menu={{ items }}>
                            <div className='flex items-center gap-2 font-bold'>
                                <CatalogIcon
                                    className={clsx({
                                        'h-6 w-6': true,
                                        'text-primary-900': true,
                                    })}
                                />
                                <span>Danh mục</span>
                                <RightOutlined />
                            </div>
                        </Dropdown>
                    </Button>
                    <Button type='link' className='text-primary-900 text-base font-bold '>
                        Dành cho người hướng dẫn
                    </Button>
                    <Button
                        type='link'
                        className='text-primary-900 text-base font-bold'
                        href='/study-method'
                    >
                        Dành cho học viên
                    </Button>
                </div>
                {accessToken ? (
                    <div className='flex w-1/3 items-center justify-end gap-4'>
                        <Button
                            className='h-12 w-12 flex items-center justify-center'
                            type='primary'
                            shape='circle'
                        >
                            <BellIcon />
                        </Button>
                        <Button
                            className='h-12 w-12 flex items-center justify-center'
                            type='primary'
                            shape='circle'
                        >
                            <ChatIcon />
                        </Button>

                        <Button
                            type='link'
                            className='font-bold bg-[#F3F9FA] hover:!bg-[#F3F9FA] rounded-full h-max'
                        >
                            <Dropdown menu={{ items: userItems }}>
                                <div className='flex items-center gap-2 '>
                                    <div className='rounded-full w-10 h-10 bg-[#D9D9D9]' />
                                    <span className='text-primary-900 text-xl'>Sterling</span>
                                    <RightOutlined />
                                </div>
                            </Dropdown>
                        </Button>
                        {/* <div >
                            <div className='rounded-full w-10 h-10 bg-[#D9D9D9]' />
                            <span className='text-primary-900 text-xl'>Sterling</span>
                            <RightOutlined />
                        </div> */}
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
