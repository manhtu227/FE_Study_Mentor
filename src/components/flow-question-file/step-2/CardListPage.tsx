'use client';

import { MentorListFilter, MentorListResp } from '@core/models/mentor.model';

import images from '@assets/images';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { PaginationCore } from '@components/pagination/pagination';
import { SocketEvent } from '@core/enums/socket.enum';
import { RootState } from '@core/store';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { Col, Row, Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CardListPage() {
    const searchParams = useSearchParams();
    const initialPaging: IPaginationInfo = {
        pageSize: +(searchParams?.get('pageSize') ?? initialPagingState.pageSize),
        page: +(searchParams?.get('page') ?? initialPagingState.page),
    };
    const { data } = useSession();
    const socketReducer = useSelector((state: RootState) => state.socket.socket);
    const [mentorList, setMentorList] = useState<MentorListResp[]>();
    const [paginationInfo, setPaginationInfo] = useState<IPaginationInfo>(initialPaging);
    const questions = useSelector((state: RootState) => state.questions.questions);
    const currentQuestionId = useSelector((state: RootState) => state.questions.currentQuestionId);
    const [request, setRequest] = useState<MentorListFilter>();

    useEffect(() => {
        if (socketReducer) {
            handleFetchTutors();
            socketReducer?.on(SocketEvent.GET_TUTORS_AVAILABLE, (data) => {
                setMentorList(data.data);
                setPaginationInfo(data.paginationInfo);
            });
        }

        return () => {
            socketReducer?.off(SocketEvent.TUTORS_AVAILABLE);
        };
    }, [request?.page, socketReducer]);

    const handleFetchTutors = () => {
        setRequest({
            userId: data?.user?.user?.id ?? '',
            subjectId:
                questions?.find((question) => question.questionId === currentQuestionId)
                    ?.subjectId ?? '',
            page: 1,
            pageSize: 11,
        });

        socketReducer?.emit(SocketEvent.TUTORS_AVAILABLE, request);
    };

    const handlePageChange = ({ page, pageSize }: IPaginationInfo) => {
        const newRequest = {
            page,
            pageSize,
            subjectId: request?.subjectId ?? '',
            userId: request?.userId ?? '',
        };
        setRequest(newRequest);
    };

    return (
        <Spin spinning={!mentorList}>
            <div className='max-w[837px]'>
                <Row gutter={[32, 32]}>
                    {mentorList?.map((mentor) => {
                        return (
                            <Col span={12} xs={24} sm={12} key={mentor.id}>
                                <CardMentorInfo
                                    mentor={{
                                        id: mentor.id,
                                        image: images.feedback.src,
                                        name: mentor.fullName,
                                        age: mentor.age,
                                        rating: mentor.averageRate,
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
            </div>
        </Spin>
    );
}
