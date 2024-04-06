import SideBarChatActive from '@assets/icons/sidebar-chat-active';
import SideBarChatDefault from '@assets/icons/sidebar-chat-default';
import clsx from 'clsx';

type SidebarChatItemProps = {
    active?: boolean;
    title: string;
    onClick?: () => void;
};

export function SidebarChatItem({ active, title, onClick }: SidebarChatItemProps) {
    return (
        <div
            className={clsx(
                'flex items-center gap-2 h-12 rounded-lg px-4 mr-4',
                active
                    ? 'bg-primary-800 text-white-800'
                    : 'bg-transparent text-primary-900 hover:bg-white-800 cursor-pointer',
            )}
            onClick={onClick}
        >
            {active ? <SideBarChatActive /> : <SideBarChatDefault />}
            <span className='text-base truncate'>{title} </span>
        </div>
    );
}
