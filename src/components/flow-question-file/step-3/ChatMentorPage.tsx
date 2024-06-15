'use client';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { ChatList } from '@components/chat/ChatList';
import { SEND_MESSAGE } from '@core/constants/socket.constants';
import { SocketEvent } from '@core/enums/socket.enum';
import { ChatModel } from '@core/models/chat.model';
import { MentorType } from '@core/models/profile.model';
import { UserModel } from '@core/models/user.model';
import { RootState } from '@core/store';
import { imageUtility } from '@core/utilities/image.utility';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FileReq } from '../../../+core/models/file.model';
import { SideBarMentor } from '../SideBarMentor';
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
    tutor?: UserModel;
    senderId: string;
};

export default function ChatMentorPage({ setIsChat, idRoom, senderId, tutor }: Props) {
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
            <SideBarMentor
                button={
                    <ButtonPrimary
                        title='Xem câu trả lời'
                        className='w-full'
                        onClick={() => {
                            setIsChat(false);
                        }}
                    />
                }
            >
                <div className='fixed left-0 right-0 z-0'>
                    <div className='pack-layout '>
                        <div className='bg-white-900 relative  h-[calc(100vh-200px)] ml-[432px]'>
                            <ChatHeader className='absolute top-4 left-4 right-4' tutor={tutor} />
                            <ChatList
                                avatar={imageUtility(tutor?.avatar?.fileKey)}
                                dataList={dataChat}
                                onSubmit={handleSubmit}
                                classNameMessage='absolute left-4 right-4 bottom-4'
                                className='absolute left-4 right-4 top-20 max-h-[calc(100vh-356px)] overflow-auto'
                            />
                        </div>
                    </div>
                </div>
            </SideBarMentor>
        </div>
    );
}
