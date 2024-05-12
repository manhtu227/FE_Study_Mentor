'use client';

import images from '@assets/images';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { MentorListFilter, MentorListResp } from '@core/models/mentor.model';

import { PaginationCore } from '@components/pagination/pagination';
import { GET_TUTOR_FAVOURITE, GET_TUTOR_ONLINE } from '@core/constants/socket.constants';
import useSocket from '@core/hooks/useSocket';
import { RootState } from '@core/store';
import { IPaginationInfo, PagingResp, initialPagingState } from '@core/types/paging.type';
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
    const isTutorOnline = searchParams?.get('isTutorOnline') ?? true;
    const { data } = useSession();
    const { isConnected, currentSocket } = useSocket();
    const [response, setResponse] = useState<PagingResp<MentorListResp[]>>();
    const questions = useSelector((state: RootState) => state.questions.questions);
    const currentQuestionId = useSelector((state: RootState) => state.questions.currentQuestionId);
    const [request, setRequest] = useState<MentorListFilter>();

    useEffect(() => {
        handleFetchTutors();
    }, [isConnected]);

    useEffect(() => {
        if (isConnected) {
            handleFetchTutors();
        }
    }, [isTutorOnline, request?.page]);

    const handleFetchTutors = () => {
        if (!isConnected) return;

        setRequest({
            userId: data?.user?.user?.id ?? '',
            subjectId:
                questions?.find((question) => question.questionId === currentQuestionId)
                    ?.subjectId ?? '',
            page: 1,
            pageSize: 11,
        });

        if (isTutorOnline === 'true') {
            currentSocket?.emit(GET_TUTOR_ONLINE, request);
            currentSocket?.on(GET_TUTOR_ONLINE, (data) => handleGetData(data));
            currentSocket?.off(GET_TUTOR_FAVOURITE);
        } else {
            currentSocket?.emit(GET_TUTOR_FAVOURITE, request);
            currentSocket?.on(GET_TUTOR_FAVOURITE, (data) => handleGetData(data));
            currentSocket?.off(GET_TUTOR_ONLINE);
        }
    };

    const handleGetData = (data: PagingResp<MentorListResp[]>) => {
        console.log(data, data.data);

        setResponse(data);
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
        <Spin spinning={!response?.success}>
            <div className='max-w[837px]'>
                <Row gutter={[32, 32]}>
                    {response?.data?.map((mentor) => {
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
                    pageSize={response?.paginationInfo.pageSize ?? initialPaging.pageSize}
                    current={response?.paginationInfo.page}
                    total={response?.paginationInfo.total}
                />
            </div>
        </Spin>
    );
}
