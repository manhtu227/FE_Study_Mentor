import images from '@assets/images';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { Button } from 'antd';
import Link from 'next/link';

export default function ModalGGMeet() {
    return (
        <div className='w-[1200px] p-4 shadow-lg '>
            <h2 className='text-[18px] leading-[27px] text-center'>
                Trả lời thông qua cuộc gọi video
            </h2>
            <div className='w-[1089px] flex'>
                <form className='p-8'>
                    <div className='flex flex-row gap-8'>
                        <div>
                            <div className='mb-5'>
                                <p className='text-[16px] leading-6 font-bold mb-2 text-gray-900 dark:text-white'>
                                    Thời gian giải đáp
                                </p>
                                <CustomTextInput placeholder='Nhập số phút' />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Cấp độ câu hỏi
                                </p>
                                <CustomSelectInput placeholder='Chọn cấp độ' optionsSelect={[]} />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Lớp
                                </p>
                                <CustomSelectInput
                                    classNameForm=' w-[530px]'
                                    placeholder='Chọn lớ'
                                    optionsSelect={[]}
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Thời gian
                                </p>
                                <CustomTextInput placeholder='Nhập số phút' />
                            </div>
                        </div>
                    </div>
                    <Button className='flex items-center justify-center text-white bg-blue-700 text-[15px] leading-[22.5px] py-6 px-10'>
                        <span>Tìm kiếm người hướng dẫn</span>
                    </Button>
                </form>
                <div className='float-right mt-24 '>
                    <img src={images.gg.src} alt='' />
                </div>
            </div>
            <div className='text-center text-[14px] leading-[21px] '>
                Bạn cảm thấy mức giá không phù hợp?
                <Link
                    href='https://ant.design'
                    target='_blank'
                    className='text-[#3D64EE] font-bold text-[15px] leading-[22.5px] ml-2 no-underline'
                >
                    Tùy chọn khác
                </Link>
            </div>
        </div>
    );
}
