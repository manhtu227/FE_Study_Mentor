'use client';
import CreateQuestionIcon from '@assets/icons/create-question';
import GraduationIcon from '@assets/icons/graduation';
import QuestionIcon from '@assets/icons/question';
import StarIcon from '@assets/icons/star';
import CreateQuestionForm from '@components/flow-question-file/step-1/CreateQuestionForm';
import ModalConfirm from '@components/modal/ModalConfirm';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { QuestionStatus } from '@core/enums/question.enum';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { RootState } from '@core/store';
import { useQuery } from '@tanstack/react-query';
import { Spin, Steps } from 'antd';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import FindMentorBySystemPage from '../../components/flow-question-file/step-2/FindMentorBySystemPage';
import CheckQAPage from '../../components/flow-question-file/step-3/CheckQAPage';
import RatingAnswerPage from '../../components/flow-question-file/step-4/RatingAnswerPage';

function QuestionByFilePage({ isGoogleMeet }: { isGoogleMeet?: boolean }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [isOpenVoucher, setIsOpenVoucher] = useState(false);
    const currentQuestionId = useSelector((state: RootState) => {
        return state.questions.currentQuestionId;
    });

    const question = useQuery({
        queryKey: detailedQuestionKeys.list({ currentQuestionId, step: searchParams.get('step') }),
        queryFn: () => getDetailedQuestionApi(currentQuestionId),
        select: (data) => data?.data.data,
    });

    const current = useMemo(() => {
        let step = 0;

        if (!question.data) step = 0;
        if (!searchParams) step = 0;

        const x = searchParams.get('step') || 0;
        if (!isNaN(+x)) step = +x;

        if ((step === 2 || step === 3) && !question?.data?.tutor) {
            step = 1;
        }

        if (step === 3 && !question.data?.answers) {
            step = 2;
        }

        return step;
    }, [searchParams, question.data]);

    useEffect(() => {
        if (question.data?.status === QuestionStatus.EXPIRED && current !== 0) {
            setIsOpenVoucher(true);
        }
    }, [question.data, current]);

    const next = () => {
        const params = new URLSearchParams(searchParams || '');
        params.set('step', `${current + 1}`);
        router.push(`${pathname}?${params.toString()}`);
    };

    const prev = () => {
        const params = new URLSearchParams(searchParams || '');
        params.set('step', `${current - 1}`);
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleNextStep = () => next();

    const steps = [
        {
            id: 0,
            title: (
                <TabQuestion
                    current={current}
                    icon={
                        <QuestionIcon
                            className='h-6 w-6'
                            color={`${current >= 0 ? 'white' : 'black'}`}
                        />
                    }
                    title='Đặt câu hỏi'
                    index={0}
                />
            ),
            content: <CreateQuestionForm isGoogleMeet={isGoogleMeet} />,
            icon: <></>,
        },
        {
            id: 1,
            title: (
                <TabQuestion
                    current={current}
                    icon={
                        <GraduationIcon
                            className='h-6 w-6'
                            color={`${current >= 1 ? 'white' : 'black'}`}
                        />
                    }
                    title='Tìm người hướng dẫn'
                    index={1}
                />
            ),
            content: <FindMentorBySystemPage />,
            icon: <></>,
        },
        {
            title: (
                <TabQuestion
                    current={current}
                    icon={
                        <CreateQuestionIcon
                            className='h-6 w-6'
                            color={`${current >= 2 ? 'white' : 'black'}`}
                        />
                    }
                    title='Giải đáp'
                    index={2}
                />
            ),
            content: <CheckQAPage onNext={handleNextStep} />,
            icon: <></>,
        },
        {
            title: (
                <TabQuestion
                    current={current}
                    icon={
                        <StarIcon
                            className='h-6 w-6'
                            color={`${current >= 3 ? 'white' : 'black'}`}
                        />
                    }
                    title='Đánh giá'
                    index={3}
                    isRight
                />
            ),
            content: (
                <div className='text-center'>
                    <RatingAnswerPage />
                </div>
            ),
            icon: <></>,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));

    return question.isFetching ? (
        <Spin
            size='large'
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        />
    ) : (
        <div className='w-full '>
            <div className='bg-white-800 fixed top-16 h-4 z-20 left-0 right-0'></div>
            <div className='fixed top-20 left-0 right-0 z-20'>
                <Steps
                    current={current}
                    items={items}
                    className='max-w-[1369px] mx-auto self-center shadow-sm'
                />
            </div>
            <div className='bg-white-800 fixed top-32 h-4 z-20 left-0 right-0 shadow-sm'></div>
            <div className='pb-6'>
                <div className='pt-20 max-w-[1369px] mx-auto '>{steps[current].content}</div>
            </div>

            {/* <div className=' flex w-fit mb-6'>
                {current < steps.length - 1 && (
                    <Button type='primary' onClick={handleNextStep}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type='primary' onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current >= 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div> */}
            <ModalConfirm
                isOpen={isOpenVoucher}
                setIsOpen={setIsOpenVoucher}
                message='Xin lỗi bạn câu hỏi đã hết hạn, vui lòng hỏi câu hỏi khác'
                titleYes='Đặt lại câu hỏi'
                titleCancel='Quay lại trang chủ'
                onConfirm={() => {
                    setIsOpenVoucher(false);
                    router.push(`${MY_ROUTE.MENTOR.FILE}?step=0`);
                }}
                onCancel={() => {
                    setIsOpenVoucher(false);
                    router.push(`${MY_ROUTE.HOME}`);
                }}
            />
            <div className='fixed bottom-0 right-0 left-0 top-0 bg-white-800 -z-10'></div>
        </div>
    );
}

export default QuestionByFilePage;

type Props = {
    current: number;
    icon: React.ReactNode;
    title: string;
    index: number;
    isRight?: boolean;
};

export function TabQuestion({ current, icon, title, index, isRight }: Props) {
    return (
        <div
            className={clsx(
                `h-12 w-full ${
                    current >= index ? 'bg-primary-500 text-white-900' : 'bg-white-900 text-black'
                } flex items-center justify-center gap-2 `,
                index === 0 && 'rounded-tl-lg rounded-bl-lg',
                isRight && 'rounded-tr-lg rounded-br-lg',
            )}
        >
            {icon}
            <span className='font-bold text-base'>{title}</span>
        </div>
    );
}
