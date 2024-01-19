import { StandardMessageFormProps } from "@core/models/chat.model";
import React, { useState } from "react";
import MessageFormUI from "../message-form-ui/MessageFormUI";

const StandardMessageForm: React.FC<StandardMessageFormProps> = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    setMessage("");
    setAttachment(new File([""], ""));
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default StandardMessageForm;