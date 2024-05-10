'use client';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';

export default function ModalAcceptQuestion() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

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
                <h2 className='text-[20px] leading-[27px] text-[NeutralDark1]'>
                    Có câu hỏi mới cần được giải đáp
                </h2>
                <QuestionCircleTwoTone style={{ fontSize: '100px' }} className='p-5' />
                <div>Bạn có muốn nhận trả lời câu hỏi?</div>
            </Modal>
        </div>
    );
}
