'use client';
import images from '@assets/images';
import { ChatList } from '@components/chat/ChatList';
import { useGetAvatarApi } from '@core/hooks/useGetAvatarApi';
import { ChatModel, RoomModel } from '@core/models/chat.model';
import {
    getChatMessageListApi,
    getChatRoomListApi,
    getChatRoomListKeys,
} from '@core/services/chat.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Tooltip } from 'antd';
import clsx from 'clsx';
import { RefObject, useEffect, useState } from 'react';

const dataMentor = [
    {
        key: '1',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '2',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '3',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '4',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '5',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '6',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '7',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '8',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '9',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '10',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '11',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '12',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '13',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '14',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '15',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '16',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '17',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '18',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
    {
        key: '19',
        name: 'jacky',
        url: images.charac1.src,
        message: 'Hello',
    },
];

type Props = {
    className?: string;
    sideBarRef?: RefObject<HTMLDivElement>;
};

export function SideBarMessage({ className, sideBarRef }: Props) {
    const [room, setRoom] = useState<RoomModel>();
    const [dataChat, setDataChat] = useState<ChatModel[]>([]);
    const getAvatar = useGetAvatarApi();

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
        setRoom(room);
        getAvatar.mutate(room.recipientId);
        mutateGetMessage.mutate(room.roomId);
    };

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
                {dataChat.length === 0 ? (
                    <div className='flex justify-center items-center h-full'>
                        <span className='text-gray-500 text-2xl font-bold'>No message</span>
                    </div>
                ) : (
                    <>
                        <div className='w-full bg-primary-700 p-2 flex justify-between absolute top-0 right-0 left-0'>
                            <div className='flex gap-2 items-center'>
                                <Avatar
                                    size={40}
                                    src={`${process.env.NEXT_PUBLIC_PHOTO}${getAvatar.data?.data.fileKey}`}
                                />
                                <span className='font-bold text-white-900'>{room?.title}</span>
                            </div>
                        </div>
                        <div className='absolute left-0 top-14 h-[calc(100vh-110px)] bg-white-900'>
                            <div className='hover-scrollbar h-full flex flex-col gap-2 mt-4'>
                                {(roomQuery.data || []).map((item) => (
                                    <Tooltip
                                        title={item.title}
                                        key={item.roomId}
                                        placement='leftTop'
                                    >
                                        <div className='flex'>
                                            <div
                                                className='px-3 hover:bg-gray-100 cursor-pointer'
                                                onClick={() => handleSubmit(item)}
                                            >
                                                <Avatar size={40} src={''} />
                                            </div>
                                            {room?.roomId === item.roomId && (
                                                <div className='h-5/6 self-center w-1 rounded-full bg-black-800'></div>
                                            )}
                                        </div>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>
                        <ChatList
                            avatar={`${process.env.NEXT_PUBLIC_PHOTO}${getAvatar.data?.data.fileKey}`}
                            dataList={dataChat}
                            classNameMessage='absolute bottom-2 left-[72px] right-4'
                            onSubmit={() => {}}
                            className='absolute top-14 left-[70px] right-0'
                        />
                    </>
                )}
            </div>
        </div>
    );
}
