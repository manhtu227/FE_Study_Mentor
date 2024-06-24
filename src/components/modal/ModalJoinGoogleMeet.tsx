'use client';
import { Modal } from 'antd';
import { useState } from 'react';

export default function ModalJoinGoogleMeet({
    questionName,
    googleMeetUrl,
    subjectName,
    price,
    title,
}: {
    questionName: string;
    googleMeetUrl: string;
    subjectName: string;
    price: number;
    title?: string;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Chấp nhận'
                cancelText='Từ chối'
                className='w-[500px] h-[500px] flex flex-col text-center items-center justify-center'
            >
                <div className='flex flex-col gap-2 items-start'>
                    <div className='text-xl'>
                        Câu hỏi chủ đề : <strong>{subjectName}</strong>
                    </div>
                    <div className='text-xl'>
                        Tiêu đề : <strong>{title}</strong>
                    </div>
                    <div className='text-xl'>
                        Giá: <strong>{price}</strong>
                    </div>
                </div>
                <h3 className='leading-[27px] text-[NeutralDark1]'>
                    Tham gia cuộc họp theo link này để trả lời câu hỏi:
                </h3>
                <a className='font-bold mb-4 block' href={googleMeetUrl}>
                    {googleMeetUrl}
                </a>
            </Modal>
        </div>
    );
}
