'use client';

import BookmarkIcon from '@assets/icons/bookmark-icon';
import ButtonPrimary from '@components/button/ButtonPrimary';
import CustomSkeletonTitle from '@components/skeleton/CustomSkeletonTitle';
import { GetQuestionResponseModel } from '@core/models/question.model';

export function CardQuestionUser({
    question,
    loading,
    onClick,
}: {
    question?: GetQuestionResponseModel;
    loading?: boolean;
    onClick?: () => void;
}) {
    return (
        <div className='max-w-[435px] border-solid border-[1px] border-[#DEE0E2] rounded-lg relative'>
            <div className='absolute right-1 top-0'>
                {loading ? (
                    <CustomSkeletonTitle height='40px' />
                ) : (
                    <BookmarkIcon number={question?.price || '0'} />
                )}
            </div>
            <div className='p-4'>
                {/* <div className='flex items-center gap-2 '>
                    <Avatar
                        size={44}
                        icon={
                            <Image alt={'image of question'} loading='lazy' src={question?.image} />
                        }
                    />
                    <div className='flex flex-col'>
                        <span className='text-[18px] leading-[27px] font-bold'>Nguyễn Hưng</span>
                        <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                            {question?.type === 1 ? 'Student' : 'Mentor'}
                        </span>
                    </div>
                </div> */}
                {loading ? (
                    <CustomSkeletonTitle height='40px' className='w-4/5' />
                ) : (
                    <div className='font-bold text-xl text-black-800 mt-2'>
                        {question?.subject.name}
                    </div>
                )}

                {loading ? (
                    <CustomSkeletonTitle height='80px' className=' mt-5' />
                ) : (
                    <div className='h-32 mt-4 overflow-auto max-w-full truncate text-black-800 font-bold text-lg'>
                        {question?.title}
                    </div>
                )}
            </div>
            {loading ? (
                <CustomSkeletonTitle height='40px' className=' mt-5' />
            ) : (
                <ButtonPrimary
                    title={'Xem chi tiết'}
                    onClick={onClick}
                    className='w-full rounded-none !h-[40px] bg-[#3D64EE] text-white-900 font-bold border-0 rounded-b-lg'
                />
            )}
        </div>
    );
}
