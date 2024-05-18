'use client';
import ChatAiPage, { AIFreeOrPaidEnum } from '../../../pages/chat-ai/ChatAiPage';

export default function ChatAi() {
    return (
        <div className='bg-white-800'>
            <ChatAiPage type={AIFreeOrPaidEnum.FREE} />
            <div className='fixed bottom-0 right-0 left-0 top-0 bg-white-800 -z-10'></div>
        </div>
    );
}
