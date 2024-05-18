'use client';
import images from '@assets/images';
import { ChatList } from '@components/chat/ChatList';
import { Avatar, Tooltip } from 'antd';
import clsx from 'clsx';
import { RefObject, useState } from 'react';

const dataMentor = [
    {
        key: '1',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '2',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '3',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '4',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '5',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '6',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '7',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '8',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '9',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '10',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '11',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '12',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '13',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '14',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '15',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '16',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '17',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '18',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '19',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
];

type Props = {
    className?: string;
    ref?: RefObject<HTMLDivElement>;
};

export function SideBarMessage({ className, ref }: Props) {
    const [keyActive, setKeyActive] = useState('1');

    return (
        <div className={clsx('fixed z-50 top-16 right-0')} ref={ref}>
            <div className={clsx('shadow-lg bg-red-100 h-[calc(100vh-64px)]', className)}>
                <div className='w-full bg-primary-700 p-2 flex justify-between absolute top-0 right-0 left-0'>
                    <div className='flex gap-2 items-center'>
                        <Avatar size={40} src={images.charac1.src} />
                        <span className='font-bold text-white-900'>Jacky</span>
                    </div>
                </div>
                <div className='absolute left-0 top-14 h-[calc(100vh-110px)] bg-white-900'>
                    <div className='hover-scrollbar h-full flex flex-col gap-2 mt-4'>
                        {dataMentor.map((item) => (
                            <Tooltip title={item.name} key={item.key} placement='leftTop'>
                                <div className='flex'>
                                    <div
                                        className='px-3 hover:bg-gray-100 cursor-pointer'
                                        onClick={() => setKeyActive(item.key)}
                                    >
                                        <Avatar size={40} src={item.url} />
                                    </div>
                                    {keyActive === item.key && (
                                        <div className='h-5/6 self-center w-1 rounded-full bg-black-800'></div>
                                    )}
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>
                <ChatList
                    avatar=''
                    dataList={[]}
                    classNameMessage='absolute bottom-2 left-[72px] right-4'
                    onSubmit={() => {}}
                    className='absolute top-14 left-[70px] right-0'
                />
            </div>
        </div>
    );
}
