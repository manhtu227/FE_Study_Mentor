import { CategoryAiEnum } from '@core/enums/ai.enum';
import { apiAi } from '@core/https/http-ai';
import { ChatModel, RoomModel, RoomReq } from '@core/models/chat.model';
import { FileReq } from '@core/models/file.model';
import { initKeys } from '@core/utilities/query-key.utility';
export const idAi = {
    [CategoryAiEnum.CHAT_GPT]: process.env.NEXT_PUBLIC_ID_CHAT_CHATGPT,
    [CategoryAiEnum.GEMINI]: process.env.NEXT_PUBLIC_ID_CHAT_GEMINI,
    [CategoryAiEnum.SYSTEM]: process.env.NEXT_PUBLIC_ID_CHAT_CHATBOT,
};

export const chatAIRoomListKeys = initKeys('chatAIRoomList');
export const getChatAIRoomListApi = async (userId: string, categoryAi: CategoryAiEnum) => {
    return apiAi.get<RoomModel[]>(`/ai/listRoom/${userId}/${idAi[categoryAi]}`);
};

export const getDetailMessageChatAiApi = (roomId: string) => {
    return apiAi.get<ChatModel[]>(`/ai/listQuestion/${roomId}`);
};

export const createRoomIdApi = (userId: string, categoryAi: CategoryAiEnum, body: RoomReq) => {
    return apiAi.post<{ RoomId: string }>(`/ai/CreateRoom/${userId}/${idAi[categoryAi]}`, body);
};

export type ChatWithAiReq = {
    question: string;
    roomId: string;
    files?: FileReq[] | null;
};

export type ChatWithAiResp = {
    response: string;
};
export const chatWithAiApi = (
    userId: string,
    categoryAi: CategoryAiEnum,
    request: ChatWithAiReq,
) => {
    return apiAi.post<ChatModel>(`/ai/chatAI`, {
        content: request.question,
        senderId: userId,
        roomId: request.roomId,
        recipientId: idAi[categoryAi],
        files: request.files,
    } as ChatModel);
};
