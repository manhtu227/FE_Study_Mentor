'use client';
import images from '@assets/images';
import ButtonOutlined from '@components/button/ButtonOutlined';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { Button, Image, ProgressProps, Spin } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FindMentorEnum } from './FindMentorBySystemPage';

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
export default function SystemLoadingPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searching, setSearching] = useState<boolean>(true);

    const handleFoundMentor = () => {
        setSearching(false);
    };

    return (
        <div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-full bg-white-900 p-8 rounded-md text-center flex flex-col gap-8 items-center'>
                    <Image preview={false} src={images.vector.src} className='w-full' />
                    <div className='text-black-800 font-bold text-lg'>
                        Hệ thống đang tìm kiếm người hướng dẫn phù hợp cho bạn
                    </div>
                    <Spin size='large' spinning={searching} />

                    <div className='text-black-800 font-normal text-base'>
                        Vui lòng chờ một lát nhé
                    </div>
                    <div className='flex gap-8 max-w-[547px]'>
                        <ButtonOutlined
                            title='Hủy tìm kiếm'
                            onClick={() => {
                                const newParams = new URLSearchParams(searchParams || '');
                                newParams.set('mode', FindMentorEnum.LIST);
                                router.push(`${pathname}?${newParams.toString()}`);
                            }}
                        />
                        <ButtonPrimary
                            title='Tự tìm kiếm người hướng dẫn'
                            className='w-full pt-0 rounded-lg'
                            onClick={() => {
                                const newParams = new URLSearchParams(searchParams || '');
                                newParams.set('mode', FindMentorEnum.SELF);
                                newParams.set('searchMySelfTab', '1');
                                newParams.set('isTutorOnline', 'true');
                                router.push(`${pathname}?${newParams.toString()}`);
                            }}
                            isRightIcon
                        />
                        {/* <Button type='primary' onClick={handleFoundMentor}>
                            Đã tìm được
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
