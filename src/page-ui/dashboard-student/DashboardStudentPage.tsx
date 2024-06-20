'use client';
import DocumentIcon from '@assets/icons/document-icon';
import GlobeIcon from '@assets/icons/globe-icon';
import WalletIcon from '@assets/icons/wallet-icon';
import { CardTitleIcon } from '@components/card/CardTitleIcon';
import { FilterQuestionType } from '@core/enums/filter-question-type.enum';
import { QuestionStatus, QuestionStatusString } from '@core/enums/question.enum';
import { usePagingFilter } from '@core/hooks/usePagingFilter';
import { getEnum } from '@core/parser/enum.parser';
import {
    QuestionListFilter,
    getQuestionListApi,
    questionListKeys,
} from '@core/services/questions.service';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { formatPriceVND } from '@core/utilities/caculate-price.utility';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { HistoryQuestion, convertQuestionToTabel } from './components/HistoryQuestion';
import { SideBarMentorProfile } from './components/SideBarMentorPorfile';

export default function DashboardStudentPage() {
    const searchParams = useSearchParams();

    const { initialPaging, initialFilter } = useMemo(() => {
        const initialFilter: QuestionListFilter = {
            status:
                getEnum<QuestionStatusString>(
                    searchParams ? searchParams.get('status') : '',
                    QuestionStatusString,
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
        select: (resp) => {
            const data = resp.data.data.map(convertQuestionToTabel);
            const totalPrice = resp.data.data.reduce((total, item) => {
                if (item.status !== QuestionStatus.EXPIRED) return total + +item.price;
                return total;
            }, 0);
            return {
                data,
                paginationInfo: resp.data.paginationInfo,
                totalPrice,
            };
        },
        placeholderData: keepPreviousData,
    });

    // const totalPrice = useMemo(() => {
    //     return data.data?.data.data.reduce((total, item) => {
    //         if (item.status !== QuestionStatus.EXPIRED) return total + +item.price;
    //         return total;
    //     }, 0);
    // }, [data.data?.data.data]);

    return (
        <div className='pack-layout pb-16 px-4'>
            {/* <div className='h-[69px] flex items-center gap-4 text-sm font-bold text-primary-800'>
                <span>Học viên</span>
                <RightOutlined />
                <span>Quản lý và thống kê</span>
            </div> */}
            <div className='flex items-start w-full gap-8 pt-12'>
                <div className='w-[435px]'>
                    <SideBarMentorProfile />
                </div>
                <div className='min-w-[500px] flex-grow'>
                    <div className='mb-8'>
                        <div className='flex gap-4 justify-between'>
                            <CardTitleIcon
                                title='Số tiền đã thanh toán'
                                value={formatPriceVND(data.data?.totalPrice || 0)}
                                percent='0'
                                icon={<WalletIcon />}
                            />
                            <CardTitleIcon
                                title='Số câu hỏi đã hỏi'
                                value={data.data?.paginationInfo.total || 0}
                                percent='0'
                                icon={<DocumentIcon />}
                            />
                            <CardTitleIcon
                                title='Số câu hỏi được trả lời'
                                value={
                                    data.data?.data.filter(
                                        (item) => item.status === FilterQuestionType.COMPLETED,
                                    )?.length || 0
                                }
                                percent='0'
                                icon={<GlobeIcon />}
                            />
                        </div>
                    </div>
                    <HistoryQuestion
                        data={data.data?.data || []}
                        pagination={data.data?.paginationInfo || initialPaging}
                        loading={data.isFetching}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}
