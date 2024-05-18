'use client';
import images from '@assets/images';
import { CategoryAiEnum } from '@core/enums/ai.enum';
import { ChatModel } from '@core/models/chat.model';
import { getEnum } from '@core/parser/enum.parser';
import { getDetailMessageChatAiApi } from '@core/services/chat.service';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import Chat from './components/Chat';
import ChatHeader from './components/ChatHeader';
import SideBarChat from './components/SideBarChat';

export enum AIFreeOrPaidEnum {
    FREE = 'free',
    PAID = 'paid',
}

export default function ChatAiPage({ type }: { type: AIFreeOrPaidEnum }) {
    const [dataChat, setDataChat] = useState<ChatModel[]>([]);
    const searchParams = useSearchParams();
    const roomId = useMemo(() => searchParams && searchParams.get('room'), [searchParams]);

    const mutateGetListMessage = useMutation({
        mutationFn: (id: string) => getDetailMessageChatAiApi(id),
        onSuccess: (resp) => {
            handleDataChat(resp.data || []);
        },
    });

    const categoryAi = useMemo(() => {
        if (type === AIFreeOrPaidEnum.PAID) {
            return CategoryAiEnum.SYSTEM;
        }
        return (
            (searchParams && getEnum<CategoryAiEnum>(searchParams.get('type'), CategoryAiEnum)) ||
            CategoryAiEnum.CHAT_GPT
        );
    }, [searchParams]);

    const handleDataChat = useCallback(
        (data: ChatModel[]) => {
            setDataChat(data);
        },
        [dataChat],
    );

    return (
        <div className='pack-layout pt-4 px-4'>
            <div className={clsx('flex items-start w-full gap-8')}>
                <div className='fixed min-w-[400px] h-[calc(100vh-100px)] hover-scrollbar z-10'>
                    <SideBarChat
                        onSetData={handleDataChat}
                        categoryAi={categoryAi}
                        mutateGetMessageByRoomId={mutateGetListMessage}
                    />
                </div>
                <div
                    className={clsx(
                        'ml-[432px] w-full bg-white-900 rounded-md flex flex-col gap-8',
                    )}
                >
                    <div className='fixed left-0 right-0 z-0'>
                        <div className='pack-layout '>
                            <div className='bg-white-900 relative h-[calc(100vh-100px)] ml-[432px]'>
                                <ChatHeader
                                    name={categoryAi}
                                    avatar={
                                        categoryAi === CategoryAiEnum.CHAT_GPT
                                            ? images.chatPGT.src
                                            : images.gemini.src
                                    }
                                    className='absolute top-4 left-4 right-4'
                                />
                                <Chat
                                    chatList={dataChat}
                                    setChatList={handleDataChat}
                                    isFetchingData={mutateGetListMessage.isPending}
                                    avatar={
                                        categoryAi === CategoryAiEnum.CHAT_GPT
                                            ? images.chatPGT.src
                                            : images.gemini.src
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {/* <ChatHeader
                        name={categoryAi}
                        avatar={
                            categoryAi === CategoryAiEnum.CHAT_GPT
                                ? images.chatPGT.src
                                : images.gemini.src
                        }
                    /> */}
                </div>
            </div>
            {/* <div className='flex items-start w-full gap-8'>
                <div className='w-[435px]'>
                    <SideBarChat
                        onSetData={handleDataChat}
                        categoryAi={categoryAi}
                        mutateGetMessageByRoomId={mutateGetListMessage}
                    />
                </div>
                <div className='w-full min-w-[500px]'>
                    <div className='bg-white-900 p-8'>
                        <ChatHeader
                            name={categoryAi}
                            avatar={
                                categoryAi === CategoryAiEnum.CHAT_GPT
                                    ? images.chatPGT.src
                                    : images.gemini.src
                            }
                        />
                        <Chat
                            chatList={dataChat}
                            setChatList={handleDataChat}
                            isFetchingData={mutateGetListMessage.isPending}
                            avatar={
                                categoryAi === CategoryAiEnum.CHAT_GPT
                                    ? images.chatPGT.src
                                    : images.gemini.src
                            }
                        />
                    </div>
                </div>
            </div> */}
        </div>
    );
}
function dayjs(): import('dayjs').Dayjs {
    throw new Error('Function not implemented.');
}
