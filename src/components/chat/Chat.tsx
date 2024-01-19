import dynamic from "next/dynamic";
import { useMultiChatLogic } from "react-chat-engine-advanced";
import "./Chat.scss";
import AiCode from "./aI-code/AiCode";
import AiAssist from "./ai-assist/AiAssist";
import Ai from "./ai/Ai";
import CustomerHeader from "./header/CustomHeader";
import StandardMessageForm from "./standard-message-form/StandardMessageForm";

const MultiChatSocket = dynamic(() =>
  import("react-chat-engine-advanced").then((module) => module.MultiChatSocket),{
    ssr:false
  }
);
const MultiChatWindow = dynamic(() =>
  import("react-chat-engine-advanced").then((module) => module.MultiChatWindow),
  {
    ssr:false
  }
);

const Chat = () => {
  const projectId = process.env.VITE_PROJECT_ID || "";
  const chatProps = useMultiChatLogic(projectId, "test-user-1", "1234")

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <CustomerHeader chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }

          if (chatProps.chat?.title.startsWith("AiCode_")) {
            return <AiCode props={props} activeChat={chatProps.chat} />;
          }
          
          if (chatProps.chat?.title.startsWith("AiAssist_")) {
            return <AiAssist props={props} activeChat={chatProps.chat} />;
          }

          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
}

export default Chat