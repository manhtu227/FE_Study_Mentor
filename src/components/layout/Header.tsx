import React from 'react';
import Logo from '@components/logo/Logo';
import Catalog from '@assets/icons/catalog';
import clsx from 'clsx';
import RightOutlined from '@ant-design/icons/RightOutlined';
import { Button, Dropdown, MenuProps } from 'antd';
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
    return (
        <header className='h-[100px] min-h-[100px] w-full items-center'>
            <nav className='flex h-full items-center px-[44px] dark:bg-white'>
                <div className='flex h-full w-2/3 items-center gap-8'>
                    <Logo title='Study Mentor' />
                    <Button type='link' className='text-darkBlue text-base font-bold '>
                        <Dropdown menu={{ items }}>
                            <div className='flex items-center gap-2 font-bold'>
                                <Catalog
                                    className={clsx({
                                        'h-6 w-6': true,
                                        'text-darkBlue': true,
                                    })}
                                />
                                <span>Danh mục</span>
                                <RightOutlined />
                            </div>
                        </Dropdown>
                    </Button>
                    <Button type='link' className='text-darkBlue text-base font-bold '>
                        Dành cho người hướng dẫn
                    </Button>
                    <Button type='link' className='text-darkBlue text-base font-bold'>
                        Dành cho học viên
                    </Button>
                </div>
                <div className='flex w-1/3 items-center justify-end gap-8'>
                    <Button
                        type='default'
                        size='large'
                        shape='round'
                        className='text-lightBlue border text-base font-bold'
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        type='default'
                        size='large'
                        shape='round'
                        className='bg-lightBlue border text-base font-bold text-white hover:!text-white hover:opacity-85'
                    >
                        Đăng ký
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
