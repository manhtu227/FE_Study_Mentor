const CompletedQuestionNotification = ({
    subjectName,
    price,
    questionName,
}: {
    questionName: string;
    subjectName: string;
    price: number;
}) => (
    <div>
        <div className='mb-5'>
            <div>Câu hỏi đã được học viên xác nhận hoàn thành</div>
            <div>
                Chủ đề: <span className='font-bold'>{subjectName}</span>
            </div>
            <div>
                Nội dung: <span className='font-bold'>{questionName}</span>
            </div>
            <div>
                Giá: <span className='font-bold'>{price}</span>
            </div>
        </div>
        Bạn sẽ nhận được tiền sau 24 giờ kể từ thời điểm câu hỏi được xác nhận hoàn thành. Cảm ơn
    </div>
);

export default CompletedQuestionNotification;
