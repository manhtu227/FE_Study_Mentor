'use client';
import { UserOutlined } from '@ant-design/icons';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { ResetPasswordInput } from '@core/models/authentication.model';
import { resetPasswordApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Form } from 'antd';
import Link from 'next/link';

import { useState } from 'react';

const ResetPasswordPage = () => {
    const [form] = Form.useForm<ResetPasswordInput>();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    /* Action */
    const resetPasswordMutation = useMutation({
        mutationFn: (data: ResetPasswordInput) => resetPasswordApi(data),
        onSuccess: () => {
            setIsSubmitted(true);
        },
    });

    const handleSubmit = (values: ResetPasswordInput) => {
        resetPasswordMutation.mutate(values);
    };

    return (
        <div className='font-[sans-serif]'>
            <div className='min-h-screen flex fle-col items-center justify-center'>
                <div className='grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full'>
                    <div className='border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto'>
                        {!isSubmitted ? (
                            <Form
                                name='resetPassword'
                                onFinish={handleSubmit}
                                form={form}
                                autoComplete='off'
                            >
                                <div className='mb-8'>
                                    <h3 className=' text-3xl font-extrabold'>Đặt lại mật khẩu</h3>
                                    <p className='text-gray-500 text-sm mt-4 leading-relaxed'>
                                        Đăng nhập vào tài khoản của bạn và khám phá một thế giới khả
                                        năng. Cuộc hành trình của bạn bắt đầu từ đây.
                                    </p>
                                </div>

                                <div>
                                    <label
                                        htmlFor='email'
                                        className='text-gray-800 text-sm mb-2 block'
                                    >
                                        Email
                                    </label>
                                    <div className='relative flex items-center'>
                                        <CustomTextInput<ResetPasswordInput>
                                            id='email'
                                            name={'email'}
                                            placeholder='Nhập email...'
                                            classNameForm='w-full mb-6'
                                            prefix={<UserOutlined />}
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập email' },
                                                { type: 'email', message: 'Email không hợp lệ' },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className='!mt-8'>
                                    <ButtonPrimary
                                        title={'Gửi email xác nhận'}
                                        htmlType='submit'
                                        loading={resetPasswordMutation.isPending}
                                    />
                                </div>

                                <p className='text-sm !mt-8 text-center text-gray-800'>
                                    Bạn chưa có tài khoản?
                                    <Link
                                        href={MY_ROUTE.SIGN_UP}
                                        className='text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap'
                                    >
                                        Đăng ký ngay
                                    </Link>
                                </p>
                            </Form>
                        ) : (
                            <div className='flex flex-col gap-2 items-center justify-center'>
                                <div className='font-bold text-2xl'>
                                    Email đã được gửi thành công
                                </div>
                                <div className='text-sm'>
                                    Vui lòng kiểm tra email và làm theo hướng dẫn để đặt lại mật
                                    khẩu
                                </div>
                                <Link
                                    href={MY_ROUTE.LOGIN}
                                    className='text-sm text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap no-underline'
                                >
                                    Đăng nhập ngay
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className='lg:h-[400px] md:h-[300px] max-md:mt-8'>
                        <img
                            src='https://readymadeui.com/login-image.webp'
                            className='w-full h-full max-md:w-4/5 mx-auto block object-cover'
                            alt='Dining Experience'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
