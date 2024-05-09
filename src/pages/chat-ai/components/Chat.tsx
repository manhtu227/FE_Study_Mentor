'use client';

import { CategoryAiEnum } from '@core/enums/ai.enum';
import { ChatModel, RoomReq } from '@core/models/chat.model';
import { parseDateTimeISO8601 } from '@core/parser/datetime.parser';
import { getEnum } from '@core/parser/enum.parser';
import {
    chatAIRoomListKeys,
    chatWithAiApi,
    ChatWithAiReq,
    createRoomIdApi,
} from '@core/services/chat.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Image, Spin } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import MessageForm from './MessageForm';

type ChatProps = {
    chatList: ChatModel[];
    setChatList: (chatList: ChatModel[], isTitle?: boolean) => void;
    avatar: string;
    isFetchingData?: boolean;
};

export default function Chat({ chatList, setChatList, isFetchingData, avatar }: ChatProps) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const { data } = useSession();
    const categoryAi = useMemo(
        () =>
            (searchParams && getEnum<CategoryAiEnum>(searchParams.get('type'), CategoryAiEnum)) ||
            CategoryAiEnum.CHAT_GPT,
        [searchParams],
    );
    const roomId = useMemo(() => searchParams && searchParams.get('room'), [searchParams]);

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
    const mutateChat = useMutation({
        mutationFn: (body: ChatWithAiReq) => chatWithAiApi(data!.user.user.id, categoryAi, body),
        onSuccess: (resp) => {
            setChatList([...chatList, resp.data]);
            queryClient.invalidateQueries({
                queryKey: chatAIRoomListKeys.lists(),
            });
        },
    });

    const mutateCreateRoom = useMutation({
        mutationFn: (body: RoomReq) => createRoomIdApi(data!.user.user.id, categoryAi, body),
        onSuccess: (resp) => {
            mutateChat.mutateAsync({
                question: chatList[chatList.length - 1].value,
                roomId: resp.data.RoomId,
            });
        },
    });

    const queryClient = useQueryClient();
    const handleSubmit = async (value: string, files: string[]) => {
        const newChat: ChatModel = {
            questionId: uuidv4(),
            senderId: data!.user.user.id,
            contactId: '',
            value: value,
            files: files,
            createdAt: parseDateTimeISO8601(dayjs()),
        };
        setChatList([...chatList, newChat], true);
        if (chatList.length === 0) {
            mutateCreateRoom.mutate({
                TitleRoom: value,
            });

            return;
        }
        if (roomId)
            mutateChat.mutateAsync({
                question: value,
                roomId: roomId,
            });
    };
    console.log('chatList', chatList);
    return (
        <Spin spinning={isFetchingData || mutateChat.isPending}>
            <div className='mt-4 h-[576px] p-6 overflow-auto' ref={chatContainerRef}>
                {chatList.map((item, index) => {
                    const checkedMine = item.senderId === data?.user.user.id;
                    let checked = !checkedMine;
                    if (index !== 0 && item.contactId && chatList[index - 1]?.contactId) {
                        checked = chatList[index - 1]?.contactId !== item.contactId;
                    }
                    return (
                        <div
                            key={index}
                            className={clsx(
                                `flex flex-col gap-4`,

                                index !== 0 ? (checked ? 'mt-8' : 'mt-[10px]') : '',
                            )}
                        >
                            <ChatItem
                                value={item.value}
                                createdAt={item.createdAt}
                                checkedMine={checkedMine}
                                avatar={checked ? (!checkedMine ? avatar : undefined) : undefined}
                                files={item.files}
                            />
                        </div>
                    );
                })}
            </div>
            <MessageForm onSubmit={handleSubmit} />
        </Spin>
    );
}

type ChatItemProps = {
    value: string;
    createdAt?: string;
    avatar?: string;
    files?: string[];
    checkedMine: boolean;
};

function ChatItem({ value, avatar, files, checkedMine }: ChatItemProps) {
    return (
        <div className={clsx('flex gap-4  w-full', !checkedMine ? 'justify-start' : 'justify-end')}>
            {avatar ? (
                <div style={{ flex: `0 0 40px` }}>
                    <Avatar size={40} src={avatar} />
                </div>
            ) : (
                <div style={{ flex: `0 0 40px` }}></div>
            )}
            <div
                className={clsx('flex flex-col gap-[10px] ', avatar ? 'items-start' : 'items-end')}
            >
                <div className='flex items-center w-fit'>
                    <div
                        className='bg-white-800 rounded-2xl py-2 px-4 text-base w-fit tag-p'
                        style={{ whiteSpace: checkedMine ? 'pre-line' : '' }}
                    >
                        <ReactMarkdown>{value}</ReactMarkdown>
                    </div>
                </div>
                {files && (
                    <div
                        className={clsx(
                            'flex flex-wrap gap-2 max-w-[416px]',
                            avatar ? 'justify-start' : 'justify-end',
                        )}
                    >
                        {files.map((file) => (
                            <div key={file} className='flex gap-2 items-center'>
                                <Image
                                    className='max-w-[200px] max-h-[100px] rounded-lg'
                                    src={file}
                                    alt='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
