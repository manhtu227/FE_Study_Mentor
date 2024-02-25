'use client';

import { ChatModel } from '@core/models/chat.model';
import { parseDateTimeISO8601 } from '@core/parser/datetime.parser';
import { Avatar } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ReactNode, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import sendMessageToChatGPT from './ChatGPTService';
import ChatHeader from './ChatHeader';
import MessageForm from './MessageForm';

type ChatProps = {
    chatList: ChatModel[];
    setChatList: (chatList: ChatModel[], isTitle?: boolean) => void;
};

export default function Chat({ chatList, setChatList }: ChatProps) {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatList) {
            setTimeout(scrollToBottom);
        }
    }, [chatList]);

    function scrollToBottom() {
        if (!chatContainerRef.current) {
            return;
        }
        chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }

    const handleSubmit = async (value: string) => {
        const newChat = {
            id: uuidv4(),
            chatId: '',
            contactId: '',
            value: value,
            createdAt: parseDateTimeISO8601(dayjs()),
        };
        setChatList([...chatList, newChat], true);
        const response = await sendMessageToChatGPT(value);
        setChatList([
            ...chatList,
            newChat,
            {
                ...newChat,
                id: uuidv4(),
                value: response,
                contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
            },
        ]);
    };

    return (
        <div className='bg-white-900 p-8'>
            <ChatHeader />
            <div className='mt-4 h-[576px] p-6 overflow-auto' ref={chatContainerRef}>
                {chatList.map((item, index) => {
                    const checkedMine = item.contactId !== chatList[index - 1]?.contactId;
                    let checked = !!item.contactId;
                    if (index !== 0 && item.contactId && chatList[index - 1]?.contactId) {
                        checked = chatList[index - 1]?.contactId !== item.contactId;
                    }
                    return (
                        <div
                            key={item.id}
                            className={clsx(
                                `flex flex-col gap-4`,
                                item.contactId ? 'items-start' : 'items-end',
                                index !== 0 ? (checkedMine ? 'mt-8' : 'mt-[10px]') : '',
                            )}
                        >
                            <ChatItem
                                value={item.value}
                                createdAt={item.createdAt}
                                isAvatar={checked}
                            />
                        </div>
                    );
                })}
            </div>
            <MessageForm onSubmit={handleSubmit} />
        </div>
    );
}

type ChatItemProps = {
    value: ReactNode;
    createdAt?: string;
    isAvatar?: boolean;
};

function ChatItem({ value, createdAt, isAvatar }: ChatItemProps) {
    return (
        <div className='flex gap-4 items-start'>
            {isAvatar ? (
                <Avatar
                    size={40}
                    src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                />
            ) : (
                <div className='w-10'></div>
            )}
            <div className='flex flex-col gap-[10px]'>
                <div className='flex items-center max-w-full'>
                    <div className='bg-white-800 rounded-full py-2 px-4 text-base'>{value}</div>
                </div>
            </div>
        </div>
    );
}
