import { FileReq } from './file.model';
import { QuestionResp } from './question.model';

export type RoomModel = {
    roomId: string;
    title: string;
    senderId: string;
    recipientId: string;
    createdAt: string;
    avatar?: string;
    question?: QuestionResp;
};

export type RoomReq = { TitleRoom: string };

/*
{

'questionId': string,

'senderId': string,

'contactId': string,

'value': string,

'createdAt': string

}
*/

export type ChatModel = {
    questionId?: string;
    senderId: string;
    recipientId: string;
    roomId?: string;
    content: string;
    files?: FileReq[] | null;
    createdAt?: string;
};

export type ChatTitleModel = {
    id: string | number;
    name: string;
    data?: ChatModel[];
};
