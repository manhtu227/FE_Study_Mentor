export enum FilterQuestionType {
    ALL = 'Tất cả',
    COMPLETED = 'Hoàn thành',
    NOT_COMPLETED = 'Đang xử lý',
    CANCELED = 'Đã hủy',
}

export const filterQuestionOptions = Object.values(FilterQuestionType).map((e) => {
    return {
        label: e,
        value: e,
    };
});
