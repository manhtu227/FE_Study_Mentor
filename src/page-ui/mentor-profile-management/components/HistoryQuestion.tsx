import { MoreOutlined } from '@ant-design/icons';
import ModalDetailedQuestion from '@components/modal/ModalDetailedQuestion';
import { DATE_FORMAT } from '@core/constants/commons.constant';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { FilterQuestionType } from '@core/enums/filter-question-type.enum';
import { usePagingFilter } from '@core/hooks/usePagingFilter';
import { FileReq } from '@core/models/file.model';
import { QuestionAnsweredItem } from '@core/models/user.model';
import {
    getListAnsweredQuestionsApi,
    getListAnsweredQuestionsKeys,
} from '@core/services/user.service';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { imageUtility } from '@core/utilities/image.utility';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Avatar, Dropdown, Empty, Image, Skeleton, Table } from 'antd';
import { TableProps } from 'antd/lib';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export type HistoryQuestionTable = {
    key: string;
    avatar?: FileReq;
    name: string;
    email: string;
    expense: number;
    status: number;
    date: string;
    isPaid: boolean;
};

export const statusActiveColors = {
    [FilterQuestionType.ALL]: (
        <div className='text-white-900 py-2 px-3 font-bold text-sm bg-primary-600 w-fit rounded-lg'>
            {FilterQuestionType.COMPLETED}
        </div>
    ),
    [FilterQuestionType.COMPLETED]: (
        <div className='text-white-900 py-2 px-3 font-bold text-sm bg-primary-600 w-fit rounded-lg'>
            {FilterQuestionType.COMPLETED}
        </div>
    ),
    [FilterQuestionType.NOT_COMPLETED]: (
        <label className='text-white-900 py-2 px-3 font-bold text-sm bg-orange-900 w-fit rounded-lg'>
            {FilterQuestionType.NOT_COMPLETED}
        </label>
    ),
    [FilterQuestionType.CANCELED]: (
        <label className='text-white-900 py-2 px-3 font-bold text-sm bg-red-900 w-fit rounded-lg'>
            {FilterQuestionType.CANCELED}
        </label>
    ),
};

export function HistoryQuestion() {
    const [currentQuestionId, setCurrentQuestionId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const columns: TableProps<HistoryQuestionTable>['columns'] = [
        {
            title: 'Tên học viên',
            dataIndex: 'name',
            render: (value, record) => {
                return (
                    <div className='flex items-center gap-4'>
                        <div className='w-[44px] h-[44px]'>
                            {record?.avatar && (
                                <Avatar
                                    size={44}
                                    icon={
                                        <Image
                                            alt={'Avatar'}
                                            loading='lazy'
                                            src={imageUtility(record?.avatar.fileKey)}
                                        />
                                    }
                                />
                            )}
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold text-sm text-black-800'>{value}</span>
                            <span className='font-normal text-sm text-gray-400'>
                                {record.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Chi phí',
            dataIndex: 'expense',
            render: (value, record) => (
                <div className='font-normal text-sm flex flex-col'>
                    <span className='text-primary-800 font-bold text-sm'>{record.expense}</span>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isPaid',
            render: (value, record) => {
                return <div>{record.isPaid ? 'Đã được thanh toán' : 'Chưa được thanh toán'}</div>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <div className='flex flex-col bg-white-900 rounded-md'>
                            <div
                                className='flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-200'
                                onClick={() => {
                                    setCurrentQuestionId(record.key);
                                    setShowModal(true);
                                }}
                            >
                                <span className='text-black-800'>Xem chi tiết</span>
                            </div>
                            <div
                                className='flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-200'
                                onClick={() => {
                                    router.push(`${MY_ROUTE.REPORT_QUESTION}/${record.key}`);
                                }}
                            >
                                <span className='text-black-800'>Báo cáo câu hỏi này</span>
                            </div>
                        </div>
                    }
                >
                    <MoreOutlined className='text-black-800 cursor-pointer' />
                </Dropdown>
            ),
        },
    ];
    // const [filter, setFilter] = useState(FilterQuestionType.ALL);
    const [data, setData] = useState<HistoryQuestionTable[]>([]);

    const searchParams = useSearchParams();

    const { initialPaging } = useMemo(() => {
        const initialPaging: IPaginationInfo = {
            pageSize: +(searchParams?.get('pageSize') || initialPagingState.pageSize),
            page: +(searchParams?.get('page') || initialPagingState.page),
        };
        return {
            initialPaging,
        };
    }, [searchParams]);

    const { handlePageChange, filter } = usePagingFilter({
        initialPaging,
    });

    const getListAnsweredQuestionsQuery = useQuery({
        queryKey: getListAnsweredQuestionsKeys.list(filter),
        queryFn: () => getListAnsweredQuestionsApi(filter),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (getListAnsweredQuestionsQuery?.data?.data?.data) {
            const data = getListAnsweredQuestionsQuery.data.data.data;

            const newData: HistoryQuestionTable[] = data.map((e: QuestionAnsweredItem) => {
                return {
                    key: e.questionId,
                    avatar: e?.avatar,
                    name: e.name,
                    email: e.email,
                    expense: e.expense,
                    status: e.status,
                    date: format(new Date(e.createdAt), DATE_FORMAT).toString(),
                    isPaid: e.isPaid,
                };
            });

            setData(newData);
        }
    }, [getListAnsweredQuestionsQuery?.data?.data?.data]);

    return (
        <div className='bg-white-900 p-8 flex flex-col gap-8 rounded-md'>
            {showModal && (
                <ModalDetailedQuestion
                    currentQuestionId={currentQuestionId}
                    isModalOpen={showModal}
                    setIsModalOpen={setShowModal}
                />
            )}
            <span className='font-bold text-lg'>Lịch sử câu hỏi đã trả lời</span>
            <Table
                columns={columns}
                dataSource={data}
                //centered pagination
                pagination={{
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                    pageSize:
                        getListAnsweredQuestionsQuery?.data?.data.paginationInfo.pageSize ??
                        initialPaging.pageSize,
                    size: 'small',
                    total: getListAnsweredQuestionsQuery?.data?.data.paginationInfo.total ?? 0,
                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange(page, pageSize) {
                        handlePageChange({ page, pageSize });
                    },
                }}
                locale={{
                    emptyText: getListAnsweredQuestionsQuery.isFetching ? (
                        [1, 2, 3, 4, 5].map((u) => (
                            <Skeleton.Input
                                className='!h-[50px] !w-full mt-2'
                                active={true}
                                key={u}
                            />
                        ))
                    ) : (
                        <Empty />
                    ),
                }}
            />
        </div>
    );
}
