'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatAiPage, { AIFreeOrPaidEnum } from '../../../page-ui/chat-ai/ChatAiPage';

export default function ChatAi() {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (!session.data) return;
        if (!session.data.user.user.isMembership) {
            router.back();
        }
    }, [session.data]);

    return (
        <div className='bg-white-800'>
            <ChatAiPage type={AIFreeOrPaidEnum.PAID} />
            <div className='fixed bottom-0 right-0 left-0 top-0 bg-white-800 -z-10'></div>
        </div>
    );
}
