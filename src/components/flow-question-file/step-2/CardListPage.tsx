'use client';

import { MentorListResp } from '@core/models/mentor.model';

import images from '@assets/images';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import ModalConfirm from '@components/modal/ModalConfirm';
import { PaginationCore } from '@components/pagination/pagination';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { SocketEvent } from '@core/enums/socket.enum';
import { usePagingFilter } from '@core/hooks/usePagingFilter';
import { PickTutorReq, getTutorOnline, pickTutor, tutorsKeys } from '@core/services/user.service';
import { RootState } from '@core/store';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CardListPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const [mentorList, setMentorList] = useState<MentorListResp[]>([]);
    const questions = useSelector((state: RootState) => state.questions.questions);
    const currentQuestionId = useSelector((state: RootState) => state.questions.currentQuestionId);

    const initialPaging: IPaginationInfo = useMemo(() => {
        const initialPaging: IPaginationInfo = {
            pageSize: +(searchParams?.get('pageSize') || initialPagingState.pageSize),
            page: +(searchParams?.get('page') || initialPagingState.page),
        };
        return initialPaging;
    }, [searchParams]);

    const question = useMemo(() => {
        if (questions && currentQuestionId) {
            return questions?.find((question) => question.questionId === currentQuestionId);
        }
    }, [questions]);

    const [paginationInfo, setPaginationInfo] = useState<IPaginationInfo>(initialPaging);

    const { handlePageChange, filter } = usePagingFilter({
        initialPaging,
        searchParamDefault: ['step', 'mode', 'searchMySelfTab', 'isTutorOnline'],
    });

    useQuery({
        queryKey: tutorsKeys.list({
            ...filter,
            subjectId: question?.subjectId ?? '',
        }),
        queryFn: () =>
            getTutorOnline({
                ...filter,
                subjectId: question?.subjectId ?? '',
            }),
    });

    const mutatePickTutor = useMutation({
        mutationFn: (data: PickTutorReq) => pickTutor(data),
        onSuccess: () => {
            setIsOpen(true);
        },
    });

    useEffect(() => {
        if (socketReducer) {
            socketReducer?.on(SocketEvent.GET_TUTORS_AVAILABLE, (data) => {
                console.log(data);
                setMentorList(data.data);
                setPaginationInfo(data.paginationInfo);
            });
        }

        return () => {
            socketReducer?.off(SocketEvent.TUTORS_AVAILABLE);
        };
    }, [socketReducer]);

    return (
        <div className='w-full mx-auto'>
            <Row gutter={[32, 32]}>
                {mentorList.length === 0
                    ? [1, 2, 3, 4, 5, 6].map((item) => {
                          return (
                              <Col span={8} xs={24} sm={8} key={item}>
                                  <CardMentorInfo
                                      // mentor={{
                                      //    loading
                                      // }}

                                      mentor={{
                                          id: '',
                                          image: images.feedback.src,
                                          name: 'loading',
                                          age: 0,
                                          rating: 0,
                                      }}
                                      loading
                                      isAvatar={false}
                                  />
                              </Col>
                          );
                      })
                    : mentorList?.map((mentor) => {
                          return (
                              <Col span={8} xs={24} sm={8} key={mentor.id}>
                                  <CardMentorInfo
                                      mentor={{
                                          id: mentor.id,
                                          image: images.feedback.src,
                                          name: mentor.fullName,
                                          age: mentor.age,
                                          rating: mentor.averageRate,
                                      }}
                                      onPickMentor={() => {
                                          mutatePickTutor.mutate({
                                              questionId: question?.questionId || '',
                                              tutorId: mentor.id,
                                          });
                                      }}
                                      isAvatar={false}
                                  />
                              </Col>
                          );
                      })}
            </Row>
            <PaginationCore
                onPageNumberChange={handlePageChange}
                pageSize={paginationInfo.pageSize ?? initialPaging.pageSize}
                current={paginationInfo.page}
                total={paginationInfo.total}
            />
            <ButtonPrimary
                title={'Hủy tìm kiếm'}
                className='!w-fit'
                onClick={() => {
                    const newParams = new URLSearchParams(searchParams || '');
                    newParams.delete('mode');
                    newParams.delete('searchMySelfTab');
                    newParams.delete('isTutorOnline');
                    newParams.delete('page');
                    newParams.delete('pageSize');
                    router.push(`${MY_ROUTE.MENTOR.FILE}?${newParams.toString()}`);
                }}
            />
            <ModalConfirm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                message='Đã gửi tới mentor vui lòng chờ...'
                titleCancel='Quay lại trang chủ'
                titleYes='Tiếp tục đặt câu hỏi'
                onConfirm={() => {
                    router.push(MY_ROUTE.MENTOR.FILE);
                }}
                onCancel={() => {
                    router.push(MY_ROUTE.HOME);
                }}
            />
        </div>

        // </Spin>
    );
}
