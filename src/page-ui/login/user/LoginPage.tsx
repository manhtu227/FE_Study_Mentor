'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { CustomPasswordInput } from '@components/form-input/CustomPasswordInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { AUTHENTICATED } from '@core/constants/authentication.constants';
import { MY_ROUTE } from '@core/constants/routes.constant';
import { LoginInput } from '@core/models/authentication.model';
import { useMutation } from '@tanstack/react-query';
import { Form } from 'antd';
import { SignInOptions, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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

    const handleSubmitLogin = async (values: LoginInput) => {
        const resp = await loginMutation.mutateAsync(values);
        if (resp && resp?.ok) {
            return;
        }
        toast.error('Tên email hoặc mật khẩu không hợp lệ.');
    };

    /* Effect */
    useEffect(() => {
        if (authStatus !== AUTHENTICATED) return;
        router.push(MY_ROUTE.HOME);
    }, [authStatus, authData]);

    return (
        <div className='font-[sans-serif]'>
            <div className='min-h-screen flex fle-col items-center justify-center py-6 px-4'>
                <div className='grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full'>
                    <div className='border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto'>
                        <Form
                            name='login'
                            onFinish={handleSubmitLogin}
                            form={form}
                            autoComplete='off'
                        >
                            <div className='mb-8'>
                                <h3 className=' text-3xl font-extrabold'>Đăng nhập</h3>
                                <p className='text-gray-500 text-sm mt-4 leading-relaxed'>
                                    Đăng nhập vào tài khoản của bạn và khám phá một thế giới khả
                                    năng. Cuộc hành trình của bạn bắt đầu từ đây.
                                </p>
                            </div>

                            <div>
                                <label className='text-gray-800 text-sm mb-2 block'>Email</label>
                                <div className='relative flex items-center'>
                                    <CustomTextInput<LoginInput>
                                        name={'email'}
                                        placeholder='Nhập email...'
                                        classNameForm='w-full mb-6'
                                        prefix={<UserOutlined />}
                                        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='text-gray-800 text-sm mb-2 block'>Password</label>
                                <div className='relative flex items-center'>
                                    <CustomPasswordInput<LoginInput>
                                        name={'password'}
                                        placeholder='Nhập mật khẩu...'
                                        classNameForm='w-full mb-6'
                                        prefix={<LockOutlined />}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập mật khẩu' },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-wrap items-center justify-between gap-4'>
                                <div className='flex items-center'></div>

                                <div className='text-sm'>
                                    <a
                                        href='jajvascript:void(0);'
                                        className='text-blue-600 hover:underline font-semibold'
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className='!mt-8'>
                                <ButtonPrimary title={'Đăng nhập'} htmlType='submit' />
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

export default LoginPage;
