import { usePostAiCodeMutation } from "@/store/ai";
import React, { ChangeEvent, useState } from "react";
import MessageFormUI from "../message-form-ui/MessageFormUI";

interface AiCodeProps {
  props: any;
  activeChat:any;
  onSubmit?: (form: FormData) => void;
}

interface FormData {
  attachments: { blob: string; file: string }[];
  created: string;
  sender_username: string;
  text: string;
  activeChatId: string;
}

const AiCode: React.FC<AiCodeProps> = ({ props, activeChat, onSubmit }) => {
  const [message, setMessage] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [triggerCode] = usePostAiCodeMutation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment
      ? [{ blob: URL.createObjectURL(attachment), file: attachment.name }]
      : [];
    const form: FormData = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    onSubmit && onSubmit(form);
    triggerCode(form);
    setMessage("");
    setAttachment(null);
  };

  return (
    <MessageFormUI
      setAttachment={(file: File) => setAttachment(file)}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AiCode;
