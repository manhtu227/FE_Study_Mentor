import { KeyboardEvent } from "react";

export interface MessageFormUIProps {
    setAttachment: (file: File) => void;
  message: string;
  handleChange: any; //temp
  handleSubmit: () => void;
  appendText?: string;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface AiAssistProps {
    props: any //temp
    activeChat: any //temp
    onSubmit?: (form: any) => void; //temp
  }

export interface AiCodeProps {
    props: any; //temp
    activeChat:any; //temp
    onSubmit?: (form: FormData) => void;
}

export interface FormData {
    attachments: { blob: string; file: string }[];
    created: string;
    sender_username: string;
    text: string;
    activeChatId: string;
}

export interface StandardMessageFormProps {
    props: any //temp
    activeChat: any //temp
  }