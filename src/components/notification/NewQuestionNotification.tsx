import { QuestionType } from '@core/enums/question.enum';
import { handleDetechQuestionType } from '@core/utilities/question.utility';

const NewQuestionNotification = ({
    subjectName,
    price,
    questionType,
    title,
}: {
    subjectName: string;
    price: number;
    questionType: QuestionType;
    title?: string;
}) => {
    return (
        <div>
            <div className='mb-5'>
                Bạn vừa mới nhận được câu hỏi mới từ chủ đề{' '}
                <span className='font-bold'>{subjectName}</span> với giá{' '}
                <span className='text-red-400'>{price} đồng</span>
            </div>
            <div>Tiêu đề: {title}</div>
            <div>Loại câu hỏi: {handleDetechQuestionType(questionType)}</div>
        </div>
    );
};

export default NewQuestionNotification;
