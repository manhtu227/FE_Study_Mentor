'use client';
import { RightOutlined } from '@ant-design/icons';
import { ChatModel, ChatTitleModel } from '@core/models/chat.model';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat from './components/Chat';
import SideBarChat from './components/SideBarChat';
import { mockData } from './components/mockData';

export default function ChatAiPage() {
    const [dataChat, setDataChat] = useState<ChatModel[]>(mockData);
    const [titleOriginal, setTitleOriginal] = useState<ChatTitleModel>();

    const handleDataChat = useCallback(
        (data: ChatModel[], isTitle?: boolean) => {
            if (dataChat.length === 0 && isTitle) {
                setTitleOriginal({
                    id: uuidv4(),
                    name: data[0].value,
                    data: data,
                });
            }
            setDataChat(data);
        },
        [dataChat],
    );

    return (
        <div className='pack-layout pb-16 px-4'>
            <div className='h-[69px] flex items-center gap-4 text-sm font-bold text-primary-800'>
                <span>Trang chủ</span>
                <RightOutlined />
                <span>Giải đáp</span>
                <RightOutlined />
                <span className='text-black-800'>Trả lời bằng AI</span>
            </div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[435px]'>
                    <SideBarChat onSelectData={handleDataChat} title={titleOriginal} />
                </div>
                <div className='w-full min-w-[500px]'>
                    <Chat chatList={dataChat} setChatList={handleDataChat} />
                </div>
            </div>
        </div>
    );
}
