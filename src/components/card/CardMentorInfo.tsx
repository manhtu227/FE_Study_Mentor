import { StarFilled } from '@ant-design/icons';
import { MentorType } from '@core/models/profile.model';
import { Avatar, Image, Tag } from 'antd';

export function CardMentorInfo({
    mentor,
    isAvatar = true,
}: {
    mentor?: MentorType;
    isAvatar?: boolean;
}) {
    return (
        <div className='w-full border-solid bg-white-900 border-[1px] rounded-lg border-[#D9D9D9]'>
            <div className='p-4'>
                <div className='flex items-start gap-4'>
                    <div className='w-[100px] h-[100px]'>
                        {isAvatar ? (
                            <Avatar
                                size={100}
                                icon={
                                    <Image
                                        alt={'image of question'}
                                        loading='lazy'
                                        src={mentor?.image || ''}
                                    />
                                }
                            />
                        ) : (
                            <img
                                className='object-cover w-[100px] h-[100px] rounded-lg '
                                src={mentor?.image || ''}
                                alt='mento'
                            />
                        )}
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex items-center justify-between'>
                            <span className='text-lg font-bold items-start text-black-800'>
                                {mentor?.name}
                            </span>
                            <span className='text-sm font-bold text-[#838B8F] '>
                                | Tuổi {mentor?.age}
                            </span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                        </div>
                        <div className='flex mt-[10px] gap-2 flex-wrap'>
                            {mentor?.tags?.map((tag) => {
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
                </div>
            </div>
        </div>
    );
}
