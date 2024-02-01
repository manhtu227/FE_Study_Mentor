import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Image, Space } from 'antd';
import DropDownField from '../../components/drop-down-fied/DropDownField';
import images from '@assets/images';
import Link from 'next/link';

export default function ModalGGMeet() {
    return (
        <div className='border border-gray-300 p-4'>
            {' '}
            <div className='flex'>
                <form className='border border-gray-300 p-4'>
                    <h2>Trả lời thông qua Zoom/ Google meet</h2>
                    <div className='d-flex flex-row'>
                        <div>
                            <div className='mb-5'>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Thời gian giải đáp
                                </label>
                                <Input
                                    className=' w-[530px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                                    placeholder='Nhập số phút'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Cấp độ câu hỏi
                                </label>
                                <DropDownField
                                    className='px-3 py-4 flex items-center w-[530px]'
                                    title='Chọn cấp độ'
                                />
                            </div>
                            <div className='mb-5'>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Lớp
                                </label>
                                <DropDownField
                                    className='px-3 py-4 flex items-center w-[530px]'
                                    title='Chọn lớp'
                                />
                            </div>
                            <div className='mb-5'>
                                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                                    Thời gian
                                </label>
                                <Input
                                    className=' w-[530px] shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                                    placeholder='Nhập số phút'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <Button className='d-flex text-white bg-blue-700'>
                        <span className='d-flex items-center'>Tìm kiếm người hướng dẫn</span>
                    </Button>
                </form>
                <div className='float-right mt-24 '>
                    <img src={images.gg.src} />
                </div>
            </div>
            <div>
                Bạn cảm thấy mức giá không phù hợp?
                <Link href='https://ant.design' target='_blank'>
                    Tùy chọn khác
                </Link>
            </div>
        </div>
    );
}
