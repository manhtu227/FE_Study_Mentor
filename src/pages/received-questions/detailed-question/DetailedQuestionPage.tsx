'use client';

import { DownOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import images from '@assets/images';
import { CardQuestion } from '@components/card/CardQuestion';
import AnswerQuestionForm from '@components/form/AnswerQuestionForm';
import { DATE_FORMAT } from '@core/constants/date.constant';
import { SocketEvent } from '@core/enums/socket.enum';
import { AcceptQuestionModel, GetQuestionResponseModel } from '@core/models/question.model';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { RootState } from '@core/store';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Button, Col, Image, Modal, Pagination, Row, Tag } from 'antd';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function DetailedQuestionPage() {
    const questions = [
        {
            id: 1,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 2,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 3,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 4,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 5,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
        {
            id: 6,
            image: images.charac1,
            type: 1,
            title: 'Procedural Python - Lập trình hàm trong Python',
            shortDescription:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['tag1', 'tag2', 'tag3'],
        },
    ];

    const { data } = useSession();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<GetQuestionResponseModel | undefined>();
    const router = useRouter();
    const params = useParams();
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const { confirm } = Modal;
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

    const showConfirmAnswerQuestion = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn trả lời câu hỏi này không?',
            icon: <ExclamationCircleFilled />,
            content: 'Nếu đồng ý, bạn sẽ không thể hủy bỏ hành động này',
            onOk() {
                handleAnswerTheQuestion();
            },
            onCancel() {},
        });
    };

    const detailedQuestionQuery = useQuery({
        queryKey: detailedQuestionKeys.all,
        queryFn: () => getDetailedQuestionApi(params?.slug as string),
    });

    useEffect(() => {
        if (!(params?.slug as string)) return;

        setCurrentQuestion(detailedQuestionQuery?.data?.data?.data);
    }, [detailedQuestionQuery?.data, params?.slug as string]);

    useEffect(() => {
        if (detailedQuestionQuery?.error) router.push('/404');
    }, [detailedQuestionQuery?.error]);

    const handleAnswerTheQuestion = () => {
        if (!data?.user.user.id) return;

        const requestAccept: AcceptQuestionModel = {
            questionId: currentQuestion?.id as string,
            studentId: currentQuestion?.student.id as string,
            senderId: data?.user.user.id as string,
        };

        socketReducer?.emit(SocketEvent.ACCEPT, requestAccept);
        setShowForm(true);
        setIsAnswered(true);
    };

    return (
        <div className='px-[180px] pb-[64px] bg-[#F3F9FA]'>
            <div className='w-full flex gap-8'>
                {currentQuestion && (
                    <div className='w-2/3 '>
                        <div className='w-full transition-all'>
                            <div className='text-[14px] leading-[21px] font-normal text-black-800 mb-3'>
                                Đặt câu hỏi lúc{' '}
                                {format(currentQuestion.createdAt, DATE_FORMAT.DATE_TIME.HYPHEN)}
                            </div>
                            <div className='font-bold text-4xl text-black-800'>
                                Nội dung câu hỏi
                            </div>
                            <div className='my-4 text-2xl'>
                                <div>{currentQuestion.content}</div>
                                <ul className='flex gap-2 flex-wrap pl-0'>
                                    {currentQuestion.fileQuestions?.map((file) => {
                                        return (
                                            <div
                                                key={file.fileKey}
                                                className='flex gap-2 items-center'
                                            >
                                                <Image
                                                    className='max-w-[200px] max-h-[100px] rounded-lg'
                                                    width={200}
                                                    height={100}
                                                    src={`${DEFAULT_PREFIX_IMAGE_URL}${file.fileKey}`}
                                                    alt='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                                                />
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className='flex items-center gap-2 '>
                                <Avatar
                                    size={44}
                                    icon={
                                        <Image
                                            alt={'image of question'}
                                            loading='lazy'
                                            src={images.charac1.src} // Convert images.charac1 to a string by using the .src property
                                        />
                                    }
                                />
                                <div className='flex flex-col'>
                                    <span className='text-[18px] leading-[27px] font-bold'>
                                        {currentQuestion.student.fullName}
                                    </span>
                                    <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                                        Student
                                    </span>
                                </div>
                            </div>
                            {!showForm && (
                                <Button
                                    type='primary'
                                    size='large'
                                    className='!h-12 !w-[248px] font-bold text-base bg-primary-800 mt-4'
                                    onClick={showConfirmAnswerQuestion}
                                    disabled={currentQuestion.isAnswered || isAnswered}
                                >
                                    Trả lời câu hỏi này
                                    <DownOutlined />
                                </Button>
                            )}
                        </div>
                        {showForm ? (
                            <div className='mt-8 rounded-lg bg-white-900 transition-all'>
                                <AnswerQuestionForm
                                    questionId={currentQuestion.id}
                                    tutorId={data?.user?.user?.id ?? ''}
                                    onHideForm={() => setShowForm(false)}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        {/* the same topic of the question */}
                        <div className='mt-8'>
                            <div className='w-full font-bold text-2xl text-black mb-8 items-center flex'>
                                <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                                Câu hỏi cùng chủ đề
                            </div>
                            <Row gutter={[32, 32]}>
                                {questions &&
                                    questions.length > 0 &&
                                    questions.map((question) => {
                                        return (
                                            <Col xs={24} sm={12} md={12} key={question.id}>
                                                <CardQuestion question={question} />
                                            </Col>
                                        );
                                    })}
                            </Row>
                            <Pagination
                                defaultCurrent={1}
                                total={50}
                                className='py-8 flex justify-center'
                            />
                        </div>
                    </div>
                )}
                <div className='w-1/3'>
                    <div>
                        <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Thông tin cá nhân
                        </div>
                        <div>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                            <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                                This is tag
                            </Tag>
                        </div>
                        <div className='w-full font-bold text-lg text-black mb-8 items-center flex mt-8'>
                            <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                            Người hướng dẫn nổi bật
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedQuestionPage;
