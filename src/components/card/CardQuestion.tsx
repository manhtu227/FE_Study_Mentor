'use client';

import BookmarkIcon from '@assets/icons/bookmark-icon';
import { Question } from '@core/models/question.model';
import { Avatar, Button, Tag } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export function CardQuestion({ question }: { question: Question }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className='max-w-[435px] border-solid border-[1px] border-[#DEE0E2] rounded-lg relative'>
            <div className='absolute right-1 top-0'>
                <BookmarkIcon number='120' />
            </div>
            <div className='p-4'>
                <div className='flex items-center gap-2 '>
                    <Avatar
                        size={44}
                        icon={
                            <Image alt={'image of question'} loading='lazy' src={question.image} />
                        }
                    />
                    <div className='flex flex-col'>
                        <span className='text-[18px] leading-[27px] font-bold'>Nguyễn Hưng</span>
                        <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                            {question.type === 1 ? 'Student' : 'Mentor'}
                        </span>
                    </div>
                </div>
                <div className='font-bold text-xl text-black-800 mt-2'>{question.title}</div>
                <div className='text-base line-clamp-3 mt-4'>{question.shortDescription}</div>
                <div className='flex mt-[10px] gap-2 flex-wrap'>
                    {question.tags &&
                        question.tags.length > 0 &&
                        question.tags.map((tag) => {
                            return (
                                <Tag
                                    className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'
                                    key={tag}
                                >
                                    {tag}
                                </Tag>
                            );
                        })}
                </div>
            </div>
            <Button
                onClick={() => router.push(`${pathname}/${question.id}`)}
                className='w-full rounded-none h-[57px] bg-[#3D64EE] text-white-900 font-bold border-0 rounded-b-lg'
            >
                Xem câu hỏi
            </Button>
        </div>
    );
}
