import BookmarkIcon from '@assets/icons/bookmark-icon';
import images from '@assets/images';
import { Avatar, Button, Image, Tag } from 'antd';

export function CardQuestion() {
    return (
        <div className='max-w-[435px] border-solid border-[1px] border-[#DEE0E2] rounded-lg relative'>
            <div className='absolute right-1 top-0'>
                <BookmarkIcon number='120' />
            </div>
            <div className='p-4'>
                <div className='flex items-center gap-2 '>
                    <Avatar size={44} icon={<Image src={images.charac1.src} />} />
                    <div className='flex flex-col'>
                        <span className='text-[18px] leading-[27px] font-bold'>Nguyễn Hưng</span>
                        <span className='text-[14px] leading-[21px] font-normal text-[#838B8F]'>
                            #123123123
                        </span>
                    </div>
                </div>
                <div className='text-base line-clamp-3 mt-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className='flex mt-[10px] gap-2 flex-wrap'>
                    <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                        This is tag
                    </Tag>
                    <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                        This is tag
                    </Tag>
                    <Tag className='px-3 py-2 bg-white-900 rounded-md text-[14px] leading-[21px]'>
                        This is tag
                    </Tag>
                </div>
            </div>
            <Button className='w-full rounded-none h-[57px] bg-[#3D64EE] text-white-900 font-bold border-0 rounded-b-lg'>
                Xem câu hỏi
            </Button>
        </div>
    );
}
