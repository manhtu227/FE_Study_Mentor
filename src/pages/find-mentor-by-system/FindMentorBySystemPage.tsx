'use client';
import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { Image } from 'antd';
import { useState } from 'react';
import FindMentorSystemLoadingPage from '../find-mentor-system-loading/FindMentorSystemLoadingPage';
import MentorListPage from '../mentor-list/MentorListPage';

export default function FindMentorBySystemPage() {
    const [isSearchYourself, setIsSearchYourself] = useState<boolean>(false);
    const [isSearchBySystem, setIsSearchBySystem] = useState<boolean>(false);

    return (
        <>
            {isSearchBySystem && !isSearchYourself && <FindMentorSystemLoadingPage />}
            {isSearchYourself && !isSearchBySystem && <MentorListPage />}
            {!isSearchYourself && !isSearchBySystem && (
                <div className='flex items-start w-full gap-8'>
                    <div className='w-full bg-white-900 p-8 rounded-md text-center flex flex-col gap-8'>
                        <div>
                            <h3 className='text-black-800 font-bold text-lg m-0'>
                                This is title for questions
                            </h3>
                            <p className='text-[16px] leading-6 text-[#838B8F] m-0'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>

                        <div className='flex gap-x-8 items-center justify-center'>
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
                                    onClick={() => setIsSearchBySystem(true)}
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
                                    onClick={() => setIsSearchYourself(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
