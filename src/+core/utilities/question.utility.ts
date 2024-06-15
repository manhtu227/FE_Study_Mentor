import { QuestionType } from '@core/enums/question.enum';

export function handleDetechQuestionType(type: QuestionType) {
    switch (type) {
        case QuestionType.MEETING:
            return 'Thông qua Google Meet';
        case QuestionType.FILE:
            return 'Thông qua file';
        default:
            return '';
    }
}
