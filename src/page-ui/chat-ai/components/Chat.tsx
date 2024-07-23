'use client';
import { ChatList } from '@components/chat/ChatList';
import ModalConfirm from '@components/modal/ModalConfirm';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { CategoryAiEnum } from '@core/enums/ai.enum';
import { ChatModel, RoomReq } from '@core/models/chat.model';
import { FileReq } from '@core/models/file.model';
import { parseDateTimeISO8601 } from '@core/parser/datetime.parser';
import {
    ChatWithAiReq,
    chatAIRoomListKeys,
    chatWithAiApi,
    createRoomAiIdApi,
} from '@core/services/chat.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
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
    const [modalConfirm, setModalConfirm] = useState(false);
    const router = useRouter();

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
            console.log('resp', resp.data.isOutOfScope);
            if (resp.data.isOutOfScope) {
                const lastCheck = localStorage.getItem('ai-check');
                // if (lastCheck) {
                const lastCheckDate = dayjs(lastCheck);
                console.log('lastCheckDate', lastCheck);
                console.log('sao', dayjs().diff(lastCheckDate, 'minute'));
                // so sánh thời gian hiện tại lớn hơn với thời gian lần cuối check
                if (!lastCheck || dayjs().diff(lastCheckDate, 'hour') > 2) {
                    setModalConfirm(true);
                    return;
                }
                // }
            }
            setChatList([...chatList, resp.data]);
            queryClient.invalidateQueries({
                queryKey: chatAIRoomListKeys.lists(),
            });
        },
    });

    const mutateCreateRoom = useMutation({
        mutationFn: (body: RoomReq) => createRoomAiIdApi(data!.user.user.id, categoryAi, body),
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
        <>
            <ChatList
                avatar={avatar}
                dataList={chatList}
                isLoadingEnd={mutateChat.isPending}
                onSubmit={handleSubmit}
                classNameMessage='absolute left-4 right-4 bottom-4'
                className='absolute left-4 right-4 top-20 max-h-[calc(100vh-254px)] hover-scrollbar'
            />
            <ModalConfirm
                isOpen={modalConfirm}
                setIsOpen={setModalConfirm}
                onConfirm={() => {
                    router.push(MY_ROUTE.MENTOR.FILE);
                }}
                onCancel={() => {
                    localStorage.setItem('ai-check', dayjs().toISOString());
                    setModalConfirm(false);
                }}
                titleCancel='Hủy'
                titleYes='Đồng ý'
                message='Xin lỗi câu này AI không trả lời được, chúng tôi có gợi ý bạn qua người hướng dẫn trả lời'
            />
        </>
        // <Spin spinning={isFetchingData || mutateChat.isPending}>

        // <MessageForm onSubmit={handleSubmit} className='absolute left-4 right-4 bottom-4' />
        // </Spin>
    );
}
