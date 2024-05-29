'use client';
import { StarFilled } from '@ant-design/icons';
import images from '@assets/images';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { UserModel } from '@core/models/user.model';
import { Avatar, Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    user?: UserModel;
};

export default function ModalFoundTutor({ isModalOpen, setIsModalOpen, user }: Props) {
    const [dots, setDots] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots === '...') {
                    return '';
                } else {
                    return prevDots + '.';
                }
            });
        }, 500); // Tốc độ xuất hiện của các dấu chấm (500ms = 0.5 giây)
        return () => clearInterval(interval);
    }, []);

    const router = useRouter();

    const handleOk = () => {
        setIsModalOpen(false);
        router.push(`${MY_ROUTE.MENTOR.FILE}?step=2&id=${user?.id}`);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // router.push('/');
    };
    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Tiếp tục'
                cancelText='Quay lại trang chủ'
                className='w-[500px] h-[500px] flex flex-col text-center items-center justify-center'
            >
                <h2 className='text-[20px] leading-[27px] text-[NeutralDark1]'>
                    Đã tìm thấy người hướng dẫn
                </h2>
                <img src={images.teacher.src} alt='' />
                <div>Chờ câu trả lời từ người hướng dẫn {dots}</div>
                <div className='flex items-start gap-6 mt-5'>
                    <div className='h-[60px] ml-10'>
                        <Avatar
                            size={50}
                            icon={
                                <Image
                                    alt={'image of question'}
                                    loading='lazy'
                                    src={images.charac1.src || ''}
                                    width={50}
                                    height={50}
                                />
                            }
                        />
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm font-bold items-start text-black-800'>
                                {user?.fullName}
                            </span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
