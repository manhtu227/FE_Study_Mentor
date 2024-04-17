import { initialPagingState, IPaginationInfo } from '@core/types/paging.type';
import { Pagination } from 'antd';

export const PaginationCore = ({
    total,
    pageSize,
    current,
    onPageNumberChange,
}: {
    total?: number;
    pageSize?: number;
    current?: number;
    onPageNumberChange?: ({ page, pageSize }: IPaginationInfo) => void;
}) => {
    const handlePageChange = (page: number, pageSize: number) => {
        onPageNumberChange && onPageNumberChange({ page, pageSize });
    };

    return (
        <div className='py-8 flex justify-center'>
            <Pagination
                defaultCurrent={1}
                total={total}
                className='py-8 flex justify-center'
                onChange={handlePageChange}
                pageSize={pageSize || initialPagingState.pageSize}
                current={current || initialPagingState.page}
            />
        </div>
    );
};
