import {
    PaperAirplaneIcon,
    PaperClipIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { KeyboardEvent, useState } from "react";
import Dropzone from "react-dropzone";

interface MessageFormUIProps {
  setAttachment: (file: File) => void;
  message: string;
  handleChange: any;
  handleSubmit: () => void;
  appendText?: string;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const MessageFormUI: React.FC<MessageFormUIProps> = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  const [preview, setPreview] = useState<string>("");

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            alt="message-form-preview"
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment(new File([""], ""));
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
          {appendText && (
            <input
              className="message-form-assist"
              type="text"
              disabled
              value={`${message} ${appendText}`}
            />
          )}
        </div>
        <div className="message-form-icons">
          <Dropzone
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUI;