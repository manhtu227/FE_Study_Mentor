import { initialPagingState, PagingReq } from '@core/types/paging.type';
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
    onPageNumberChange?: ({ page, limit }: PagingReq) => void;
}) => {
    const handlePageChange = (page: number, limit: number) => {
        onPageNumberChange && onPageNumberChange({ page, limit });
    };

    return (
        <div className='py-8 flex justify-center'>
            <Pagination
                defaultCurrent={1}
                total={total}
                className='py-8 flex justify-center'
                onChange={handlePageChange}
                pageSize={pageSize || initialPagingState.limit}
                current={current || initialPagingState.page}
            />
        </div>
    );
};
