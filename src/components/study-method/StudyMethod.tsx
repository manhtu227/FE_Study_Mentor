import Image, { StaticImageData } from 'next/image';
import React from 'react';
import RightOutlined from '@ant-design/icons/RightOutlined';

function MethodItem({
    image,
    titleButton,
    type,
    title,
}: {
    image: StaticImageData;
    titleButton: string;
    title: string;
    type: number;
}) {
    const listDescriptions = [
        {
            type: 1,
            title: 'AI',
            description: [
                '1. Mini App Trên Zalo là gì? Cách Mini App trên Zalo Hỗ Trợ Kinh Doanh Cực Hiệu Quả',
                '2. Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
                '3. AI Marketing là gì? 11 Cách ứng dụng trí tuệ nhân tạo trong Marketing',
            ],
        },
        {
            type: 2,
            title: 'Mentor',
            description: [
                '1. Mini App Trên Zalo là gì? Cách Mini App trên Zalo Hỗ Trợ Kinh Doanh Cực Hiệu Quả',
                '2. Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
                '3. AI Marketing là gì? 11 Cách ứng dụng trí tuệ nhân tạo trong Marketing',
            ],
        },
        {
            type: 3,
            title: 'Google-meet',
            description: [
                '1. Mini App Trên Zalo là gì? Cách Mini App trên Zalo Hỗ Trợ Kinh Doanh Cực Hiệu Quả',
                '2. Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
                '3. AI Marketing là gì? 11 Cách ứng dụng trí tuệ nhân tạo trong Marketing',
            ],
        },
        {
            type: 4,
            title: 'File',
            description: [
                '1. Mini App Trên Zalo là gì? Cách Mini App trên Zalo Hỗ Trợ Kinh Doanh Cực Hiệu Quả',
                '2. Data Storytelling là gì? 5+ Cách để trực quan nội dung câu chuyện thú vị hơn',
                '3. AI Marketing là gì? 11 Cách ứng dụng trí tuệ nhân tạo trong Marketing',
            ],
        },
    ];

    const description =
        listDescriptions && listDescriptions.find((item) => item.type === type)?.description;
    return (
        <div className='items-center shadow-sm bg-white flex max-w-[658px] flex-col pb-8 rounded-lg'>
            <Image
                loading='lazy'
                src={image}
                alt={title}
                className='aspect-[2.73] object-contain object-center w-full self-stretch overflow-hidden max-md:max-w-full rounded-t-lg'
            />

            <div className='text-neutral-700 text-lg font-bold leading-7 tracking-normal max-md:max-w-full'>
                {title}
            </div>

            <div className='items-stretch flex justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap'>
                <div className='items-stretch flex-grow flex-col max-md:max-w-full overflow-y-scroll'>
                    {description &&
                        description.map((item, index) => {
                            return (
                                <div
                                    className='text-neutral-700 text-base leading-6 tracking-normal max-md:max-w-full'
                                    key={index}
                                >
                                    {item}
                                </div>
                            );
                        })}
                </div>
            </div>

            <button className='justify-center items-stretch bg-blue-600 flex gap-4 mt-6 px-14 py-4 rounded-lg max-md:px-5 cursor-pointer outline-none border-none hover:opacity-85'>
                <div className='text-slate-100 text-base font-bold leading-6 tracking-normal'>
                    {titleButton}
                </div>
                <RightOutlined />
            </button>
        </div>
    );
}
export default MethodItem;
