'use client';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CardInfoExchange } from '@components/card/CardInfoExchange';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { ChatList } from '@components/chat/ChatList';
import { SEND_MESSAGE } from '@core/constants/socket.constants';
import { SocketEvent } from '@core/enums/socket.enum';
import { ChatModel } from '@core/models/chat.model';
import { MentorType } from '@core/models/profile.model';
import { RootState } from '@core/store';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FileReq } from '../../../+core/models/file.model';
import ChatHeader from './components/ChatHeader';

const mockDataInfo: MentorType = {
    id: '4',
    image: images.feedback.src,
    name: 'Nguyễn Hương',
    age: 23,
    rating: 5,
};

type Props = {
    setIsChat: (value: boolean) => void;
    idRoom: string;
    senderId: string;
};

export default function ChatMentorPage({ setIsChat, idRoom, senderId }: Props) {
    const [dataChat, setDataChat] = useState<ChatModel[]>([]);
    const socketReducer = useSelector((state: RootState) => state.socket.socket);

    useEffect(() => {
        socketReducer?.on(SocketEvent.RECEIVE_MESSAGE, (data: ChatModel) => {
            setDataChat((prev) => [...prev, data]);
        });
        return () => {
            socketReducer?.off(SocketEvent.RECEIVE_MESSAGE);
        };
    }, []);

    const { data } = useSession();

    const handleSubmit = async (value: string, files?: FileReq[] | null) => {
        if (socketReducer) {
            const chatContent: ChatModel = {
                questionId: uuidv4(),
                senderId: data?.user?.user?.id || '',
                recipientId: senderId,
                roomId: idRoom,
                content: value,
                files: files,
            };
            setDataChat((prev) => [...prev, chatContent]);
            socketReducer.emit(SEND_MESSAGE, chatContent);
        }
    };

    return (
        <div className='pack-layout pb-16 '>
            <div className='flex items-start w-full gap-8'>
                <div style={{ flex: `0 0 435px` }} className='flex flex-col gap-8'>
                    {/* <SideBarChat onSelectData={handleDataChat} title={titleOriginal} /> */}
                    <CardInfoExchange />
                    <div className='flex flex-col gap-4'>
                        <span className='font-bold text-lg text-black-800'>Người hướng dẫn</span>
                        <CardMentorInfo mentor={mockDataInfo} />
                    </div>
                    <ButtonPrimary
                        title='Xem câu trả lời'
                        className='w-full'
                        onClick={() => setIsChat(false)}
                    />
                </div>
                <div className='w-full min-w-[500px]'>
                    <div className='bg-white-900 p-8'>
                        <ChatHeader />
                        <ChatList avatar='' dataList={dataChat} onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}
