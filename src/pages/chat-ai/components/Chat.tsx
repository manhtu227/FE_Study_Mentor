'use client';

import { chatModel } from '@core/models/chat.model';
import { parseDateTimeISO8601 } from '@core/parser/datetime.parser';
import { Avatar } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import sendMessageToChatGPT from './ChatGPTService';
import ChatHeader from './ChatHeader';
import MessageForm from './MessageForm';

export default function Chat() {
    const [chatList, setChatList] = useState<chatModel[]>(mockData);
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

        setChatList((prev) => [...prev, newChat]);
        const response = await sendMessageToChatGPT(value);
        setChatList((prev) => [
            ...prev,
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

const mockData = [
    {
        id: 'e6b2b82f-b199-4a60-9696-5f3e40d2715d',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Hi!',
        createdAt: '2022-01-05T15:56:48.732Z',
    },
    {
        id: 'eb82cf4b-fa93-4bf4-a88a-99e987ddb7ea',
        chatId: '',
        contactId: '',
        value: 'Hey, dude!',
        createdAt: '2022-01-05T16:04:48.732Z',
    },
    {
        id: '3cf9b2a6-ae54-47db-97b2-ee139a8f84e5',
        chatId: '',
        contactId: '',
        value: 'Long time no see.',
        createdAt: '2022-01-05T16:04:48.732Z',
    },
    {
        id: '2ab91b0f-fafb-45f3-88df-7efaff29134b',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Yeah, man... Things were quite busy for me and my family.',
        createdAt: '2022-01-05T16:06:48.732Z',
    },
    {
        id: '10e81481-378f-49ac-b06b-7c59dcc639ae',
        chatId: '',
        contactId: '',
        value: "What's up? Anything I can help with?",
        createdAt: '2022-01-05T16:06:48.732Z',
    },
    {
        id: '3b334e72-6605-4ebd-a4f6-3850067048de',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: "We've been on the move, changed 3 places over 4 months",
        createdAt: '2022-01-05T16:07:48.732Z',
    },
    {
        id: '25998113-3a96-4dd0-a7b9-4d2bb58db3f3',
        chatId: '',
        contactId: '',
        value: "Wow! That's crazy! 🤯 What happened?",
        createdAt: '2022-01-05T16:07:48.732Z',
    },
    {
        id: '30adb3da-0e4f-487e-aec2-6d9f31e097f6',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'You know I got a job in that big software company. First move was because of that.',
        createdAt: '2022-01-05T16:08:48.732Z',
    },
    {
        id: 'c0d6fd6e-d294-4845-8751-e84b8f2c4d3b',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Then they decided to re-locate me after a month',
        createdAt: '2022-01-05T16:08:48.732Z',
    },
    {
        id: '8d3c442b-62fa-496f-bffa-210ff5c1866b',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Which was an absolute pain because we just set up everything, house, kids school and all that.',
        createdAt: '2022-01-05T16:08:48.732Z',
    },
    {
        id: '3cf26ef0-e81f-4698-ac39-487454413332',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'So we moved the second time.',
        createdAt: '2022-01-05T16:09:48.732Z',
    },
    {
        id: '415151b9-9ee9-40a4-a4ad-2d88146bc71b',
        chatId: '',
        contactId: '',
        value: "It's crazy!",
        createdAt: '2022-01-05T16:09:48.732Z',
    },
    {
        id: '3a2d3a0e-839b-46e7-86ae-ca0826ecda7c',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.',
        createdAt: '2022-01-05T16:10:48.732Z',
    },
    {
        id: '5329c20d-6754-47ec-af8c-660c72be3528',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
        createdAt: '2022-01-05T16:10:48.732Z',
    },
    {
        id: '415151b9-9ee9-40a4-a4ad-2d88146bc71b',
        chatId: '',
        contactId: '',
        value: "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
        createdAt: '2022-01-05T16:11:48.732Z',
    },
    {
        id: 'ea7662d5-7b72-4c19-ad6c-f80320541001',
        chatId: '',
        contactId: '',
        value: '😕',
        createdAt: '2022-01-05T16:11:48.732Z',
    },
    {
        id: '3a2d3a0e-839b-46e7-86ae-ca0826ecda7c',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Thanks, man! It was good catching up with you.',
        createdAt: '2022-01-05T16:11:48.732Z',
    },
    {
        id: '5329c20d-6754-47ec-af8c-660c72be3528',
        chatId: '',
        contactId: '',
        value: 'Yeah dude. Hit me again next week so we can grab a coffee, remotely!',
        createdAt: '2022-01-05T16:12:48.732Z',
    },
    {
        id: '5329c20d-6754-47ec-af8c-660c72be3528',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: ':) Sure, man! See you next week!',
        createdAt: '2022-01-05T16:12:48.732Z',
    },
    {
        id: '5329c20d-6754-47ec-af8c-660c72be3528',
        chatId: '',
        contactId: '',
        value: 'See you later!',
        createdAt: '2022-01-05T16:12:48.732Z',
    },
    {
        id: 'bab8ca0e-b8e5-4375-807b-1c91fca25a5d',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course :)',
        createdAt: '2022-01-12T09:45:48.732Z',
    },
    {
        id: '8445a84d-599d-4e2d-a31c-5f4f29ad2b4c',
        chatId: '',
        contactId: '',
        value: 'Hi!',
        createdAt: '2022-01-12T09:56:48.732Z',
    },
    {
        id: '9f506742-50da-4350-af9d-61e53392fa08',
        chatId: '',
        contactId: '',
        value: "Sure thing! I'm gonna call you in 5, is it okay?",
        createdAt: '2022-01-12T09:56:48.732Z',
    },
    {
        id: 'ca8523d8-faed-45f7-af09-f6bd5c3f3875',
        chatId: '',
        contactId: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        value: 'Awesome! Call me in 5 minutes..',
        createdAt: '2022-01-12T09:58:48.732Z',
    },
    {
        id: '39944b00-1ffe-4ffb-8ca6-13c292812e06',
        chatId: '',
        contactId: '',
        value: '👍🏻',
        createdAt: '2022-01-12T10:00:48.732Z',
    },
];
