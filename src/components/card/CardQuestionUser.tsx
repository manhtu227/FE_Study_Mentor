'use client';

import BookmarkIcon from '@assets/icons/bookmark-icon';
import ButtonPrimary from '@components/button/ButtonPrimary';
import CustomSkeletonTitle from '@components/skeleton/CustomSkeletonTitle';
import { QuestionStatus, QuestionType } from '@core/enums/question.enum';
import { GetQuestionResponseModel } from '@core/models/question.model';
import { UserRole } from '@core/models/user.model';
import { imageUtility } from '@core/utilities/image.utility';
import { Avatar, Image } from 'antd';
import { useSession } from 'next-auth/react';

export function CardQuestionUser({
    question,
    loading,
    onClick,
}: {
    question?: GetQuestionResponseModel;
    loading?: boolean;
    onClick?: () => void;
}) {
    const { data } = useSession();
    const isAnswering =
        data?.user?.user?.id === question?.tutor?.id &&
        data?.user?.user?.role === UserRole.TUTOR &&
        question?.status === QuestionStatus.ACCEPTED &&
        question?.type !== QuestionType.MEETING;

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
                {loading ? (
                    <CustomSkeletonTitle height='40px' className='w-4/5' />
                ) : (
                    <div className='flex items-center gap-2 '>
                        <Avatar
                            size={44}
                            icon={
                                <Image
                                    alt={'image of question'}
                                    loading='lazy'
                                    src={imageUtility(question?.student?.avatar?.fileKey)}
                                />
                            }
                        />
                        <div className='flex flex-col'>
                            <span className='text-[18px] leading-[27px] font-bold'>
                                {question?.student?.fullName}
                            </span>
                            <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                {question?.student?.email}
                            </span>
                            <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                {question?.type === QuestionType.FILE
                                    ? 'Thông qua file'
                                    : 'Thông qua Google Meet'}
                            </span>
                        </div>
                    </div>
                )}
                {loading ? (
                    <CustomSkeletonTitle height='80px' className=' mt-5' />
                ) : (
                    <div className='h-20 mt-4 overflow-auto max-w-full truncate text-black-800 font-bold text-lg'>
                        <div className='font-bold text-xl text-black-800 mt-2'>
                            {question?.subject.name}
                        </div>
                        {question?.title}
                    </div>
                )}
            </div>
            {loading ? (
                <CustomSkeletonTitle height='40px' className=' mt-5' />
            ) : (
                <ButtonPrimary
                    title={isAnswering ? 'Tiếp tục trả lời' : 'Xem chi tiết'}
                    onClick={onClick}
                    className={`w-full rounded-none !h-[40px] text-white-900 font-bold border-0 rounded-b-lg ${
                        isAnswering
                            ? '!bg-green-600 hover:!bg-green-600 hover:!opacity-80'
                            : 'bg-[#3D64EE]'
                    }`}
                />
            )}
        </div>
    );
}
