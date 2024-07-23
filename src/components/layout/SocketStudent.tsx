import ModalConfirmGoogleMeet from '@components/modal/ModalConfirmGoogleMeet';
import { SocketEvent } from '@core/enums/socket.enum';
import { CreateGGMeetModel } from '@core/models/question.model';
import { getDetailedQuestionApi } from '@core/services/questions.service';
import { createGoogleMeetApi } from '@core/services/user.service';
import { RootState } from '@core/store';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type ModalOpen = SocketEvent.RECEIVE_INFO_GOOGLE_MEET | null;

export function SocketStudent() {
    const [modalOpen, setModalOpen] = useState<ModalOpen>(null);
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const [data, setData] = useState<CreateGGMeetModel | null>(null);

    const mutationQuestion = useMutation({
        mutationFn: (data: string) => getDetailedQuestionApi(data),
    });

    useEffect(() => {
        if (socketReducer) {
            socketReducer.on(SocketEvent.RECEIVE_INFO_GOOGLE_MEET, (data: CreateGGMeetModel) => {
                mutationQuestion.mutate(data.questionId);
                setData(data);
                setModalOpen(SocketEvent.RECEIVE_INFO_GOOGLE_MEET);
            });
        }
        return () => {
            socketReducer?.off(SocketEvent.RECEIVE_INFO_GOOGLE_MEET);
        };
    }, [socketReducer]);

    const mutationCreate = useMutation({
        mutationFn: (data: CreateGGMeetModel) => createGoogleMeetApi(data),
        onError: handleError,
    });

    return (
        <div>
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
                            questionId: questionDetail.id!,
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
