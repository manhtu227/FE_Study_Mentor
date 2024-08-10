export enum NotificationType {
    NEW_QUESTION = 'new-question',
    COMPLETED_QUESTION = 'completed-question',
    STUDENT_PICK_TUTOR = 'student-pick-tutor',
    PAID_SUCCESS_FOR_TUTOR = 'paid-success-for-tutor',
    RECEIVE_GGMEET = 'receive-ggmeet',
    TUTOR_ACCEPTED_QUESTION = 'tutor-accepted-question',
    PICKED_TUTOR_ACCEPTED_QUESTION = 'picked-tutor-accepted-question',
    RECEIVE_INFO_GOOGLE_MEET = 'receive-info-google-meet',
    CANCEL_GGMEET = 'cancel-google-meet',
    SEND_VOUCHER = 'send-voucher',
}

export enum NotificationTitle {
    NEW_QUESTION = 'Câu hỏi mới',
    COMPLETED_QUESTION = 'Xác nhận hoàn thành câu hỏi',
    STUDENT_PICK_TUTOR = 'Học viên chọn bạn',
    PAID_SUCCESS_FOR_TUTOR = 'Thanh toán thành công',
    TUTOR_ACCEPTED_QUESTION = 'Người hướng dẫn chấp nhận câu hỏi',
    PICKED_TUTOR_ACCEPTED_QUESTION = 'Chọn người hướng dẫn thành công',
    RECEIVE_INFO_GOOGLE_MEET = 'Bạn có cuộc hẹn google meet',
    CANCEL_GGMEET = 'Cuộc hẹn google meet đã bị hủy',
    SEND_VOUCHER = 'Xin lỗi câu hỏi của bạn đã hết hạn, chúng tôi gửi cho bạn một mã giảm giá',
}
