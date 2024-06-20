import { PaginationCore } from '@components/pagination/pagination';
import {
    FilterQuestionType,
    convertQuestionFilter,
    filterQuestionOptions,
} from '@core/enums/filter-question-type.enum';
import { GetQuestionResponseModel } from '@core/models/question.model';
import { IPaginationInfo } from '@core/types/paging.type';
import { formatPriceVND } from '@core/utilities/caculate-price.utility';
import { imageUtility } from '@core/utilities/image.utility';
import { Avatar, Image, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import { useState } from 'react';

export type HistoryQuestionTable = {
    key: string;
    images: string;
    name: string;
    email: string;
    price: string;
    status: FilterQuestionType;
    date: string;
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

const columns: ColumnsType<HistoryQuestionTable> = [
    {
        dataIndex: 'name',
        render: (value, record) => {
            return (
                <div className='flex items-center gap-4'>
                    <div className='w-[44px] h-[44px]'>
                        <Avatar
                            size={44}
                            icon={
                                <Image
                                    alt={'image of question'}
                                    loading='lazy'
                                    src={record.images}
                                />
                            }
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold text-sm text-black-800'>{value}</span>
                        <span className='font-normal text-sm text-gray-400'>{record.email}</span>
                    </div>
                </div>
            );
        },
    },
    {
        dataIndex: 'price',
        render: (value) => (
            <div className='font-normal text-sm flex flex-col'>
                {value}
                <span className='text-primary-800 font-bold text-sm'>{formatPriceVND(value)}</span>
            </div>
        ),
    },
    {
        dataIndex: 'status',
        render: (text: FilterQuestionType) => {
            return statusActiveColors[text];
        },
    },
    { dataIndex: 'date' },
];

export function convertQuestionToTabel(r: GetQuestionResponseModel): HistoryQuestionTable {
    return {
        key: r.questionId,
        images: imageUtility(r.tutor?.avatar?.fileKey),
        name: r.subject.name,
        email: r.title || '',
        price: r.price,
        status: convertQuestionFilter(r.status),
        date: r.createdAt,
    };
}

type Props = {
    data: HistoryQuestionTable[];
    pagination: IPaginationInfo;
    loading?: boolean;
    handlePageChange?: any;
};

export function HistoryQuestion({ data, pagination, loading, handlePageChange }: Props) {
    const [filter, setFilter] = useState(FilterQuestionType.ALL);
    return (
        <div className='bg-white-900 p-8 flex flex-col gap-8 rounded-md'>
            <span className='font-bold text-lg'>Lịch sử câu hỏi</span>
            <div className='flex justify-between items-center'>
                {/* <CustomSelectInput
                    classNameForm='w-[167px] !m-0'
                    optionsSelect={[]}
                    placeholder='Sắp xếp theo'
                    classNameSelect='placeholder-color'
                /> */}

                <div className='flex gap-4'>
                    {filterQuestionOptions.map((e, i) => (
                        <div
                            key={i}
                            onClick={() => setFilter(e.value)}
                            className={clsx(
                                'font-bold text-[15px] px-[20px] py-2 h-fit rounded-lg cursor-pointer transition-all duration-300 ease-in-out',
                                filter === e.value
                                    ? 'bg-primary-800 text-white-900'
                                    : 'bg-white-900 text-black-800 hover:text-primary-800',
                            )}
                        >
                            {e.label}
                        </div>
                    ))}
                </div>
                {/* <CustomSelectInput
                    classNameForm='w-[131px] !m-0'
                    optionsSelect={[]}
                    placeholder='Bộ lọc'
                    classNameSelect='placeholder-color '
                /> */}
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    showHeader={false}
                    loading={loading}
                    pagination={false}
                    //centered pagination
                    // pagination={{
                    //     position: ['bottomCenter'],
                    //     showSizeChanger: false,
                    //     pageSize: pagination.pageSize,
                    //     size: 'small',
                    //     total: pagination.total,
                    //     // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    // }}
                />
                <PaginationCore
                    onPageNumberChange={handlePageChange}
                    pageSize={pagination.pageSize}
                    current={pagination.page}
                    total={pagination.total}
                />
            </div>
        </div>
    );
}
