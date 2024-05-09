export type RoomModel = {
    roomId: string;
    Title: string;
    SenderId: string;
    RecipientId: string;
    createdAt: string;
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
    questionId: string;
    senderId: string;
    contactId: string;
    value: string;
    files?: string[];
    createdAt: string;
};

export type ChatTitleModel = {
    id: string | number;
    name: string;
    data?: ChatModel[];
};
