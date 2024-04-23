'use client';

import images from '@assets/images';
import MethodItem from '@components/study-method/StudyMethod';
import { AI, MENTOR } from '@core/constants/routes.constant';
import { DescriptionEnum } from '@core/enums/common.enum';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function StudyMethodPage() {
    const pathname = usePathname();

    return (
        <div className='relative pb-[300px] h-[500px] max-w-full'>
            <Image
                src={images.studyMethodBg}
                alt='Hero'
                className='relative opacity-50 max-w-full'
            />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                <div className='mb-[52px]'>
                    <div className='font-semibold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[#313636] text-center mx-auto'>
                        Đặt câu hỏi
                    </div>
                </div>
                <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                    <MethodItem
                        image={images.aiMethod}
                        title='Trả lời bằng AI'
                        titleButton='Trải nghiệm ngay'
                        type={DescriptionEnum.AI}
                        className='max-w-[542px]'
                        href={`${pathname}${AI}`}
                    />
                    <MethodItem
                        image={images.mentorMethod}
                        title='Giải đáp bởi người hướng dẫn'
                        titleButton='Trải nghiệm ngay'
                        type={DescriptionEnum.Mentor}
                        href={`${pathname}${MENTOR}`}
                        className='max-w-[542px]'
                    />
                </div>
            </div>
        </div>
    );
}

export default StudyMethodPage;
