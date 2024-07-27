export enum SocketEvent {
    DISCONNECT = 'disconnect',
    SEND_MESSAGE = 'send-message',
    CREATE_CHAT = 'create-chat',
    RECEIVE_MESSAGE = 'receive-message',
    QUESTION = 'question',
    ACCEPT = 'accept',
    ACCEPT_PICKED = 'accept-picked',
    SEND_NOTIFICATION = 'send-notification',
    TUTORS_AVAILABLE = 'tutors-available',
    TUTORS_FAVORITE = 'tutors-favorite',
    NOTIFICATION = 'notification',
    GET_TUTORS_AVAILABLE = 'get-tutors-available',
    GET_TUTORS_FAVORITE = 'get-tutors-favorite',
    QUESTION_ACCEPTANCE_STATUS = 'question-acceptance-status',
    GET_VOUCHER = 'get-voucher',
    NEW_QUESTION = 'new-question',
    TUTOR_ACCEPTED_QUESTION = 'tutor-accepted-question',
    //FIND BY SYSTEM
    PICKED_TUTOR_ACCEPTED_QUESTION = 'picked-tutor-accepted-question',
    ANSWER = 'answer',
    STUDENT_PICK_TUTOR = 'student-pick-tutor',
    ERROR = 'error',
    CREATE_GGMEET = 'create-ggmeet',
    RECEIVE_GGMEET = 'receive-ggmeet',
    CANCEL_GGMEET = 'cancel-google-meet',
    COMPLETED_QUESTION = 'completed-question',
    PAID_SUCCESS_FOR_TUTOR = 'paid-success-for-tutor',
    SEND_INFO_GOOGLE_MEET = 'send-info-google-meet',
    RECEIVE_INFO_GOOGLE_MEET = 'receive-info-google-meet',
    CONFIRM_GOOGLE_MEET = 'confirm-google-meet',
}

export const SOCKET_QUESTION_EMIT = (topic: string) => `question-${topic}`;

export enum SocketMessage {
    QUESTION_ACCEPTANCE_FAILURE = 'question acceptance failure',
    QUESTION_ACCEPTANCE_SUCCESS = 'question acceptance success',
}
