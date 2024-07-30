'use client';
import images from '@assets/images';
import AIItem from '@components/ai/ai-item/AIItem';
import MethodItem from '@components/study-method/StudyMethod';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { CategoryAiEnum } from '@core/enums/ai.enum';
import { DescriptionEnum } from '@core/enums/common.enum';
import { Image, Modal } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const FreeAIList = [
    {
        id: CategoryAiEnum.CHAT_GPT,
        title: 'Chat GPT',
        description:
            'Sử dụng mạng Neural Transformer để học và trả lời câu hỏi, ChatGPT có thể đáp ứng yêu cầu trả lời nhanh và chính xác của bạn',
        image: 'https://storage.googleapis.com/study-mentor/asset/z5646514166228_6113b132e542d6f7bd9514523f2cd6f6.jpg',
    },
    {
        id: CategoryAiEnum.GEMINI,
        title: 'Gemini',
        image: 'https://storage.googleapis.com/study-mentor/asset/z5646514489579_b9717bb5f2ced23a9311e16f7912322a.jpg',
        description:
            'Sử dụng deep learning trên lượng lớn dữ liệu về nhiều lĩnh vực khác nhau, đảm bảo có thể đưa ra câu trả lời về bất kỳ lĩnh vực nào mà bạn muốn',
    },
];

function AISelectMethodPage() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleClickFreeAI = () => {
        setOpenModal(true);
    };

    const handleClickAIItem = (id: string) => {
        router.replace(`${MY_ROUTE.AI.FREE}?type=${id}`);
    };

    const { data: authData, status: authStatus } = useSession();

    // useEffect(() => {
    //     if (authStatus === AUTHENTICATED) return;

    //     router.push(MY_ROUTE.LOGIN);
    // }, [authData, authStatus]);

    return (
        <div className='relative pb-[300px] h-[500px] max-w-full'>
            <Image
                src={images.studyMethodBg.src}
                preview={false}
                alt='Hero'
                className='relative opacity-50 max-w-full'
            />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                <div className='mb-[52px]'>
                    <div className='font-semibold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[#313636] text-center mx-auto'>
                        Đặt câu hỏi
                    </div>
                </div>
                <div className='flex items-start gap-[32px] w-full justify-center mb-[58px]'>
                    <MethodItem
                        image='https://storage.googleapis.com/study-mentor/asset/z5646438186922_018959820722eee971a184bc1a99b2a7.jpg'
                        title='Trả lời với AI miễn phí'
                        titleButton='Bắt đầu ngay'
                        type={DescriptionEnum.FreeAI}
                        className='max-w-[542px]'
                        onClick={handleClickFreeAI}
                        href={MY_ROUTE.AI.FREE}
                    />
                    <MethodItem
                        image='https://storage.googleapis.com/study-mentor/asset/z5646437854764_dd29088b665a8cd79f07810571554ede.jpg'
                        title='Trả lời với AI có phí'
                        titleButton='Bắt đầu ngay'
                        type={DescriptionEnum.PaidAI}
                        className='max-w-[542px]'
                        href={
                            authData?.user.user.isMembership
                                ? MY_ROUTE.AI.PAID
                                : MY_ROUTE.AI.UPGRADE
                        }
                    />
                </div>
            </div>
            <div>
                <Modal
                    title='Chọn nền tảng AI mà bạn muốn trò chuyện'
                    centered
                    open={openModal}
                    footer={null}
                    closable={true}
                    onCancel={() => setOpenModal(false)}
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

export default AISelectMethodPage;
