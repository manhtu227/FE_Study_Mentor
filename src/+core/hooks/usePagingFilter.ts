import { removeEmptyParams } from '@core/helpers/remove-params.helper';
import { initialPagingState, PagingReq } from '@core/types/paging.type';
import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useState } from 'react';

export type PagingFilterType<T> = {
    initialPaging?: PagingReq;
    initialFilter?: T;
    debounceTime?: number;
    searchParamDefault?: string[];
};

export function usePagingFilter<T extends object>({
    initialPaging = initialPagingState,
    initialFilter,
    debounceTime = 0,
    searchParamDefault,
}: PagingFilterType<T>) {
    const [filter, setFilter] = useState<T & PagingReq>({
        ...initialPaging,
        ...initialFilter,
    } as T & PagingReq);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // when filter change, update url by new filter
    const handleFilterChange = debounce((filter: T) => {
        // const k= removeEmptyParams(filter);
        setFilter((prev) => {
            const newFilter = { ...prev, ...filter, page: 1 };
            return newFilter;
        });
    }, debounceTime);

    // when paging change, update url by new paging
    const handlePageChange = (paging: { page?: number; limit?: number }) => {
        const newParams = { ...filter, ...paging };
        setFilter(newParams);
    };

    const resetFilterPaging = (obj?: any) => {
        setFilter({
            page: initialPaging.page,
            limit: initialPaging.limit,
            ...obj,
        } as any);
    };

    useEffect(() => {
        const newParams = new URLSearchParams();
        if (searchParams) {
            for (const key of searchParamDefault || []) {
                const keep = searchParams.get(key);
                if (keep) {
                    newParams.set(key, keep);
                }
            }
        }
        router.push(
            `${pathname}?${queryString.stringify({
                ...removeEmptyParams<T & PagingReq>(filter),
            })}&${newParams.toString()}`,
        );
    }, [filter]);

    return {
        filter,
        handleFilterChange,
        handlePageChange,
        resetFilterPaging,
    };
}
