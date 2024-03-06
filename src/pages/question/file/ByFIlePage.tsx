'use client';
import CreateQuestionIcon from '@assets/icons/create-question';
import GraduationIcon from '@assets/icons/graduation';
import QuestionIcon from '@assets/icons/question';
import StarIcon from '@assets/icons/star';
import QuestionByForm from '@components/form/CreateQuestionForm';
import { Button, Steps, message, theme } from 'antd';
import { useState } from 'react';
import FindMentorBySystemPage from '../../find-mentor-by-system/FindMentorBySystemPage';
import RatingAnswerPage from '../../rating-answer/RatingAnswerPage';

function CreateQuestionByFilePage() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleNextStep = () => next();

    const steps = [
        {
            id: 0,
            title: (
                <div
                    className={`h-[60px] w-full ${
                        current >= 0 ? 'bg-primary-500 text-white-900' : 'bg-white-900 text-black'
                    } flex items-center rounded-tl-lg rounded-bl-lg justify-center gap-2 `}
                >
                    <QuestionIcon
                        className='h-6 w-6'
                        color={`${current >= 0 ? 'white' : 'black'}`}
                    />
                    <span className='font-bold text-base'>Đặt câu hỏi</span>
                </div>
            ),
            content: <QuestionByForm onNext={handleNextStep} />,
            icon: <></>,
        },
        {
            id: 1,
            title: (
                <div
                    className={`h-[60px] w-full ${
                        current >= 1 ? 'bg-primary-500 text-white-900' : 'bg-white-900 text-black'
                    } flex items-center justify-center gap-2 `}
                >
                    <GraduationIcon
                        className='h-6 w-6'
                        color={`${current >= 1 ? 'white' : 'black'}`}
                    />
                    <span className='font-bold text-base'>Người hướng dẫn</span>
                </div>
            ),
            content: <FindMentorBySystemPage />,
            icon: <></>,
        },
        {
            title: (
                <div
                    className={`h-[60px] w-full ${
                        current >= 2 ? 'bg-primary-500 text-white-900' : 'bg-white-900 text-black'
                    } flex items-center justify-center gap-2 `}
                >
                    <CreateQuestionIcon
                        className='h-6 w-6'
                        color={`${current >= 2 ? 'white' : 'black'}`}
                    />
                    <span className='font-bold text-base'>Trò chuyện</span>
                </div>
            ),
            content: <div className='text-center'>Third-content</div>,
            icon: <></>,
        },
        {
            title: (
                <div
                    className={`h-[60px] w-full ${
                        current >= 3 ? 'bg-primary-500 text-white-900' : 'bg-white-900 text-black'
                    } flex items-center rounded-tr-lg rounded-br-lg justify-center gap-2 `}
                >
                    <StarIcon className='h-6 w-6' color={`${current >= 3 ? 'white' : 'black'}`} />
                    <span className='font-bold text-base'>Đánh giá</span>
                </div>
            ),
            content: <div className='text-center'><RatingAnswerPage /></div>,
            icon: <></>,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));
    const contentStyle: React.CSSProperties = {
        // lineHeight: '260px',
        color: token.colorTextTertiary,
        backgroundColor: 'transparent',
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className='w-full'>
            <Steps current={current} items={items} className='w-full' />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && current !== 0 && (
                    <Button type='primary' onClick={handleNextStep}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type='primary' onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CreateQuestionByFilePage;
