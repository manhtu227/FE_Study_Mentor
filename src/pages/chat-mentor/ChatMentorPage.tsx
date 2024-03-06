'use client';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CardInfoExchange } from '@components/card/CardInfoExchange';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { ChatModel, ChatTitleModel } from '@core/models/chat.model';
import { Mentor } from '@core/models/profile.model';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat from './components/Chat';
import { mockData } from './components/mockData';

const mockDataInfo: Mentor = {
    id: 4,
    image: images.feedback.src,
    name: 'Nguyễn Hương',
    age: 23,
    rating: 5,
    tags: ['tag1', 'tag2', 'tag3'],
};

export default function ChatMentorPage() {
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
        <div className='pack-layout pb-16 '>
            <div className='flex items-start w-full gap-8'>
                <div style={{ flex: `0 0 435px` }} className='flex flex-col gap-8'>
                    {/* <SideBarChat onSelectData={handleDataChat} title={titleOriginal} /> */}
                    <CardInfoExchange />
                    <div className='flex flex-col gap-4'>
                        <span className='font-bold text-lg text-black-800'>Người hướng dẫn</span>
                        <CardMentorInfo mentor={mockDataInfo} />
                    </div>
                    <ButtonPrimary title='Xem câu trả lời' className='w-full' />
                </div>
                <div className='w-full min-w-[500px]'>
                    <Chat chatList={dataChat} setChatList={handleDataChat} />
                </div>
            </div>
        </div>
    );
}
