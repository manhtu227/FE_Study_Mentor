import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { FilterPaymentType, filterPaymentOptions } from '@core/enums/filter-payment-type.enum';
import { Avatar, Image, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import { useState } from 'react';

export type HistoryPaymentTable = {
    key: string;
    images: string;
    name: string;
    describe: string;
    price: string;
    status: FilterPaymentType;
    date: string;
};

export const statusActiveColors = {
    [FilterPaymentType.ALL]: (
        <div className='text-white-900 py-2 px-3 font-bold text-sm bg-primary-600 w-fit rounded-lg'>
            {FilterPaymentType.COMPLETED}
        </div>
    ),
    [FilterPaymentType.COMPLETED]: (
        <div className='text-white-900 py-2 px-3 font-bold text-sm bg-primary-600 w-fit rounded-lg'>
            {FilterPaymentType.COMPLETED}
        </div>
    ),
    [FilterPaymentType.NOT_COMPLETED]: (
        <label className='text-white-900 py-2 px-3 font-bold text-sm bg-orange-900 w-fit rounded-lg'>
            {FilterPaymentType.NOT_COMPLETED}
        </label>
    ),
    [FilterPaymentType.CANCELED]: (
        <label className='text-white-900 py-2 px-3 font-bold text-sm bg-red-900 w-fit rounded-lg'>
            {FilterPaymentType.CANCELED}
        </label>
    ),
};

const columns: ColumnsType<HistoryPaymentTable> = [
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
                        <span className='font-normal text-sm text-gray-400'>{record.describe}</span>
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
                <span className='text-primary-800 font-bold text-sm'>120 Xu</span>
            </div>
        ),
    },
    {
        dataIndex: 'status',
        render: (text: FilterPaymentType) => {
            return statusActiveColors[text];
        },
    },
    { dataIndex: 'date' },
];

const data: HistoryPaymentTable[] = [
    {
        key: '1',
        images: 'https://via.placeholder.com/150',
        name: 'Lập trình web cơ bản',
        describe: 'Let me know if you need any help',
        price: '120',
        status: FilterPaymentType.COMPLETED,
        date: '20/10/2021',
    },
    {
        key: '2',
        images: 'https://via.placeholder.com/150',
        name: 'Lập trình web cơ bản',
        describe: 'Let me know if you need any help',
        price: '120',
        status: FilterPaymentType.NOT_COMPLETED,
        date: '20/10/2021',
    },
    {
        key: '3',
        images: 'https://via.placeholder.com/150',
        name: 'Lập trình web cơ bản',
        describe: 'Let me know if you need any help',
        price: '120',
        status: FilterPaymentType.CANCELED,
        date: '20/10/2021',
    },
];

export function HistoryPayment() {
    const [filter, setFilter] = useState(FilterPaymentType.ALL);
    return (
        <div className='bg-white-900 p-8 flex flex-col gap-8 rounded-md'>
            <span className='font-bold text-lg'>Lịch sử thanh toán</span>
            <div className='flex justify-between items-center'>
                <CustomSelectInput
                    classNameForm='w-[167px]'
                    optionsSelect={[]}
                    placeholder='Sắp xếp theo'
                    classNameSelect='placeholder-color'
                />

                <div className='flex gap-4'>
                    {filterPaymentOptions.map((e, i) => (
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
                <CustomSelectInput
                    classNameForm='w-[131px] '
                    optionsSelect={[]}
                    placeholder='Bộ lọc'
                    classNameSelect='placeholder-color '
                />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                showHeader={false}
                //centered pagination
                pagination={{
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                    pageSize: 5,
                    size: 'small',
                    total: 50,
                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
            />
        </div>
    );
}
