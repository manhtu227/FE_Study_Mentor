export type ChatModel = {
    id: string;
    chatId: string;
    contactId: string;
    value: string;
    createdAt: string;
};

export type ChatTitleModel = {
    id: string | number;
    name: string;
    data?: ChatModel[];
};
