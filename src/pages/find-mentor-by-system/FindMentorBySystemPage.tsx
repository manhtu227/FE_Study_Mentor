'use client';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { SidebarChatItem } from '@components/chat/SideBarChatItem';
import { ChatTitleModel } from '@core/models/chat.model';
import { Image } from 'antd';
import { useState } from 'react';

const listDefault: ChatTitleModel[] = [
    {
        id: 1,
        name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
    },
    {
        id: 2,
        name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
    },
    {
        id: 3,
        name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
    },
    {
        id: 4,
        name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
    },
    {
        id: 5,
        name: 'Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
    },
];

export default function FindMentorBySystemPage() {
    const [activeChat, setActiveChat] = useState<string | number | null>(1);
    return (
        <div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[435px]'>
                    <div className='w-full bg-white-900 rounded-lg'>
                        <div className='p-6 flex flex-col gap-8'>
                            <div className='text-black-800 text-lg font-bold flex items-center'>
                                Câu hỏi hiện có
                            </div>
                            <div className='max-h-[368px] overflow-auto'>
                                <div className='flex flex-col gap-4'>
                                    {listDefault.map((item) => (
                                        <SidebarChatItem
                                            key={item.id}
                                            active={activeChat === item.id}
                                            title={item.name}
                                            onClick={() => {
                                                setActiveChat(item.id);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-white-900 p-8 rounded-md text-center flex flex-col gap-8'>
                    <div>
                        <h3 className='text-black-800 font-bold text-lg m-0'>
                            This is title for questions
                        </h3>
                        <p className='text-[16px] leading-6 text-[#838B8F] m-0'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>

                    <div className='flex gap-x-8 justify-between'>
                        <div className='flex flex-col items-center max-w-[402px] bg-white-900 shadow-lg rounded-lg overflow-hidden'>
                            <Image
                                height={200}
                                preview={false}
                                src={images.system.src}
                                className='w-full'
                            />
                            <div className='p-8'>
                                <p className='text-lg m-0 w-full text-black-800 font-bold'>
                                    Nhờ hệ thống tìm kiếm người hướng dẫn phù hợp
                                </p>
                            </div>
                            <ButtonPrimary
                                title='Hệ thống tìm kiếm'
                                className='w-full pt-0 rounded-none'
                                isRightIcon
                            />
                        </div>
                        <div className='flex flex-col items-center max-w-[402px] bg-white-900 shadow-lg rounded-lg overflow-hidden'>
                            <Image
                                preview={false}
                                src={images.self.src}
                                className='w-full'
                                height={200}
                            />
                            <div className='px-4 py-8'>
                                <p className='text-lg m-0 w-full text-black-800 font-bold'>
                                    Tự tìm kiếm người hướng dẫn theo tiêu chí của bản thân
                                </p>
                            </div>
                            <ButtonPrimary
                                title='Tự tìm kiếm'
                                className='w-full pt-0 rounded-none'
                                isRightIcon
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
