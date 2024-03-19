export type PagingReq = {
    limit: number;
    page: number;
};

export const initialPagingState: PagingReq = {
    limit: 10,
    page: 1,
};

export type PagingResp<T> = {
    data: T;
    totalPages: number;
    currentPage: number;
};
