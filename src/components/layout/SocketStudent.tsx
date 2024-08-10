import ModalConfirm from '@components/modal/ModalConfirm';
import ModalConfirmGoogleMeet from '@components/modal/ModalConfirmGoogleMeet';
import { SocketEvent } from '@core/enums/socket.enum';
import { CreateGGMeetModel } from '@core/models/question.model';
import { detailedQuestionKeys, getDetailedQuestionApi } from '@core/services/questions.service';
import { createGoogleMeetApi } from '@core/services/user.service';
import { RootState } from '@core/store';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastError, toastSuccess } from '@core/utilities/toast.utility';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type ModalOpen = SocketEvent.RECEIVE_INFO_GOOGLE_MEET | SocketEvent.CANCEL_GGMEET | null;

type Props = {
    modalOpenProps?: ModalOpen;
};

export function SocketStudent({ modalOpenProps }: Props) {
    const [modalOpen, setModalOpen] = useState<ModalOpen>(null);
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const [data, setData] = useState<CreateGGMeetModel | null>(null);

    const mutationQuestion = useMutation({
        mutationFn: (data: string) => getDetailedQuestionApi(data),
    });
    const queryClient = useQueryClient();

    useEffect(() => {
        if (socketReducer) {
            socketReducer.on(SocketEvent.RECEIVE_INFO_GOOGLE_MEET, (data: CreateGGMeetModel) => {
                mutationQuestion.mutate(data.questionId);
                setData(data);
                setModalOpen(SocketEvent.RECEIVE_INFO_GOOGLE_MEET);
            });
            socketReducer.on(SocketEvent.CANCEL_GGMEET, () => {
                queryClient.invalidateQueries({
                    queryKey: detailedQuestionKeys.all,
                });
                toastError('Cuộc họp đã bị hủy');
            });
        }
        return () => {
            socketReducer?.off(SocketEvent.CANCEL_GGMEET);
            socketReducer?.off(SocketEvent.RECEIVE_INFO_GOOGLE_MEET);
        };
    }, [socketReducer]);

    useEffect(() => {
        if (modalOpenProps) {
            setModalOpen(modalOpenProps);
        }
    }, [modalOpenProps]);

    const mutationCreate = useMutation({
        mutationFn: (data: CreateGGMeetModel) => createGoogleMeetApi(data),
        onError: handleError,
    });

    return (
        <div>
            <ModalConfirm
                isOpen={modalOpen === SocketEvent.CANCEL_GGMEET}
                setIsOpen={setModalOpen}
                onConfirm={() => {
                    setModalOpen(null);
                }}
                message='Cuộc họp đã bị hủy vui lòng tìm kiếm lại'
                onCancel={() => {
                    setModalOpen(null);
                }}
            />
            <ModalConfirmGoogleMeet
                isModalOpen={modalOpen === SocketEvent.RECEIVE_INFO_GOOGLE_MEET}
                setIsModalOpen={setModalOpen}
                questionDetail={mutationQuestion.data?.data.data}
                timeStart={data?.meeting_start_time || ''}
                onAccept={() => {
                    const questionDetail = mutationQuestion.data?.data.data;
                    if (!questionDetail) return;
                    mutationCreate.mutate(
                        {
                            questionId: questionDetail.questionId!,
                            tutorId: questionDetail!.tutor!.id!,
                            studentId: questionDetail.student.id!,
                            meeting_start_time: data!.meeting_start_time,
                            // meeting_start_time
                        },
                        {
                            onSuccess: () => {
                                setModalOpen(null);
                                toastSuccess('Tạo cuộc họp thành công');
                            },
                        },
                    );
                }}
            />
        </div>
    );
}
