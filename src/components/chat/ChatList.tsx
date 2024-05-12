import { ChatModel } from '@core/models/chat.model';
import { FileReq } from '@core/models/file.model';
import { Avatar, Image } from 'antd';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import MessageForm from './MessageForm';

type Props = {
    dataList: ChatModel[];
    avatar: string;
    onSubmit: (value: string, files?: FileReq[] | null) => void;
};
export function ChatList({ dataList, avatar, onSubmit }: Props) {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { data } = useSession();
    function scrollToBottom() {
        if (!chatContainerRef.current) {
            return;
        }
        chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        if (dataList) {
            setTimeout(scrollToBottom);
        }
    }, [dataList]);

    return (
        <div>
            <div className='mt-4 h-[576px] p-6 overflow-auto' ref={chatContainerRef}>
                {dataList.map((item, index) => {
                    const checkedMine = item.senderId === data?.user.user.id;
                    let checked = !checkedMine;
                    if (index !== 0 && item.recipientId && dataList[index - 1]?.recipientId) {
                        checked = dataList[index - 1]?.recipientId !== item.recipientId;
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
                                value={item.content}
                                createdAt={item.createdAt}
                                checkedMine={checkedMine}
                                avatar={checked ? (!checkedMine ? avatar : undefined) : undefined}
                                files={item.files}
                            />
                        </div>
                    );
                })}
            </div>
            <MessageForm onSubmit={onSubmit} />
        </div>
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
