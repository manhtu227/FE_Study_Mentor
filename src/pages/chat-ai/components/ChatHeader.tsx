import { Avatar } from 'antd';
type Props = {
    name: string;
    avatar: string;
};
export default function ChatHeader({ name, avatar }: Props) {
    return (
        <div className='flex gap-4 pb-4 pack-border-b-primary-400'>
            <Avatar size={48} src={avatar} />
            <div>
                <h1 className='m-0 font-bold text-lg text-black-800'>{name}</h1>
                <span className='text-primary-600 font-bold text-sm'>Hoạt động</span>
            </div>
        </div>
    );
}
