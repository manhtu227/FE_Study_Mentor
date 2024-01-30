'use client';

import images from '@assets/images';
import MethodItem from '@components/study-method/StudyMethod';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

function StudyMethodPage() {
    const router = useRouter();
    const pathname = usePathname();

    const handleClickMentorMethod = () => {
        router.push(`${pathname}/mentor`);
    };

    return (
        <div className='relative pb-[300px] h-[500px]'>
            <Image src={images.studyMethodBg} alt='Hero' className='relative opacity-50' />
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
                        type={1}
                        className='max-w-[542px]'
                    />
                    <MethodItem
                        image={images.mentorMethod}
                        title='Tìm kiếm người hướng dẫn'
                        titleButton='Tìm người hướng dẫn'
                        type={1}
                        onClick={handleClickMentorMethod}
                        className='max-w-[542px]'
                    />
                </div>
            </div>
        </div>
    );
}

export default StudyMethodPage;
