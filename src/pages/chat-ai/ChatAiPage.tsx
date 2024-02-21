import { RightOutlined } from '@ant-design/icons';
import Chat from './components/Chat';
import SideBarChat from './components/SideBarChat';

export default function ChatAiPage() {
    return (
        <div className='pack-layout pb-16 px-4'>
            <div className='h-[69px] flex items-center gap-4 text-sm font-bold text-primary-800'>
                <span>Trang chủ</span>
                <RightOutlined />
                <span>Giải đáp</span>
                <RightOutlined />
                <span className='text-black-800'>Trả lời bằng AI</span>
            </div>
            <div className='flex items-start w-full gap-8'>
                <div className='w-[435px]'>
                    <SideBarChat />
                </div>
                <div className='w-full min-w-[500px]'>
                    <Chat />
                </div>
            </div>
        </div>
    );
}
