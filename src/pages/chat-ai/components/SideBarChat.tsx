'use client';
import DeleteIcon from '@assets/icons/delete-icon';
import SearchIcon from '@assets/icons/search-icon';
import SideBarChatActive from '@assets/icons/sidebar-chat-active';
import SideBarChatDefault from '@assets/icons/sidebar-chat-default';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import clsx from 'clsx';
import { useState } from 'react';

const more = [
    { icon: <DeleteIcon />, title: 'Xóa tất cả câu hỏi' },
    { icon: <DeleteIcon />, title: 'Chuyển chế độ tối' },
    { icon: <DeleteIcon />, title: 'Trợ giúp & FAQ' },
    { icon: <DeleteIcon />, title: 'Trợ giúp & FAQ' },
];

export default function SideBarChat() {
    const [activeChat, setActiveChat] = useState<number | null>(1);
    const list = [
        {
            id: 1,
            name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
        },
        {
            id: 2,
            name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
        },
        {
            id: 3,
            name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
        },
        {
            id: 4,
            name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
        },
        {
            id: 5,
            name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
        },
    ];

    return (
        <div className='w-full bg-white-900 rounded-lg'>
            <div className='p-6 flex flex-col gap-8'>
                <div className='flex justify-between'>
                    <div className='text-black-800 text-lg font-bold flex items-center'>
                        Đoạn chát
                        <div className='w-8 h-6 rounded-full bg-white-800 ml-4 text-center text-sm'>
                            5
                        </div>
                    </div>
                    <ButtonPrimary
                        title='Thêm câu hỏi'
                        className='rounded-full !w-[45%] h-[39px]'
                    />
                </div>
                <CustomTextInput placeholder='Vui lòng nhập' prefix={<SearchIcon />} />
                <div className='max-h-[368px] overflow-auto'>
                    <div className='flex flex-col gap-4'>
                        {list.map((item) => (
                            <SidebarChatItem
                                key={item.id}
                                active={activeChat === item.id}
                                title={item.name}
                                onClick={() => {
                                    setActiveChat(item.id);
                                }}
                            />
                        ))}
                        {/* <SidebarChatItem active />
                        <SidebarChatItem />
                        <SidebarChatItem />
                        <SidebarChatItem />
                        <SidebarChatItem />
                        <SidebarChatItem /> */}
                    </div>
                </div>
                <div className='pack-border-t-primary-400'>
                    {more.map((item, index) => (
                        <div
                            key={index}
                            className='flex items-center px-3 h-12 gap-2 text-base text-primary-900 font-bold hover:bg-white-800 cursor-pointer rounded-lg'
                        >
                            {item.icon}
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

type SidebarChatItemProps = {
    active?: boolean;
    title: string;
    onClick?: () => void;
};

function SidebarChatItem({ active, title, onClick }: SidebarChatItemProps) {
    return (
        <div
            className={clsx(
                'flex items-center gap-2 h-12 rounded-lg px-4 mr-4',
                active
                    ? 'bg-primary-800 text-white-800'
                    : 'bg-transparent text-primary-900 hover:bg-white-800 cursor-pointer',
            )}
            onClick={onClick}
        >
            {active ? <SideBarChatActive /> : <SideBarChatDefault />}
            <span className='text-base truncate'>{title} </span>
        </div>
    );
}
