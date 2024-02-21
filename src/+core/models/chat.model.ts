import { KeyboardEvent } from 'react';

export type MessageFormUIProps = {
    setAttachment: (file: File) => void;
    message: string;
    handleChange: any; //temp
    handleSubmit: () => void;
    appendText?: string;
    handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export type chatModel = {
    id: string;
    chatId: string;
    contactId: string;
    value: string;
    createdAt: string;
};

export type AiAssistProps = {
    props: any; //temp
    activeChat: any; //temp
    onSubmit?: (form: any) => void; //temp
};

export type AiCodeProps = {
    props: any; //temp
    activeChat: any; //temp
    onSubmit?: (form: FormData) => void;
};

export type FormData = {
    attachments: { blob: string; file: string }[];
    created: string;
    sender_username: string;
    text: string;
    activeChatId: string;
};

export interface StandardMessageFormProps {
    props: any; //temp
    activeChat: any; //temp
}
