import { QuestionType } from '@core/enums/question.enum';
import { handleDetechQuestionType } from '@core/utilities/question.utility';
import { Button } from 'antd';

const NewQuestionNotification = ({
    onClickNotification,
    onCloseNotification,
    subjectName,
    price,
    questionType,
}: {
    onClickNotification: () => void;
    onCloseNotification: () => void;
    subjectName: string;
    price: number;
    questionType: QuestionType;
}) => {
    return (
        <div>
            <div className='mb-5'>
                Bạn vừa mới nhận được câu hỏi mới từ chủ đề{' '}
                <span className='font-bold'>{subjectName}</span> với giá{' '}
                <span className='text-red-400'>{price} đồng</span>
            </div>
            <div>Loại câu hỏi: {handleDetechQuestionType(questionType)}</div>
            <div className='flex items-center gap-2'>
                <Button type='link' size='middle' onClick={onCloseNotification}>
                    Xem sau
                </Button>
                <Button type='primary' size='middle' onClick={onClickNotification}>
                    Xem ngay
                </Button>
            </div>
        </div>
    );
};

export default NewQuestionNotification;
