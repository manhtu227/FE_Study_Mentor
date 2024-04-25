'use client';
import { LockOutlined } from '@ant-design/icons';
import images from '@assets/images';
import { CustomPasswordInput } from '@components/form-input/CustomPasswordInput';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { Button, Flex, Form } from 'antd';
import { useState } from 'react';

import Image from 'next/image';

const SignUpPage = () => {
    const [isTutor, setIsTutor] = useState(false);
    const [type, setType] = useState(0);

    const onClickBtnStudent = () => {
        console.log('Student');
        setIsTutor(false);
        setType(0);
    };
    const onClickBtnTeacher = () => {
        console.log('Teacher');
        setIsTutor(true);
        setType(1);
    };

    return (
        <div className='relative pb-[300px] h-[500px] max-w-full'>
            <Image src={images.loginScreen} alt='Hero' className='relative' />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                <div className='mb-[52px]'>
                    <div className='font-bold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[White] text-center mx-auto'>
                        Đăng ký
                    </div>
                    <div className='text-[White] text-center mt-[20px]'>
                        Bạn muốn đăng ký với tư cách là?{' '}
                    </div>
                    <Flex gap='small' wrap='wrap' className='justify-center mt-5'>
                        <Button type='dashed' ghost onClick={onClickBtnStudent}>
                            Học viên
                        </Button>
                        <Button type='dashed' ghost onClick={onClickBtnTeacher}>
                            Người hướng dẫn
                        </Button>
                    </Flex>
                </div>
                {isTutor ? (
                    <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                        <Form>
                            <div className='font-bold text-base mb-2 text-[White]'>
                                Họ và tên người hướng dẫn
                            </div>
                            <Form.Item
                                name='fullName'
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                            >
                                <CustomTextInput
                                    placeholder='Nhập họ và tên của bạn...'
                                    classNameForm='w-[300px]'
                                />
                            </Form.Item>

                            <div className='font-bold text-base mb-2 text-[White]'>
                                Email người hướng dẫn
                            </div>
                            <Form.Item
                                name='email'
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    {
                                        type: 'email',
                                        message: 'Vui lòng nhập đúng định dạng email',
                                    },
                                ]}
                            >
                                <CustomTextInput
                                    placeholder='Nhập email...'
                                    classNameForm='w-[300px]'
                                />
                            </Form.Item>

                            <div className='font-bold text-base mb-2 text-[White]'>Giới tính</div>
                            <Form.Item
                                name='gender'
                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            >
                                <CustomSelectInput
                                    placeholder='Chọn giới tính...'
                                    optionsSelect={[
                                        { label: 'Nam', value: 0 },
                                        { label: 'Nữ', value: 1 },
                                    ]}
                                />
                            </Form.Item>

                            <div className='font-bold text-base mb-2 text-[White]'>Mật khẩu</div>
                            <Form.Item
                                name='password'
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                                    {
                                        pattern: new RegExp(
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                        ),
                                        message: 'Mật khẩu sai định dạng',
                                    },
                                ]}
                            >
                                <CustomPasswordInput
                                    placeholder='Nhập mật khẩu...'
                                    classNameForm='w-[300px]'
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                            <Form.Item colon={false}>
                                <Button htmlType='submit' size='large' className='mt-[30px] w-full'>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                ) : (
                    <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                        <Form>
                            <div className='font-bold text-base mb-2 text-[White]'>
                                Họ và tên học viên
                            </div>
                            <Form.Item
                                name='fullName'
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                            >
                                <CustomTextInput
                                    placeholder='Nhập họ và tên của bạn...'
                                    classNameForm='w-[300px]'
                                />
                            </Form.Item>

                            <div className='font-bold text-base mb-2 text-[White]'>
                                Email học viên
                            </div>
                            <Form.Item
                                name='email'
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    {
                                        type: 'email',
                                        message: 'Vui lòng nhập đúng định dạng email',
                                    },
                                ]}
                            >
                                <CustomTextInput
                                    placeholder='Nhập email...'
                                    classNameForm='w-[300px]'
                                />
                            </Form.Item>

                            <div className='font-bold text-base mb-2 text-[White]'>Giới tính</div>
                            <Form.Item
                                name='gender'
                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            >
                                <CustomSelectInput
                                    placeholder='Chọn giới tính...'
                                    optionsSelect={[
                                        { label: 'Nam', value: 0 },
                                        { label: 'Nữ', value: 1 },
                                    ]}
                                />
                            </Form.Item>

                            <div className='font-bold text-base mb-2 text-[White]'>Mật khẩu</div>
                            <Form.Item
                                name='password'
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                                    {
                                        pattern: new RegExp(
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                        ),
                                        message: 'Mật khẩu sai định dạng',
                                    },
                                ]}
                            >
                                <CustomPasswordInput
                                    placeholder='Nhập mật khẩu...'
                                    classNameForm='w-[300px]'
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                            <Form.Item colon={false}>
                                <Button htmlType='submit' size='large' className='mt-[30px] w-full'>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;
