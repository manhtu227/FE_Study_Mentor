'use client';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Empty, Row } from 'antd';

import { CardQuestionUser } from '@components/card/CardQuestionUser';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { PaginationCore } from '@components/pagination/pagination';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { QuestionStatus, optionQuestionStatus } from '@core/enums/question.enum';
import { usePagingFilter } from '@core/hooks/usePagingFilter';
import { getEnum } from '@core/parser/enum.parser';
import {
    QuestionListFilter,
    getQuestionListApi,
    questionListKeys,
} from '@core/services/questions.service';
import { setCurrentQuestionId } from '@core/store/reducers/question.reducer';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export default function QuestionListPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

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
        searchParamDefault: ['step', 'mode', 'searchMySelfTab', 'isTutorOnline'],
    });

    const data = useQuery({
        queryKey: questionListKeys.list(filter),
        queryFn: () => getQuestionListApi(filter),
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
                    optionsSelect={optionQuestionStatus}
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
                            <Col xs={24} sm={12} md={8} key={question.id}>
                                <CardQuestionUser
                                    question={question}
                                    onClick={() => {
                                        dispatch(setCurrentQuestionId(question.id));
                                        router.push(
                                            `${MY_ROUTE.MENTOR.FILE}?step=${
                                                question?.step ? question?.step - 1 : 2
                                            }`,
                                        );
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
