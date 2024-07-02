type IProps = {
    title: string;
    subjectName: string;
    price: number;
    studentName?: string;
    isCompleted: boolean;
};

const CompletedQuestionNotification = ({
    subjectName,
    price,
    title,
    studentName,
    isCompleted,
}: IProps) => {
    const toastTitle = isCompleted
        ? `Câu hỏi đã được học viên ${studentName} xác nhận hoàn thành`
        : `Admin đã thanh toán thành công cho câu hỏi`;
    const toastFooter = isCompleted
        ? `Bạn sẽ nhận được tiền sau 24 giờ kể từ thời điểm câu hỏi được xác nhận hoàn thành. Cảm
            ơn`
        : `Cảm ơn bạn đã đồng hành cùng chúng tôi. Bạn đã nhận được ${price} VNĐ từ câu hỏi này.`;
    return (
        <div>
            <div className='mb-5'>
                <div>{toastTitle}</div>
                <div>
                    Chủ đề: <span className='font-bold'>{subjectName}</span>
                </div>
                <div>
                    Tiêu đề: <span className='font-bold'>{title}</span>
                </div>
                <div>
                    Giá: <span className='font-bold'>{price}</span>
                </div>
            </div>
            {toastFooter}
        </div>
    );
};

export default CompletedQuestionNotification;
