'use client';
import { DATE_FORMAT } from '@core/constants/date.constant';
import { Modal } from 'antd';
import { format } from 'date-fns';

export default function ModalJoinGoogleMeet({
    questionName,
    googleMeetUrl,
    startTime,
    subjectName,
    price,
    title,
    isModalOpen,
    setIsModalOpen,
}: {
    questionName: string;
    googleMeetUrl: string;
    startTime: string;
    subjectName: string;
    price: number;
    isModalOpen: boolean;
    title?: string;
    setIsModalOpen: (value: boolean) => void;
}) {
    const handleOk = () => {
        setIsModalOpen(false);
        window.location.reload();
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
                        Giá: <strong>{price}</strong> VND
                    </div>
                </div>
                <h3 className='leading-[27px] text-[NeutralDark1]'>
                    Tham gia cuộc họp vào{' '}
                    {format(startTime || new Date(), DATE_FORMAT.DATE_TIME.HYPHEN_24H)} theo link
                    này để trả lời câu hỏi:
                </h3>
                <a className='font-bold mb-4 block' href={googleMeetUrl}>
                    {googleMeetUrl}
                </a>
            </Modal>
        </div>
    );
}
