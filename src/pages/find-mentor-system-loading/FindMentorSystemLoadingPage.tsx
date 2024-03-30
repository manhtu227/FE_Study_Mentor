'use client';
import images from '@assets/images';
import ButtonOutlined from '@components/button/ButtonOutlined';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { SidebarChatItem } from '@components/chat/SideBarChatItem';
import { ChatTitleModel } from '@core/models/chat.model';
import { Image, Progress, ProgressProps } from 'antd';
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

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
export default function FindMentorSystemLoadingPage() {
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
                <div className='w-full bg-white-900 p-8 rounded-md text-center flex flex-col gap-8 items-center'>
                    <Image preview={false} src={images.vector.src} className='w-full' />
                    <div className='text-black-800 font-bold text-lg'>
                        Hệ thống đang tìm kiếm người hướng dẫn phù hợp cho bạn
                    </div>
                    <Progress percent={50} strokeColor={twoColors} className='px-[150px]' />

                    <div className='text-black-800 font-normal text-base'>
                        Vui lòng chờ một lát nhé
                    </div>
                    <div className='flex gap-8 max-w-[547px]'>
                        <ButtonOutlined title='Hủy tìm kiếm' />
                        <ButtonPrimary
                            title='Tự tìm kiếm người hướng dẫn'
                            className='w-full pt-0 rounded-lg'
                            isRightIcon
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
