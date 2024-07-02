'use client';
import { CustomPasswordInput } from '@components/form-input/CustomPasswordInput';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { DatePicker, Form } from 'antd';

import { MY_ROUTE } from '@core/constants/routes.constant';
import { Gender, UserType } from '@core/enums/user.enum';
import { SignUpInput } from '@core/models/authentication.model';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ButtonPrimary from '@components/button/ButtonPrimary';
import { AUTHENTICATED } from '@core/constants/authentication.constants';
import { toastSuccess } from '@core/utilities/toast.utility';
import dayjs from 'dayjs';
import { SignInOptions, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const SignUpPage = () => {
    const [form] = Form.useForm<SignUpInput>();
    const router = useRouter();
    const { data: authData, status: authStatus } = useSession();

    const signUpMutate = useMutation({
        mutationFn: (data: SignUpInput) =>
            signIn('custom-signup', {
                email: data.email,
                password: data.password,
                redirect: false,
                fullName: data.fullName,
                gender: data.gender,
                type: data.type,
                dateOfBirth: dayjs(data.dateOfBirth).get('year'),
            } as SignUpInput & SignInOptions),
        onSuccess: () => {
            toastSuccess('Đăng ký thành công');
        },
    });

    const handleSubmitSignUp = (values: SignUpInput) => {
        signUpMutate.mutate(values);
    };

    useEffect(() => {
        if (authStatus !== AUTHENTICATED) return;
        router.push(MY_ROUTE.HOME);
    }, [authStatus, authData]);

    return (
        <div className='font-[sans-serif]'>
            <div className='min-h-screen flex fle-col items-center justify-center'>
                <div className='grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full'>
                    <div className='border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto'>
                        <Form
                            name='login'
                            onFinish={handleSubmitSignUp}
                            form={form}
                            autoComplete='off'
                        >
                            <div className='mb-8'>
                                <h3 className=' text-3xl font-extrabold'>Đăng ký</h3>
                                <p className='text-gray-500 text-sm mt-4 leading-relaxed'>
                                    Đăng ký tài khoản của bạn và khám phá một thế giới khả năng.
                                    Cuộc hành trình của bạn bắt đầu từ đây.
                                </p>
                            </div>
                            <div className='flex gap-2 w-full'>
                                <div className='flex-1'>
                                    <label
                                        htmlFor='type'
                                        className='text-gray-800 text-sm mb-2 block'
                                    >
                                        Chọn loại người dùng
                                    </label>
                                    <div className='relative flex items-center'>
                                        <CustomSelectInput<SignUpInput>
                                            placeholder='Chọn loại người dùng'
                                            optionsSelect={[
                                                { label: 'Học viên', value: UserType.STUDENT },
                                                { label: 'Người hướng dẫn', value: UserType.TUTOR },
                                            ]}
                                            classNameForm='w-full mb-6'
                                            name={'type'}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn loại người dùng',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className='flex-1'>
                                    <label
                                        htmlFor='gender'
                                        className='text-gray-800 text-sm mb-2 block'
                                    >
                                        Giới tính
                                    </label>
                                    <div className='relative flex items-center'>
                                        <CustomSelectInput<SignUpInput>
                                            placeholder='Chọn giới tính...'
                                            classNameForm='w-full mb-6'
                                            name={'gender'}
                                            optionsSelect={[
                                                { label: 'Nam', value: Gender.Male },
                                                { label: 'Nữ', value: Gender.Female },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor='fullName'
                                    className='text-gray-800 text-sm mb-2 block'
                                >
                                    Họ và tên
                                </label>
                                <div className='relative flex items-center'>
                                    <CustomTextInput<SignUpInput>
                                        placeholder='Họ và tên'
                                        name={'fullName'}
                                        classNameForm='w-full mb-6'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập họ và tên',
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor='fullName'
                                    className='text-gray-800 text-sm mb-2 block'
                                >
                                    Năm sinh
                                </label>
                                <div className='relative flex items-center w-full'>
                                    <Form.Item<SignUpInput> name='dateOfBirth' className='w-full'>
                                        <DatePicker
                                            className='h-12 font-medium text-base w-full'
                                            placeholder='Chọn năm sinh'
                                            picker='year'
                                            defaultValue={''}
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label htmlFor='email' className='text-gray-800 text-sm mb-2 block'>
                                    Email
                                </label>
                                <div className='relative flex items-center'>
                                    <CustomTextInput<SignUpInput>
                                        name={'email'}
                                        placeholder='Nhập email...'
                                        classNameForm='w-full mb-6'
                                        prefix={<UserOutlined />}
                                        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='text-gray-800 text-sm mb-2 block'
                                >
                                    Password
                                </label>
                                <div className='relative flex items-center'>
                                    <CustomPasswordInput<SignUpInput>
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

                            <div className='!mt-3'>
                                <ButtonPrimary title={'Đăng Ký'} htmlType='submit' />
                            </div>

                            <p className='text-sm !mt-8 text-center text-gray-800'>
                                Bạn đã có tài khoản?
                                <Link
                                    href={MY_ROUTE.LOGIN}
                                    className='text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap'
                                >
                                    Đăng nhập ngay
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

export default SignUpPage;
