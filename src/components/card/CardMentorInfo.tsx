import { StarFilled } from '@ant-design/icons';
import images from '@assets/images';
import { Image, Tag } from 'antd';

export function CardMentorInfo() {
    return (
        <div className='w-full border-solid bg-white border-[1px] rounded-lg border-[#D9D9D9]'>
            <div className='p-4'>
                <div className='flex items-start gap-4'>
                    <div className='w-[100px] h-[100px]'>
                        <Image
                            src={images.charac1.src}
                            className='object-cover'
                            width={100}
                            height={100}
                            preview={false}
                        />
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex items-center justify-between'>
                            <span className='text-lg font-bold items-start'>Nguyễn Hưng</span>
                            <span className='text-sm font-bold text-[#838B8F] '>| Tuổi 23</span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                            <StarFilled className='text-[#f2c94c]' />
                        </div>
                        <div>
                            <Tag className='p-2 bg-white rounded-md items-center text-sm mt-4 w-[81px]'>
                                This is tag
                            </Tag>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
