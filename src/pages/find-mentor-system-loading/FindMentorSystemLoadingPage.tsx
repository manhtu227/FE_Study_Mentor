'use client';
import images from '@assets/images';
import ButtonOutlined from '@components/button/ButtonOutlined';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { Image, Progress, ProgressProps } from 'antd';
import { useState } from 'react';

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
export default function FindMentorSystemLoadingPage() {
    const [activeChat, setActiveChat] = useState<string | number | null>(1);

    return (
        <div>
            <div className='flex items-start w-full gap-8'>
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
