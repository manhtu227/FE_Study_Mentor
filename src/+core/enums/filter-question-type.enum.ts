export enum FilterQuestionType {
    ALL = 'Tất cả',
    COMPLETED = 'Hoàn tất',
    NOT_COMPLETED = 'Chưa hoàn tất',
    CANCELED = 'Đã hủy',
}

export const filterQuestionOptions = Object.values(FilterQuestionType).map((e) => {
    return {
        label: e,
        value: e,
    };
});
