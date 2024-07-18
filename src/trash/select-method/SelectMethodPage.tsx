'use client';

import images from '@assets/images';
import MethodItem from '@components/study-method/StudyMethod';
import { DescriptionEnum } from '@core/enums/common.enum';
import { Image } from 'antd';

function SelectMethodPage() {
    return (
        <div className='relative pb-[300px] h-[500px] max-w-full'>
            <Image
                src={images.studyMethodBg.src}
                preview={false}
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
                        image='https://storage.googleapis.com/study-mentor/asset/z5646475417332_98a23a2c8e98ca283069eea47acfb2c9.jpg'
                        title='Trả lời bằng AI'
                        titleButton='Trải nghiệm ngay'
                        type={DescriptionEnum.AI}
                        className='max-w-[542px]'
                        href={``}
                    />
                    <MethodItem
                        image='https://storage.googleapis.com/study-mentor/asset/z5646431390176_a5f1c6011bd0ce5463dcb9f6b003fab8.jpg'
                        title='Giải đáp bởi người hướng dẫn'
                        titleButton='Trải nghiệm ngay'
                        type={DescriptionEnum.Mentor}
                        href={``}
                        className='max-w-[542px]'
                    />
                </div>
            </div>
        </div>
    );
}

export default SelectMethodPage;
