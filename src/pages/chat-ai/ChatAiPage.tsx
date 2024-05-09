'use client';
import images from '@assets/images';
import { CategoryAiEnum } from '@core/enums/ai.enum';
import { ChatModel } from '@core/models/chat.model';
import { getEnum } from '@core/parser/enum.parser';
import { getDetailMessageChatAiApi } from '@core/services/chat.service';
import { useMutation } from '@tanstack/react-query';
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

    const mutateGetListMessage = useMutation({
        mutationFn: (id: string) => getDetailMessageChatAiApi(id),
        onSuccess: (resp) => {
            handleDataChat(resp.data || []);
        },
    });

    const categoryAi = useMemo(
        () =>
            (searchParams && getEnum<CategoryAiEnum>(searchParams.get('type'), CategoryAiEnum)) ||
            CategoryAiEnum.CHAT_GPT,
        [searchParams],
    );

    const handleDataChat = useCallback(
        (data: ChatModel[]) => {
            setDataChat(data);
        },
        [dataChat],
    );

    return (
        <div className='pack-layout pb-16 px-4'>
            {/* <div className='h-[69px] flex items-center gap-4 text-sm font-bold text-primary-800'>
                <span>Trang chủ</span>
                <RightOutlined />
                <span>Giải đáp</span>
                <RightOutlined />
                <span className='text-black-800'>Trả lời bằng AI</span>
            </div> */}
            <div className='flex items-start w-full gap-8'>
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
            </div>
        </div>
    );
}
