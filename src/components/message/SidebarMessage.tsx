'use client';
import images from '@assets/images';
import { ChatList } from '@components/chat/ChatList';
import { SocketEvent } from '@core/enums/socket.enum';
import { useGetAvatarApi } from '@core/hooks/useGetAvatarApi';
import { ChatModel, RoomModel } from '@core/models/chat.model';
import { FileReq } from '@core/models/file.model';
import {
    getChatMessageListApi,
    getChatRoomListApi,
    getChatRoomListKeys,
} from '@core/services/chat.service';
import { RootState } from '@core/store';
import { addRoom, removeRoom } from '@core/store/reducers/room-chat.reducer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Badge, Tooltip } from 'antd';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { RefObject, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    className?: string;
    sideBarRef?: RefObject<HTMLDivElement>;
};

export function SideBarMessage({ className, sideBarRef }: Props) {
    const [room, setRoom] = useState<RoomModel>();
    const [dataChat, setDataChat] = useState<ChatModel[]>([]);
    const getAvatar = useGetAvatarApi();
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const roomChatReducer = useSelector((state: RootState) => state.roomChat);
    const user = useSession();
    const dispatch = useDispatch();

    const roomQuery = useQuery({
        queryKey: getChatRoomListKeys.all,
        queryFn: () => getChatRoomListApi(),
        select: (data) => data.data.listRoom,
    });

    const mutateGetMessage = useMutation({
        mutationFn: (id: string) => getChatMessageListApi(id),
        onSuccess: (resp) => {
            setDataChat(resp.data.listMessage);
        },
    });

    const handleSubmit = (room: RoomModel) => {
        if (roomChatReducer.roomIds?.includes(room.roomId)) {
            dispatch(removeRoom(room.roomId));
        }
        setRoom(room);
        getAvatar.mutate(room.recipientId);
        mutateGetMessage.mutate(room.roomId);
    };

    const handleSubmitChat = async (value: string, files?: FileReq[] | null) => {
        if (socketReducer) {
            const chatContent: ChatModel = {
                questionId: uuidv4(),
                senderId: user.data?.user.user.id || '',
                recipientId:
                    (user.data?.user.user.id === room?.recipientId
                        ? room?.senderId
                        : room?.recipientId) || '',
                roomId: room?.roomId,
                content: value,
                files: files,
            };
            setDataChat((prev) => [...prev, chatContent]);
            if (
                roomQuery?.data &&
                roomQuery.data.length > 0 &&
                room?.roomId !== roomQuery.data?.[0]?.roomId
            ) {
                roomQuery.refetch();
            }
            socketReducer.emit(SocketEvent.SEND_MESSAGE, chatContent);
        }
    };

    useEffect(() => {
        if (socketReducer && room) {
            socketReducer?.off(SocketEvent.RECEIVE_MESSAGE);
            socketReducer?.on(SocketEvent.RECEIVE_MESSAGE, (data: ChatModel) => {
                if (
                    data.roomId &&
                    data.roomId !== room?.roomId &&
                    !roomChatReducer.roomIds?.includes(data.roomId)
                ) {
                    dispatch(addRoom(data.roomId));
                    return;
                }
                if (
                    roomQuery?.data &&
                    roomQuery.data.length > 0 &&
                    data.roomId !== roomQuery.data?.[0]?.roomId
                ) {
                    roomQuery.refetch();
                }
                setDataChat((prev) => [...prev, data]);
            });
            return () => {
                socketReducer?.off(SocketEvent.RECEIVE_MESSAGE);
            };
        }
    }, [socketReducer, room]);

    useEffect(() => {
        if (roomQuery.data && roomQuery.data.length > 0) {
            const room = roomQuery.data[0];
            getAvatar.mutate(room.recipientId);
            setRoom(room);
            mutateGetMessage.mutate(room.roomId);
        }
    }, [roomQuery.data]);

    return (
        <div className={clsx('fixed z-50 top-16 right-0')} ref={sideBarRef}>
            <div className={clsx('shadow-lg bg-white-800 h-[calc(100vh-64px)]', className)}>
                {roomQuery.data?.length === 0 ? (
                    <div className='flex justify-center items-center h-full'>
                        <span className='text-gray-500 text-2xl font-bold'>No message</span>
                    </div>
                ) : (
                    <>
                        <div className='w-full bg-primary-700 p-2 flex justify-between absolute top-0 right-0 left-0'>
                            <div className='flex gap-2 items-center'>
                                <Avatar size={40} src={room?.avatar || images.teacher.src} />

                                <span className='font-bold text-white-900'>{room?.title}</span>
                            </div>
                        </div>
                        <div className='absolute left-0 top-14 h-[calc(100vh-110px)] bg-white-900'>
                            <div className='hover-scrollbar h-full flex flex-col gap-2 mt-4'>
                                {(roomQuery.data || []).map((item, index) => {
                                    return (
                                        <Tooltip
                                            title={item.title}
                                            key={item.roomId}
                                            placement='leftTop'
                                        >
                                            <div className='flex'>
                                                <div
                                                    className='px-3 py-1 hover:bg-gray-100 cursor-pointer'
                                                    onClick={() => handleSubmit(item)}
                                                >
                                                    <Badge
                                                        dot={roomChatReducer.roomIds?.includes(
                                                            item.roomId,
                                                        )}
                                                        className='badge-dot'
                                                    >
                                                        <Avatar
                                                            size={40}
                                                            src={item?.avatar || images.teacher.src}
                                                        />
                                                    </Badge>
                                                </div>
                                                {room?.roomId === item.roomId && (
                                                    <div className='h-5/6 self-center w-1 rounded-full bg-black-800'></div>
                                                )}
                                            </div>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        </div>
                        <ChatList
                            avatar={room?.avatar || images.teacher.src}
                            dataList={dataChat}
                            classNameMessage='absolute bottom-2 left-[72px] right-4 z-50'
                            onSubmit={handleSubmitChat}
                            isSideBar
                            className='absolute top-14 left-[70px] right-0 bg-white-900 h-[calc(100%-120px)] hover-scrollbar'
                        />
                        <div className='absolute left-[70px]  right-0 bottom-0 h-[65px] bg-white-900 z-10'></div>
                    </>
                )}
            </div>
        </div>
    );
}
