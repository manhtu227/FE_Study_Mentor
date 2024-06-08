'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import images from '@assets/images';
import { CustomPasswordInput } from '@components/form-input/CustomPasswordInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { AUTHENTICATED } from '@core/constants/authentication.constants';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { LoginInput } from '@core/models/authentication.model';
import { useMutation } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { SignInOptions, signIn, useSession } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
    const [form] = Form.useForm<LoginInput>();
    const router = useRouter();
    const { data: authData, status: authStatus } = useSession();

    /* Action */
    const loginMutation = useMutation({
        mutationFn: (form: LoginInput) =>
            signIn('custom-login', {
                email: form.email,
                password: form.password,
                redirect: false,
            } as LoginInput & SignInOptions),
    });

    const handleSubmitLogin = (values: LoginInput) => {
        loginMutation.mutate(values);
    };

    /* Effect */
    useEffect(() => {
        if (authStatus !== AUTHENTICATED) return;
        router.push(MY_ROUTE.HOME);
    }, [authStatus, authData]);

    return (
        <div className='relative pb-[350px] h-[500px] max-w-full overflow-hidden'>
            <Image src={images.loginScreen} alt='Hero' className='relative' />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                <div className='mb-[52px]'>
                    <div className='font-bold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[White] text-center mx-auto'>
                        Đăng nhập
                    </div>
                </div>
                <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                    <Form name='signUp' onFinish={handleSubmitLogin} form={form} autoComplete='off'>
                        <div className='font-bold text-base mb-2 text-[White]'>Email</div>
                        <Form.Item
                            name='email'
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                        >
                            <CustomTextInput
                                placeholder='Nhập email...'
                                classNameForm='w-[350px]'
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>

                        <div className='font-bold text-base mb-2 text-[White]'>Mật khẩu</div>
                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <CustomPasswordInput
                                placeholder='Nhập mật khẩu...'
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>

                        <div className='text-[White] text-right'>
                            <Link href='#' className='text-[White]'>
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <Form.Item colon={false}>
                            <Button htmlType='submit' size='large' className='mt-[30px] w-full'>
                                Đăng nhập
                            </Button>
                        </Form.Item>

                        <div className='flex gap-2'>
                            <span>Bạn chưa có tài khoản?</span>
                            <Link href={MY_ROUTE.SIGN_UP} className='text-[White]'>
                                Đăng ký ngay
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
