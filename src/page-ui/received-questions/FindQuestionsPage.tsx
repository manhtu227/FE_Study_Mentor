'use client';
import { SearchOutlined } from '@ant-design/icons';
import { Col, DatePicker, Empty, Row } from 'antd';

import { CardQuestionUser } from '@components/card/CardQuestionUser';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { PaginationCore } from '@components/pagination/pagination';
import { QuestionStatusString, optionQuestionStatusForTutor } from '@core/enums/question.enum';
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

const { RangePicker } = DatePicker;

export default function FindQuestionsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { initialPaging, initialFilter } = useMemo(() => {
        const initialFilter: QuestionListFilter = {
            status:
                getEnum<QuestionStatusString>(
                    searchParams ? searchParams.get('status') : '',
                    QuestionStatusString,
                ) || undefined,
            search: searchParams.get('search') || undefined,
            fromDate: searchParams.get('fromDate') || undefined,
            toDate: searchParams.get('toDate') || undefined,
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
        <div className='mt-10'>
            <div className='flex mb-8 justify-between flex-wrap gap-2 h-12'>
                {/* <DropDownField className='px-6 py-3 flex items-center' title='Sắp xếp theo' /> */}
                {/* <CustomSelectInput
                    classNameForm='w-[167px]'
                    optionsSelect={[]}
                    placeholder='Sắp xếp theo'
                    classNameSelect='placeholder-color'
                /> */}
                <RangePicker
                    size='small'
                    className='h-full'
                    onChange={(e) => {
                        handleFilterChange({
                            fromDate: e?.[0]?.format('YYYY-MM-DD') ?? undefined,
                            toDate: e?.[1]?.format('YYYY-MM-DD') ?? undefined,
                        });
                    }}
                    placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                />
                <CustomTextInput
                    prefix={<SearchOutlined />}
                    placeholder='Nhập nội dung tìm kiếm...'
                    classNameForm='w-[400px]'
                    onChange={(e: any) => {
                        handleFilterChange({ search: e.target.value });
                    }}
                />
                <CustomSelectInput
                    classNameForm='w-[284px]'
                    optionsSelect={optionQuestionStatusForTutor}
                    onChange={(e) => {
                        handleFilterChange({
                            status: e,
                        });
                    }}
                    placeholder='Trạng thái'
                    classNameSelect='placeholder-color '
                    value={filter.status}
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
