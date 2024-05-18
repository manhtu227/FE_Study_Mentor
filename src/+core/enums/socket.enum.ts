export enum SocketEvent {
    DISCONNECT = 'disconnect',
    SEND_MESSAGE = 'send-message',
    CREATE_CHAT = 'create-chat',
    RECEIVE_MESSAGE = 'receive-message',
    QUESTION = 'question',
    ACCEPT = 'accept',
    SEND_NOTIFICATION = 'send-notification',
    TUTORS_AVAILABLE = 'tutors-available',
    TUTORS_FAVORITE = 'tutors-favorite',
    NOTIFICATION = 'notification',
    GET_TUTORS_AVAILABLE = 'get-tutors-available',
    GET_TUTORS_FAVORITE = 'get-tutors-favorite',
    ERROR = 'error',
    RECEIVE_NEW_QUESTION = 'new-question',
}

export const SOCKET_QUESTION_EMIT = (topic: string) => `question-${topic}`;
