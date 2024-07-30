'use client';
import ButtonOutlined from '@components/button/ButtonOutlined';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CustomDateInput } from '@components/form-input/CustomDateTimeInput';
import { SocketEvent } from '@core/enums/socket.enum';
import { CreateGGMeetModel, GetQuestionResponseModel } from '@core/models/question.model';
import { UserRole } from '@core/models/user.model';
import { detailedQuestionKeys } from '@core/services/questions.service';
import { CancelGoogleMeetReq, cancelGoogleMeetByIdApi } from '@core/services/user.service';
import { RootState } from '@core/store';
import { formatPriceVND } from '@core/utilities/caculate-price.utility';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { Dayjs } from 'dayjs';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ModalConfirmGoogleMeet({
    isModalOpen,
    setIsModalOpen,
    questionDetail,
    timeStart,
    onAccept,
}: {
    isModalOpen: boolean;
    questionDetail?: GetQuestionResponseModel;
    setIsModalOpen: (value: null) => void;
    timeStart: string;
    onAccept: () => void;
}) {
    const [date, setDate] = useState<Dayjs | null>();
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const session = useSession();

    const cancleMutation = useMutation({
        mutationFn: (data: CancelGoogleMeetReq) => cancelGoogleMeetByIdApi(data),
        onError: handleError,
    });

    const handleOk = () => {
        setIsModalOpen(null);
    };
    const queryClient = useQueryClient();

    const handleCancel = () => {
        if (questionDetail?.questionId) {
            cancleMutation.mutate(
                {
                    isStudent: session.data?.user.user.role === UserRole.STUDENT,
                    questionId: questionDetail.questionId,
                    studentId: questionDetail.student.id,
                    tutorId: questionDetail.tutor!.id,
                },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: detailedQuestionKeys.all,
                        });
                    },
                },
            );
        }
        setIsModalOpen(null);
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                // okText='Chấp nhận'
                // cancelText='Từ chối'
                maskClosable={false}
                closable={false}
                footer={null}
                className='w-[500px] h-[500px] flex flex-col text-center items-center justify-center'
            >
                <div className='flex flex-col gap-2 items-start'>
                    <div className='text-xl'>
                        Câu hỏi chủ đề : <strong>{questionDetail?.subject?.name}</strong>
                    </div>
                    <div className='text-xl'>
                        Tiêu đề : <strong>{questionDetail?.title}</strong>
                    </div>
                    <div className='text-xl flex gap-2'>
                        Giá:
                        <strong>
                            {formatPriceVND(questionDetail?.price ? +questionDetail.price : 0)}
                        </strong>
                    </div>
                    <div className='text-xl'>Thời gian tham gia google meet</div>
                    <div className='text-xl font-semibold text-red-600'>{timeStart}</div>
                </div>
                <div className='flex flex-col justify-start items-start'>
                    <span className='text-xl mt-2'>Đề xuất giờ mới cho đối phương:</span>
                    <CustomDateInput
                        showTime
                        classNameForm='my-3 w-[300px]'
                        placeholder='Chọn thời gian'
                        disabledBeforeDate
                        onChange={(value) => {
                            setDate(value);
                        }}
                    />
                    <ButtonPrimary
                        title={'Gửi'}
                        className='!h-fit !w-fit '
                        disabled={!date}
                        onClick={() => {
                            socketReducer?.emit(SocketEvent.SEND_INFO_GOOGLE_MEET, {
                                questionId: questionDetail?.questionId,
                                studentId: questionDetail?.student.id,
                                tutorId: questionDetail?.tutor?.id,
                                isStudent: session.data?.user.user.role === UserRole.STUDENT,
                                meeting_start_time: date?.format('YYYY-MM-DD HH:mm:ss'),
                            } as CreateGGMeetModel);
                            setIsModalOpen(null);
                        }}
                    />
                </div>
                <div className='flex gap-2 mt-4 justify-end'>
                    <ButtonOutlined
                        title={'Từ chối'}
                        className='!h-fit !border-[1px] !w-fit'
                        onClick={handleCancel}
                    />
                    <ButtonPrimary
                        title={'Chấp nhận'}
                        className='!h-fit !w-fit'
                        onClick={onAccept}
                    />
                </div>
            </Modal>
        </div>
    );
}
