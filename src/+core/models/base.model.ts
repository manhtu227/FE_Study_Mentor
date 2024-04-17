export type BaseResp<T> = {
    success: boolean;
    message: string;
    data: T;
};
