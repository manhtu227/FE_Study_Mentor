'use client';
import { DATE_FORMAT } from '@core/constants/commons.constant';
import { usePagingFilter } from '@core/hooks/usePagingFilter';
import { QuestionReportRes } from '@core/models/question.model';
import { UserRole } from '@core/models/user.model';
import {
    getQuestionReportApi,
    getQuestionReportKeys,
    getQuestionStudentReportApi,
    getQuestionStudentReportKeys,
} from '@core/services/questions.service';
import { IPaginationInfo, initialPagingState } from '@core/types/paging.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, Empty, Skeleton, Table } from 'antd';
import { TableProps } from 'antd/lib';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export type ReportTable = {
    key: string;
    questionTitle: string;
    studentName: string;
    date: string;
    questionId: string;
};

function Report() {
    const router = useRouter();
    const session = useSession();
    const columns: TableProps<ReportTable>['columns'] = [
        {
            title: 'Tiêu đề câu hỏi',
            dataIndex: 'questionTitle',
        },
        {
            title: 'Tên học viên',
            dataIndex: 'studentName',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'date',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => handleClickReport(record.key, record.questionId)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    const handleClickReport = (reportId: string, questionId: string) => {
        router.push(`/reports/${reportId}?questionId=${questionId}`);
    };

    const reportQuery = useQuery({
        queryKey:
            session.data?.user.user.role === UserRole.STUDENT
                ? getQuestionStudentReportKeys.all
                : getQuestionReportKeys.all,
        queryFn: () =>
            session.data?.user.user.role === UserRole.STUDENT
                ? getQuestionStudentReportApi()
                : getQuestionReportApi(),
        select: (data) => data?.data,
        placeholderData: keepPreviousData,
        enabled: !!session.data?.user.user.role,
    });

    const [data, setData] = useState<ReportTable[]>([]);

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

    useEffect(() => {
        if (reportQuery?.data?.data) {
            const data = reportQuery.data.data;

            const newData: ReportTable[] = data.map((e: QuestionReportRes) => {
                return {
                    key: e.id,
                    questionTitle: e.questionTitle,
                    studentName: e.studentName,
                    date: format(new Date(e.createdAt), DATE_FORMAT).toString(),
                    questionId: e.questionId,
                };
            });

            setData(newData);
        }
    }, [reportQuery?.data]);

    return (
        <div className='w-full flex-col items-center justify-center'>
            <h3 className='text-2xl font-bold text-center'>Danh sách báo cáo của bạn</h3>
            <div className='flex items-center justify-center w-[800px] mx-auto'>
                <Table
                    className='w-full'
                    columns={columns}
                    dataSource={data}
                    //centered pagination
                    pagination={{
                        position: ['bottomCenter'],
                        showSizeChanger: false,
                        pageSize:
                            reportQuery?.data?.paginationInfo.pageSize ?? initialPaging.pageSize,
                        size: 'small',
                        total: reportQuery?.data?.paginationInfo.total ?? 0,
                        // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        onChange(page, pageSize) {
                            handlePageChange({ page, pageSize });
                        },
                    }}
                    locale={{
                        emptyText: reportQuery.isFetching ? (
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
        </div>
    );
}

export default Report;
