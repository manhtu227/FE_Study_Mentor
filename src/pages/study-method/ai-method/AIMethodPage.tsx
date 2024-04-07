'use client';
import images from '@assets/images';
import AIItem from '@components/ai/ai-item/AIItem';
import MethodItem from '@components/study-method/StudyMethod';
import { FREE, PAID } from '@core/constants/routes.constant';
import { Modal } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

function AIMethodPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleClickFreeAI = () => {
        setOpenModal(true);
    };

    const handleClickPaidAI = () => {
        router.push(`${pathname}${PAID}`);
    };

    const FreeAIList = [
        {
            id: 1,
            title: 'Chat GPT',
            description:
                'Sử dụng mạng Neural Transformer để học và trả lời câu hỏi, ChatGPT có thể đáp ứng yêu cầu trả lời nhanh và chính xác của bạn',
            image: images.chatPGT,
        },
        {
            id: 2,
            title: 'Gemini',
            image: images.gemini,
            description:
                'Sử dụng deep learning trên lượng lớn dữ liệu về nhiều lĩnh vực khác nhau, đảm bảo có thể đưa ra câu trả lời về bất kỳ lĩnh vực nào mà bạn muốn',
        },
        {
            id: 3,
            title: 'Copilot',
            image: images.copilot,
            description:
                'Có khả năng dẫn dắt các cuộc hội thoại một cách tự nhiên và giống người thật, mang lại cảm giác dễ chịu và thoải mái khi trò chuyện cùng',
        },
    ];

    const handleClickAIItem = (id: number) => {
        router.push(`${pathname}${FREE}?type=${id}`);
    };

    return (
        <div className='relative pb-[300px] h-[500px] max-w-full'>
            <Image
                src={images.studyMethodBg}
                alt='Hero'
                className='relative opacity-50 max-w-full'
            />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                <div className='mb-[52px]'>
                    <div className='font-semibold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[#313636] text-center mx-auto'>
                        Đặt câu hỏi
                    </div>
                </div>
                <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                    <MethodItem
                        image={images.freeAI}
                        title='Trả lời với AI miễn phí'
                        titleButton='Bắt đầu ngay'
                        type={1}
                        className='max-w-[542px]'
                        onClick={handleClickFreeAI}
                    />
                    <MethodItem
                        image={images.paidAI}
                        title='Trả lời với AI có phí'
                        titleButton='Bắt đầu ngay'
                        type={1}
                        className='max-w-[542px]'
                        onClick={handleClickPaidAI}
                    />
                </div>
            </div>
            <div>
                <Modal
                    title='Chọn nền tảng AI mà bạn muốn trò chuyện'
                    centered
                    open={openModal}
                    footer={null}
                >
                    {FreeAIList &&
                        FreeAIList.length > 0 &&
                        FreeAIList.map((ai) => {
                            return (
                                <AIItem
                                    image={ai.image}
                                    title={ai.title}
                                    key={ai.id}
                                    description={ai.description}
                                    onClick={() => handleClickAIItem(ai.id)}
                                />
                            );
                        })}
                </Modal>
            </div>
        </div>
    );
}

export default AIMethodPage;
