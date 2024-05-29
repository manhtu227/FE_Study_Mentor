import { StarFilled } from '@ant-design/icons';
import CustomSkeletonTitle from '@components/skeleton/CustomSkeletonTitle';
import { MentorType } from '@core/models/profile.model';
import { Avatar, Button, Image, Modal } from 'antd';
import { useState } from 'react';

export function CardMentorInfo({
    mentor,
    isAvatar = true,
    loading = false,
    onPickMentor,
}: {
    mentor: MentorType;
    isAvatar?: boolean;
    loading?: boolean;
    onPickMentor?: () => void;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleShowModalMentor = () => {
        setIsOpen(true);
    };

    const handlePickMentor = () => {
        setIsOpen(false);
        onPickMentor && onPickMentor();
    };

    const handleCancelMentor = () => {
        setIsOpen(false);
    };

    return (
        <div className='w-full border-solid bg-white-900 border-[1px] rounded-lg border-[#D9D9D9]'>
            <div className='p-4'>
                <div className='flex items-start gap-4'>
                    <div className='w-[100px] h-[100px]'>
                        {loading ? (
                            <CustomSkeletonTitle height='100px' width='100px' />
                        ) : isAvatar ? (
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
                    {loading ? (
                        <CustomSkeletonTitle height='100px' />
                    ) : (
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
                                <Button type='primary' onClick={handleShowModalMentor}>
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                open={isOpen}
                onOk={handlePickMentor}
                onCancel={handleCancelMentor}
                okText='Chọn người này'
                cancelText='Hủy bỏ'
            >
                <div className='w-full'>
                    <div className='flex items-center gap-4'>
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
                        <div className=''>
                            <div className='font-bold text-2xl'>{mentor.name}</div>
                            <div className='text-lg'>{mentor.rating} điểm độ tin cậy</div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
