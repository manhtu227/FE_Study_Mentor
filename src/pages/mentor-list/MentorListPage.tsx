'use client';
import { SidebarChatItem } from '@components/chat/SideBarChatItem';
import { ChatTitleModel } from '@core/models/chat.model';
import { Pagination, Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import CardListPage from './list/CardListPage';

const listDefault: ChatTitleModel[] = [
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

const onChange = (key: string) => {
    console.log(key);
};
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Đang hoạt động',
        children: <CardListPage />,
    },
    {
        key: '2',
        label: 'Đang theo dõi',
    },
];
export default function MentorListPage() {
    const [activeChat, setActiveChat] = useState<string | number | null>(1);

    return (
        <div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[435px]'>
                    <div className='w-full bg-white-900 rounded-lg'>
                        <div className='p-6 flex flex-col gap-8'>
                            <div className='text-black-800 text-lg font-bold flex items-center'>
                                Câu hỏi hiện có
                            </div>
                            <div className='max-h-[368px] overflow-auto'>
                                <div className='flex flex-col gap-4'>
                                    {listDefault.map((item) => (
                                        <SidebarChatItem
                                            key={item.id}
                                            active={activeChat === item.id}
                                            title={item.name}
                                            onClick={() => {
                                                setActiveChat(item.id);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-white-900 p-8 rounded-md text-center flex flex-col justify-between'>
                    <div>
                        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
                    </div>
                    {/* <ButtonOutlined className='max-w-[142px]' title='Tất cả' isFilterIcon /> */}
                    <Pagination
                        defaultCurrent={1}
                        total={50}
                        className='py-8 flex justify-center'
                    />
                </div>
            </div>
        </div>
    );
}
