'use client';

import images from '@assets/images';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { PaginationCore } from '@components/pagination/pagination';
import { usePagingFilter } from '@core/hooks/usePagingFilter';
import { MentorListFilter } from '@core/models/mentor.model';
import { getMentorListApi, mentorListKeys } from '@core/services/mentors.service';
import { initialPagingState, PagingReq } from '@core/types/paging.type';
import { calculateAge } from '@core/utilities/caculate-age.utility';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function CardListPage() {
    const searchParams = useSearchParams();
    const { initialPaging, initialFilter } = useMemo(() => {
        const initialFilter = {
            levelId: searchParams?.get('levelId') || '9b9cccf5-6a4b-45bc-9325-996cc582b756',
            gradeId: searchParams?.get('gradeId') || '8d116df8-29f3-40d2-b3c0-9b554c78f59e',
        };
        const initialPaging: PagingReq = {
            limit: +(searchParams?.get('limit') || initialPagingState.limit),
            page: +(searchParams?.get('page') || initialPagingState.page),
        };
        return { initialPaging, initialFilter };
    }, [searchParams]);

    const { filter, handlePageChange } = usePagingFilter<MentorListFilter>({
        initialPaging,
        initialFilter,
    });

    const mentorListQuery = useQuery({
        queryKey: mentorListKeys.list(filter),
        queryFn: () => getMentorListApi(filter),
        select: (resp) => {
            return {
                data: resp.data.data,
                pagingInfo: {
                    page: resp.data.currentPage,
                    limit: filter.limit,
                    total: resp.data.totalPages,
                },
            };
        },
    });

    return (
        <Spin spinning={mentorListQuery.isFetching}>
            <div className='max-w[837px]'>
                <Row gutter={[32, 32]}>
                    {mentorListQuery.data?.data.map((mentor) => {
                        return (
                            <Col span={12} xs={24} sm={12} key={mentor.Id}>
                                <CardMentorInfo
                                    mentor={{
                                        id: mentor.Id,
                                        image: images.feedback.src,
                                        name: mentor.FullName,
                                        age: calculateAge(mentor.DateOfBirth),
                                        rating: mentor.AverageRate,
                                        tags: ['tag1', 'tag2', 'tag3'],
                                    }}
                                    isAvatar={false}
                                />
                            </Col>
                        );
                    })}
                </Row>
                <PaginationCore
                    onPageNumberChange={handlePageChange}
                    pageSize={mentorListQuery.data?.pagingInfo.limit}
                    current={mentorListQuery.data?.pagingInfo.page}
                    total={mentorListQuery.data?.pagingInfo.total}
                />
            </div>
        </Spin>
    );
}
