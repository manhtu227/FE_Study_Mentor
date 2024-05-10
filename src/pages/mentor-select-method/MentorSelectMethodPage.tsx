'use client';
import images from '@assets/images';
import MethodItem from '@components/study-method/StudyMethod';
import { AUTHENTICATED } from '@core/constants/authentication.constants';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { DescriptionEnum } from '@core/enums/common.enum';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function MentorSelectMethodPage() {
    const router = useRouter();
    const { data: authData, status: authStatus } = useSession();

    useEffect(() => {
        if (authStatus === AUTHENTICATED) return;

        router.push(MY_ROUTE.LOGIN);
    }, [authData, authStatus]);

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
                        image={images.ggMeetMethod}
                        title='Trả lời thông qua Zoom/ Google meet'
                        titleButton='Trải nghiệm ngay'
                        type={DescriptionEnum.GoogleMeet}
                        className='max-w-[542px]'
                        href={MY_ROUTE.MENTOR.GOOGLE_MEET}
                    />
                    <MethodItem
                        image={images.fileMethod}
                        title='Trả lời thông qua File hướng dẫn (PDF, DOC, ...)'
                        titleButton='Tìm người hướng dẫn'
                        type={DescriptionEnum.File}
                        className='max-w-[542px]'
                        href={MY_ROUTE.MENTOR.FILE}
                    />
                </div>
            </div>
        </div>
    );
}

export default MentorSelectMethodPage;
