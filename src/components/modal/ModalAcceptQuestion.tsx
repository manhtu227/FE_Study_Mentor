'use client';
import { DownloadOutlined } from '@ant-design/icons';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { QuestionAcceptStatus, QuestionType } from '@core/enums/question.enum';
import { SocketEvent } from '@core/enums/socket.enum';
import { AcceptQuestionModel, ReceiveNewQuestionModel } from '@core/models/question.model';
import { RootState } from '@core/store';
import { handleDetechQuestionType } from '@core/utilities/question.utility';
import { Modal } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ModalAcceptQuestion({
    question,
    setShowModal,
    isShow,
}: {
    question: ReceiveNewQuestionModel;
    setShowModal: (value: boolean) => void;
    isShow: boolean;
}) {
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const { data } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const createRequest = (
        senderId: string,
        studentId: string,
        status: QuestionAcceptStatus,
    ): AcceptQuestionModel => {
        return {
            questionId: question.questionId,
            senderId: senderId,
            studentId: studentId,
            isAccepted: status,
        };
    };

    const handleOk = () => {
        setShowModal(false);
        const senderId = data?.user?.user?.id;
        const studentId = question?.student?.id;

        if (!senderId || !studentId) return;

        const request: AcceptQuestionModel = createRequest(
            senderId,
            studentId,
            QuestionAcceptStatus.AGREE,
        );

        socketReducer?.emit(SocketEvent.ACCEPT_PICKED, request);

        if (question.type === QuestionType.FILE) {
            router.push(`${MY_ROUTE.MENTOR.RECEIVED_QUESTIONS}/${question.questionId}`);
        } else if (question.type === QuestionType.MEETING) {
            Modal.success({
                content:
                    'Chờ một chút, bạn sẽ nhận được link Google Meet để trả lời câu hỏi trong ít phút nữa!',
            });
        }
    };

    const handleCancel = () => {
        setShowModal(false);

        const senderId = data?.user?.user?.id;
        const studentId = question?.student?.id;

        if (!senderId || !studentId) return;

        const request: AcceptQuestionModel = createRequest(
            senderId,
            studentId,
            QuestionAcceptStatus.DECLINE,
        );

        socketReducer?.emit(SocketEvent.ACCEPT_PICKED, request);
    };
    return (
        <div>
            <Modal
                open={isShow}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                okText='Chấp nhận'
                cancelText='Từ chối'
                closable={false}
                className='!w-[700px] flex flex-col text-left'
            >
                <h3 className='text-[20px] leading-[27px] text-[NeutralDark1]'>
                    Có 1 học viên muốn được bạn trả lời 1 câu hỏi
                </h3>
                <div className='mt-2'>
                    <h3 className='mb-0 font-bold text-xl text-blue-700'>Học viên:</h3>
                    <div className='mt-2'>
                        <div className='text-lg'>
                            <strong>Tên học viên:</strong> {question.student?.fullName}
                        </div>
                        <div className='text-lg'>
                            <strong>Email:</strong> {question.student?.email}
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <h3 className='mb-0 font-bold text-xl text-blue-700'>Nội dung câu hỏi:</h3>
                    <div className='mt-2'>
                        <div className='text-lg'>
                            <strong>Loại câu hỏi:</strong> {handleDetechQuestionType(question.type)}
                        </div>
                        <div className='text-lg'>
                            <strong>Tiêu đề:</strong> {question.title}
                        </div>
                        <div className='text-lg'>
                            <strong>Chủ đề:</strong> {question.subject.name}
                        </div>
                        <div className='text-lg'>
                            <strong>Giá:</strong> {question.price} đồng
                        </div>
                        <div className='font-bold text-lg'>Nội dung:</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: question.content,
                            }}
                            className='p-2 mt-2 border rounded-lg border-gray-600 border-solid'
                        />
                        <div className='text-lg mt-1'>
                            <strong>
                                File đính kèm:{' '}
                                <span className='font-light italic text-sm'>
                                    (tải về để xem chi tiết)
                                </span>
                            </strong>
                        </div>
                        <div className='mt-1 border rounded-lg border-gray-600 border-solid'>
                            {question.fileQuestions &&
                                question.fileQuestions.length > 0 &&
                                question.fileQuestions.map((file) => {
                                    return (
                                        <div
                                            key={file.fileKey}
                                            className='flex items-center justify-between p-4 gap-1'
                                        >
                                            <div className='flex items-center'>
                                                <div className='font-bold text-md mx-4 max-w-4/5 truncate text-green-500'>
                                                    {file.fileName}
                                                </div>
                                            </div>
                                            <Link
                                                href={`${process.env.NEXT_PUBLIC_PHOTO}${file.fileKey}`}
                                                type='download'
                                                className='hover:opacity-90'
                                            >
                                                <DownloadOutlined className='text-green-500 text-2xl cursor-pointer' />
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                <div className='font-semibold mt-4 text-lg text-red-400 text-center'>
                    Bạn có muốn nhận câu hỏi này không?
                </div>
            </Modal>
        </div>
    );
}
