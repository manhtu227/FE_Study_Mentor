'use client';
import { ChatList } from '@components/chat/ChatList';
import { CategoryAiEnum } from '@core/enums/ai.enum';
import { ChatModel, RoomReq } from '@core/models/chat.model';
import { FileReq } from '@core/models/file.model';
import { parseDateTimeISO8601 } from '@core/parser/datetime.parser';
import {
    ChatWithAiReq,
    chatAIRoomListKeys,
    chatWithAiApi,
    createRoomIdApi,
} from '@core/services/chat.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ChatProps = {
    chatList: ChatModel[];
    setChatList: (chatList: ChatModel[], isTitle?: boolean) => void;
    avatar: string;
    isFetchingData?: boolean;
    categoryAi: CategoryAiEnum;
};

export default function Chat({
    chatList,
    setChatList,
    // isFetchingData,
    avatar,
    categoryAi,
}: ChatProps) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const { data } = useSession();

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
                question: chatList[chatList.length - 1].content,
                files: chatList[chatList.length - 1].files,
                roomId: resp.data.RoomId,
            });
        },
    });

    const queryClient = useQueryClient();

    const handleSubmit = async (value: string, files?: FileReq[] | null) => {
        const newChat: ChatModel = {
            questionId: uuidv4(),
            senderId: data!.user.user.id,
            recipientId: chatList.length === 0 ? '' : chatList[0].recipientId,
            content: value,
            files: files,
            createdAt: parseDateTimeISO8601(dayjs()),
        };
        setChatList([...chatList, newChat]);
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
                files: files,
            });
    };

    return (
        // <Spin spinning={isFetchingData || mutateChat.isPending}>
        <ChatList
            avatar={avatar}
            dataList={chatList}
            isLoadingEnd={mutateChat.isPending}
            onSubmit={handleSubmit}
            classNameMessage='absolute left-4 right-4 bottom-4'
            className='absolute left-4 right-4 top-20 max-h-[calc(100vh-254px)] hover-scrollbar'
        />
        // <MessageForm onSubmit={handleSubmit} className='absolute left-4 right-4 bottom-4' />
        // </Spin>
    );
}
