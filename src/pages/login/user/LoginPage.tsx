'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import images from '@assets/images';
import { CustomPasswordInput } from '@components/form-input/CustomPasswordInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { Button, Form } from 'antd';

import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className='relative pb-[300px] h-[500px] max-w-full'>
            <Image src={images.loginScreen} alt='Hero' className='relative' />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                <div className='mb-[52px]'>
                    <div className='font-bold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[White] text-center mx-auto'>
                        Đăng nhập
                    </div>
                </div>
                <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                    <Form>
                        <div className='font-bold text-base mb-2 text-[White]'>Email</div>
                        <Form.Item
                            name='email'
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                        >
                            <CustomTextInput
                                placeholder='Nhập email...'
                                classNameForm='w-[300px]'
                                prefix={<UserOutlined />}
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
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <div className='text-[White] text-right'>
                            <Link href='#' className='text-[White]'>
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
