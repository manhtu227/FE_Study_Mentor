'use client';
import { UserOutlined } from '@ant-design/icons';
import images from '@assets/images';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { ResetPasswordInput } from '@core/models/authentication.model';
import { resetPasswordApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form } from 'antd';

import Image from 'next/image';
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
        <div className='relative pb-[350px] h-[500px] max-w-full overflow-hidden'>
            <Image src={images.loginScreen} alt='Hero' className='relative' />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                {!isSubmitted ? (
                    <>
                        <div className='mb-[52px]'>
                            <div className='font-bold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[White] text-center mx-auto'>
                                Đặt lại mật khẩu
                            </div>
                        </div>
                        <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                            <Form
                                name='resetPassword'
                                onFinish={handleSubmit}
                                form={form}
                                autoComplete='off'
                            >
                                <div className='font-bold text-base mb-2 text-[White]'>
                                    <span className='text-red-500 mr-1'>*</span>Email
                                </div>
                                <Form.Item
                                    name='email'
                                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                >
                                    <CustomTextInput
                                        type='email'
                                        placeholder='Nhập email...'
                                        classNameForm='w-[350px]'
                                        prefix={<UserOutlined />}
                                    />
                                </Form.Item>

                                <Form.Item colon={false}>
                                    <Button htmlType='submit' size='large' className='mt-2 w-full'>
                                        Gửi email xác nhận
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                ) : (
                    <div className='flex flex-col gap-2 items-center justify-center mt-20'>
                        <div className='font-bold text-white-900 text-2xl'>
                            Email đã được gửi thành công
                        </div>
                        <div className='text-sm text-white-900'>
                            Vui lòng kiểm tra email và làm theo hướng dẫn để đặt lại mật khẩu
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
