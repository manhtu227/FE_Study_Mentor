'use client';

import images from '@assets/images';
import { CardMentorInfo } from '@components/card/CardMentorInfo';
import { PaginationCore } from '@components/pagination/pagination';
import { MentorListFilter } from '@core/models/mentor.model';
import {
    getFavoriteMentorListApi,
    getMentorListApi,
    mentorListKeys,
} from '@core/services/mentors.service';
import { RootState } from '@core/store';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { calculateAge } from '@core/utilities/caculate-age.utility';
import { useQuery } from '@tanstack/react-query';
import { Col, Row, Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function CardListPage() {
    const searchParams = useSearchParams();
    const initialPaging: IPaginationInfo = {
        pageSize: +(searchParams?.get('pageSize') ?? initialPagingState.pageSize),
        page: +(searchParams?.get('page') ?? initialPagingState.page),
    };
    const subjectId = searchParams?.get('subjectId');
    const currentTab = searchParams?.get('searchYourSelfTab') ?? '1';
    const isTutorOnline = searchParams?.get('isTutorOnline') ?? true;
    const user = useSelector((state: RootState) => state.authentication)?.user ?? '';

    const [filter, setFilter] = useState<MentorListFilter>({
        subjectId: subjectId ?? 'e4e0697e-56c7-4650-9ea2-52b5d8f5e55f',
        page: initialPaging.page,
        pageSize: 1 ?? initialPaging.pageSize,
    });

    console.log(isTutorOnline as boolean, currentTab);

    const mentorListQuery = useQuery({
        queryKey: [...mentorListKeys.list(filter), currentTab],
        queryFn: () =>
            isTutorOnline === 'true'
                ? getMentorListApi(filter)
                : getFavoriteMentorListApi({
                      page: filter.page,
                      pageSize: filter.pageSize,
                      userId: user?.id,
                  }),
        select: (resp) => {
            return {
                data: resp.data.data,
                pagingInfo: {
                    page: resp.data.paginationInfo.page,
                    pageSize: filter.pageSize,
                    total: resp.data.paginationInfo.total,
                },
            };
        },
    });

    const handlePageChange = ({ page, pageSize }: IPaginationInfo) => {
        setFilter((prev) => ({ ...prev, page, pageSize }));
    };

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
                    pageSize={mentorListQuery.data?.pagingInfo.pageSize}
                    current={mentorListQuery.data?.pagingInfo.page}
                    total={mentorListQuery.data?.pagingInfo.total}
                />
            </div>
        </Spin>
    );
}
