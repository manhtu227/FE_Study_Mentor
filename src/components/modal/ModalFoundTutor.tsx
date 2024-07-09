'use client';
import images from '@assets/images';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { SocketEvent } from '@core/enums/socket.enum';
import {
    AnswerResponseModel,
    GetQuestionResponseModel,
    QuestionEnum,
} from '@core/models/question.model';
import { UserModel } from '@core/models/user.model';
import { PickTutorReq, createGoogleMeetApi } from '@core/services/user.service';
import { RootState } from '@core/store';
import { setCurrentQuestionId } from '@core/store/reducers/question.reducer';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { imageUtility } from '@core/utilities/image.utility';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Image, Modal, Rate } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from './ModalConfirm';

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    user?: UserModel;
    isAccepted?: number;
    questionId?: string;
    methodAnswer?: QuestionEnum;
};

export default function ModalFoundTutor({
    isModalOpen,
    setIsModalOpen,
    user,
    isAccepted = 1,
    questionId,
    methodAnswer,
}: Props) {
    const dispatch = useDispatch();
    const [dots, setDots] = useState('');
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const [modalConfirm, setModalConfirm] = useState(false);

    const mutationCreate = useMutation({
        mutationFn: (data: PickTutorReq) => createGoogleMeetApi(data),
        onError: handleError,
    });

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
        if (isAccepted == 1) {
            if (methodAnswer === QuestionEnum.GG_MEET && questionId && user?.id) {
                mutationCreate.mutate(
                    {
                        questionId: questionId,
                        tutorId: user?.id,
                    },
                    {
                        onSuccess: () => {
                            toastSuccess('Tạo cuộc họp thành công');
                            router.push(`${MY_ROUTE.MENTOR.GOOGLE_MEET}?step=2&id=${user?.id}`);
                        },
                    },
                );
                return;
            }
            router.push(`${MY_ROUTE.MENTOR.FILE}?step=2&id=${user?.id}`);
        } else {
            dispatch(setCurrentQuestionId(questionId || ''));
            router.push(
                `${
                    methodAnswer === QuestionEnum.GG_MEET
                        ? MY_ROUTE.MENTOR.GOOGLE_MEET
                        : MY_ROUTE.MENTOR.FILE
                }?step=1`,
            );
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        // router.push('/');
    };

    useEffect(() => {
        if (socketReducer && isModalOpen) {
            socketReducer.off(SocketEvent.ANSWER);
            socketReducer.on(
                SocketEvent.ANSWER,
                (data: {
                    data: {
                        answer: AnswerResponseModel;
                        tutor: UserModel;
                        student: UserModel;
                        question: GetQuestionResponseModel;
                    };
                }) => {
                    if (isModalOpen) {
                        setModalConfirm(true);
                        setIsModalOpen(false);
                    }
                },
            );
            return () => {
                socketReducer.off(SocketEvent.ANSWER);
            };
        }
    }, [socketReducer, isModalOpen]);

    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Tiếp tục'
                width={450}
                cancelText='Quay lại trang chủ'
                // className='flex flex-col text-center items-center justify-center'
            >
                <div className='flex flex-col text-center items-center justify-center'>
                    <h2 className='text-[20px] leading-[27px] text-[NeutralDark1]'>
                        {isAccepted
                            ? 'Đã tìm thấy người hướng dẫn'
                            : 'Rất tiếc người này đã từ chối bạn'}
                    </h2>
                    <img
                        src={imageUtility(user?.avatar?.fileKey)}
                        alt='ảnh người hướng dẫn'
                        className='h-32 w-32'
                    />
                    <div className='py-1'>
                        {methodAnswer === QuestionEnum.FILE
                            ? 'Hình thức trò chuyện'
                            : 'Hình thức giải đáp qua google meet'}
                    </div>
                    {isAccepted && <div>Chờ câu trả lời từ người hướng dẫn {dots}</div>}
                    <div className='flex items-start gap-6 mt-5'>
                        <div className='h-[60px]'>
                            <Avatar
                                size={50}
                                icon={
                                    <Image
                                        alt={'image of question'}
                                        loading='lazy'
                                        src={
                                            user?.avatar?.fileKey
                                                ? `${process.env.NEXT_PUBLIC_PHOTO}${user?.avatar?.fileKey}`
                                                : images.teacher.src
                                        }
                                        width={50}
                                        preview={false}
                                        height={50}
                                    />
                                }
                            />
                        </div>

                        <div className='flex flex-col w-full'>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-bold items-start text-black-800'>
                                    {user?.fullName || 'Người ẩn danh'}
                                </span>
                            </div>

                            <div className='flex items-center gap-1'>
                                <Rate value={user?.averageRate} disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <ModalConfirm
                isOpen={modalConfirm}
                setIsOpen={setModalConfirm}
                message='Bạn có 1 câu trả lời từ người hướng dẫn'
                titleYes='Xem chi tiết'
                titleCancel='Quay lại trang chủ'
                onConfirm={() => {
                    router.push(
                        `${
                            methodAnswer === QuestionEnum.GG_MEET
                                ? MY_ROUTE.MENTOR.GOOGLE_MEET
                                : MY_ROUTE.MENTOR.FILE
                        }?step=2`,
                    );
                    setModalConfirm(false);
                }}
                onCancel={() => {
                    setModalConfirm(false);
                    // router.push('/');
                }}
            />
        </div>
    );
}
