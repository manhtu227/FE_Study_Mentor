'use client';
import { ChatList } from '@components/chat/ChatList';
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
import { Button, Modal, Radio } from 'antd';
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
    const [value, setValue] = useState(0);

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
            if (resp.data.isOutOfScope) {
                const lastCheck = localStorage.getItem('ai-check');
                // if (lastCheck) {
                const lastCheckDate = dayjs(lastCheck);

                // so sánh thời gian hiện tại lớn hơn với thời gian lần cuối check
                if (!lastCheck || dayjs().diff(lastCheckDate, 'hour') > 2) {
                    setModalConfirm(true);
                    return;
                }
                // }
            }
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

            <Modal
                // title='Chọn nền tảng AI mà bạn muốn trò chuyện'
                centered
                open={modalConfirm}
                footer={null}
                closable={true}
                onCancel={() => setModalConfirm(false)}
            >
                <div className='font-medium '>
                    Xin lỗi câu này AI không trả lời được, Chúng tôi có{' '}
                    {categoryAi !== CategoryAiEnum.SYSTEM ? 3 : 2} gợi ý cho bạn
                </div>
                <Radio.Group
                    onChange={(value) => {
                        setValue(value.target.value);
                    }}
                    value={value}
                    className='flex flex-col my-3 gap-2'
                >
                    {categoryAi !== CategoryAiEnum.SYSTEM && (
                        <Radio value={0}>Trả lời bằng AI Premium</Radio>
                    )}
                    <Radio value={1}>Trả lời bằng File qua người hướng dẫn</Radio>
                    <Radio value={2}>Trả lời bằng google meet qua người hướng dẫn</Radio>
                </Radio.Group>
                <div className='flex justify-center w-full gap-4'>
                    <Button
                        onClick={() => setModalConfirm(false)}
                        type='default'
                        className='bg-gray-custom-600 h-[54px] text-base text-white font-bold w-full border-gray-custom-600'
                    >
                        Hủy
                    </Button>
                    <Button
                        type='primary'
                        className='bg-primary-custom-900  h-[54px] text-base font-bold text-white w-full'
                        onClick={() => {
                            if (value === 0) {
                                if (data?.user.user.isMembership) {
                                    router.push(MY_ROUTE.AI.PAID);
                                } else {
                                    router.push(MY_ROUTE.AI.UPGRADE);
                                }
                            }
                            if (value === 1) {
                                router.push(MY_ROUTE.MENTOR.FILE);
                            }
                            if (value === 2) {
                                router.push(MY_ROUTE.MENTOR.GOOGLE_MEET);
                            }
                        }}
                        // loading={true}
                    >
                        Đồng ý
                    </Button>
                </div>
            </Modal>

            {/* <ModalConfirm
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
            /> */}
        </>
        // <Spin spinning={isFetchingData || mutateChat.isPending}>

        // <MessageForm onSubmit={handleSubmit} className='absolute left-4 right-4 bottom-4' />
        // </Spin>
    );
}
