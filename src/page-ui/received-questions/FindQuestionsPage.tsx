'use client';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Empty, Row } from 'antd';

import { CardQuestionUser } from '@components/card/CardQuestionUser';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { PaginationCore } from '@components/pagination/pagination';
import { QuestionStatus, optionQuestionStatusForTutor } from '@core/enums/question.enum';
import { usePagingFilter } from '@core/hooks/usePagingFilter';
import { getEnum } from '@core/parser/enum.parser';
import {
    QuestionListFilter,
    getQuestionListTutorApi,
    questionListTutorKeys,
} from '@core/services/questions.service';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function FindQuestionsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { initialPaging, initialFilter } = useMemo(() => {
        const initialFilter: QuestionListFilter = {
            status:
                getEnum<QuestionStatus>(
                    searchParams ? searchParams.get('status') : '',
                    QuestionStatus,
                ) || undefined,
        };
        const initialPaging: IPaginationInfo = {
            pageSize: +(searchParams?.get('pageSize') || initialPagingState.pageSize),
            page: +(searchParams?.get('page') || initialPagingState.page),
        };
        return {
            initialPaging,
            initialFilter,
        };
    }, [searchParams]);

    const { handlePageChange, filter, handleFilterChange } = usePagingFilter({
        initialPaging,
        initialFilter,
    });

    const data = useQuery({
        queryKey: questionListTutorKeys.list(filter),
        queryFn: () => getQuestionListTutorApi(filter),
        placeholderData: keepPreviousData,
    });

    return (
        <div>
            <div className='flex mb-8 justify-between flex-wrap gap-2'>
                {/* <DropDownField className='px-6 py-3 flex items-center' title='Sắp xếp theo' /> */}
                <CustomSelectInput
                    classNameForm='w-[167px]'
                    optionsSelect={[]}
                    placeholder='Sắp xếp theo'
                    classNameSelect='placeholder-color'
                />
                <CustomTextInput
                    prefix={<SearchOutlined />}
                    placeholder='Nhập nội dung tìm kiếm...'
                    classNameForm='w-[400px]'
                />
                <CustomSelectInput
                    classNameForm='w-[131px] '
                    optionsSelect={optionQuestionStatusForTutor}
                    onChange={(e) => {
                        handleFilterChange({
                            status: e,
                        });
                    }}
                    placeholder='Bộ lọc'
                    classNameSelect='placeholder-color '
                />
            </div>
            {data.isFetching ? (
                <Row gutter={[32, 32]}>
                    {[1, 2, 3, 4, 5, 6].map((item) => {
                        return (
                            <Col xs={24} sm={12} md={8} key={item}>
                                <CardQuestionUser loading />
                            </Col>
                        );
                    })}
                </Row>
            ) : !data.data?.data.data || data.data?.data.data.length === 0 ? (
                <Empty />
            ) : (
                <Row gutter={[32, 32]}>
                    {data.data?.data.data.map((question) => {
                        return (
                            <Col xs={24} sm={12} md={8} key={question.questionId}>
                                <CardQuestionUser
                                    question={question}
                                    onClick={() => {
                                        router.push(`${pathname}/${question.questionId}`);
                                    }}
                                />
                            </Col>
                        );
                    })}
                </Row>
            )}
            <PaginationCore
                onPageNumberChange={handlePageChange}
                pageSize={data.data?.data.paginationInfo.pageSize ?? initialPaging.pageSize}
                current={data.data?.data.paginationInfo.page}
                total={data.data?.data.paginationInfo.total}
            />
        </div>
    );
}
