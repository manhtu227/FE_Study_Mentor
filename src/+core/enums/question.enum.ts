export enum QuestionType {
    MEETING = 0,
    FILE = 1,
}
import { OptionItems } from '@core/types/option.type';

export enum QuestionStatus {
    PENDING = 'PENDING',
    NEW = 'NEW',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    ANSWERED = 'ANSWERED',
    EXPIRED = 'EXPIRED',
    DONE = 'DONE',
}

export enum QuestionStatusForTutor {
    PENDING = 'PENDING',
    NEW = 'NEW',
}

export const optionQuestionStatus: OptionItems = [
    {
        label: 'Tất cả',
        value: null,
    },
    {
        label: 'Chờ xác nhận',
        value: QuestionStatus.PENDING,
    },
    {
        label: 'Mới',
        value: QuestionStatus.NEW,
    },
    {
        label: 'Đã chấp nhận',
        value: QuestionStatus.ACCEPTED,
    },
    {
        label: 'Đã từ chối',
        value: QuestionStatus.REJECTED,
    },
    {
        label: 'Đã trả lời',
        value: QuestionStatus.ANSWERED,
    },
    {
        label: 'Hết hạn',
        value: QuestionStatus.EXPIRED,
    },
    {
        label: 'Hoàn thành',
        value: QuestionStatus.DONE,
    },
];

export const optionQuestionStatusForTutor = [
    {
        label: 'Tất cả',
        value: null,
    },
    {
        label: 'Mới',
        value: QuestionStatusForTutor.NEW,
    },
    {
        label: 'Đang trả lời',
        value: QuestionStatusForTutor.PENDING,
    },
];

export enum QuestionStep {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
}

export enum QuestionAcceptStatus {
    AGREE = 1,
    DECLINE = 0,
}
