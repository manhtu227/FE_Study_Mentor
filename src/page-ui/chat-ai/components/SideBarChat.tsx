'use client';
import DeleteIcon from '@assets/icons/delete-icon';
import SearchIcon from '@assets/icons/search-icon';
import SideBarChatActive from '@assets/icons/sidebar-chat-active';
import SideBarChatDefault from '@assets/icons/sidebar-chat-default';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import CustomSkeletonParagraph from '@components/skeleton/CustomSkeletonParagraph';
import { CategoryAiEnum } from '@core/enums/ai.enum';
import { ChatModel } from '@core/models/chat.model';
import { chatAIRoomListKeys, getChatAIRoomListApi } from '@core/services/chat.service';
import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useEffect, useMemo } from 'react';

const more = [
    { icon: <DeleteIcon />, title: 'Xóa tất cả câu hỏi' },
    { icon: <DeleteIcon />, title: 'Chuyển chế độ tối' },
    { icon: <DeleteIcon />, title: 'Trợ giúp & FAQ' },
    { icon: <DeleteIcon />, title: 'Trợ giúp & FAQ' },
];

type SidebarChatProps = {
    onSetData: (dataChat: ChatModel[]) => void;
    categoryAi: CategoryAiEnum;
    mutateGetMessageByRoomId: UseMutationResult<
        AxiosResponse<ChatModel[], any>,
        Error,
        string,
        unknown
    >;
};

function SideBarChat({ onSetData, categoryAi, mutateGetMessageByRoomId }: SidebarChatProps) {
    // const [listTitle, setListTitle] = useState<RoomModel[]>([]);
    const { data } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeChat = useMemo(() => searchParams && searchParams.get('room'), [searchParams]);

    const listQuestion = useQuery({
        queryKey: chatAIRoomListKeys.list({
            userId: data?.user.user.id,
            categoryAi,
        }),
        queryFn: () => getChatAIRoomListApi(data!.user.user.id, categoryAi),
        select: (resp) => resp.data,
        enabled: !!data?.user.user.id,
    });

    useEffect(() => {
        if (listQuestion.data && listQuestion.data.length >= 1) {
            upParams(listQuestion.data[0].roomId);
            mutateGetMessageByRoomId.mutate(listQuestion.data[0].roomId);
        }
    }, [listQuestion.data, mutateGetMessageByRoomId.mutate]);

    /* Handle */
    const handleAddNewQuestion = () => {
        onSetData([]);
        const newParams = new URLSearchParams(searchParams || '');
        newParams.delete('room');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    const handleSelectRoom = (roomId: string) => {
        upParams(roomId);
        mutateGetMessageByRoomId.mutate(roomId);
    };

    const upParams = (roomId: string) => {
        const newParams = new URLSearchParams(searchParams || '');
        newParams.set('room', roomId);
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className='w-full bg-white-900 rounded-lg'>
            <div className='p-6 flex flex-col gap-8'>
                <div className='flex justify-between'>
                    <div className='text-black-800 text-lg font-bold flex items-center'>
                        Đoạn chat
                        <div className='w-8 h-6 rounded-full bg-white-800 ml-4 text-center text-sm'>
                            {(listQuestion.data || []).length}
                        </div>
                    </div>
                    <ButtonPrimary
                        title='Thêm câu hỏi'
                        className='rounded-full !w-[45%] h-[39px]'
                        onClick={handleAddNewQuestion}
                    />
                </div>
                <CustomTextInput placeholder='Vui lòng nhập' prefix={<SearchIcon />} />
                <div className='max-h-[368px] overflow-auto'>
                    {listQuestion.isPending ? (
                        <CustomSkeletonParagraph rows={5} gap={4} height={5 * 50} />
                    ) : (
                        <div className='flex flex-col gap-4 animate__animated animate__fadeIn'>
                            {(listQuestion.data || []).map((item) => (
                                <SidebarChatItem
                                    key={item.roomId}
                                    active={activeChat === item.roomId}
                                    title={item.title}
                                    onClick={() => {
                                        handleSelectRoom(item.roomId);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/* <div className='pack-border-t-primary-400'>
                    {more.map((item, index) => (
                        <div
                            key={index}
                            className='flex items-center px-3 h-12 gap-2 text-base text-primary-900 font-bold hover:bg-white-800 cursor-pointer rounded-lg'
                        >
                            {item.icon}
                            {item.title}
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

export default memo(SideBarChat);

type SidebarChatItemProps = {
    active?: boolean;
    title: string;
    onClick?: () => void;
};

function SidebarChatItem({ active, title, onClick }: SidebarChatItemProps) {
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
            <span className='text-base truncate max-w-[272px]'>{title} </span>
        </div>
    );
}
