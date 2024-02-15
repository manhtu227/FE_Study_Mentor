import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Image, Space } from 'antd';
import DropDownField from '../../components/drop-down-fied/DropDownField';
import images from '@assets/images';
import Link from 'next/link';

export default function ModalGGMeet() {
    return (
        <div className='w-[1200px] p-4 shadow-lg '>
            <h2 className='text-[18px] leading-[27px] text-center'>
                Trả lời thông qua Zoom/ Google meet
            </h2>
            <div className='w-[1089px] flex'>
                <form className='p-8'>
                    <div className='flex flex-row gap-8'>
                        <div>
                            <div className='mb-5'>
                                <p className='text-[16px] leading-6 font-bold mb-2 text-gray-900 dark:text-white'>
                                    Thời gian giải đáp
                                </p>
                                <Input
                                    className=' shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                                    placeholder='Nhập số phút'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Cấp độ câu hỏi
                                </p>
                                <DropDownField
                                    className='px-3 py-4 flex items-center w-[530px] h-[41.6px] text-[#838B8F]'
                                    title='Chọn cấp độ'
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Lớp
                                </p>
                                <DropDownField
                                    className='px-3 py-4 flex items-center justify-between w-[530px] h-[41.6px] text-[#838B8F]'
                                    title='Chọn lớp'
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Thời gian
                                </p>
                                <Input
                                    className=' shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                                    placeholder='Nhập số phút'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <Button className='flex items-center justify-center text-white bg-blue-700 text-[15px] leading-[22.5px] py-6 px-10'>
                        <span>Tìm kiếm người hướng dẫn</span>
                    </Button>
                </form>
                <div className='float-right mt-24 '>
                    <img src={images.gg.src} />
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
