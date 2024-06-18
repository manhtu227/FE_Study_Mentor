'use client';
import images from '@assets/images';
import { CustomPasswordInput } from '@components/form-input/CustomPasswordInput';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { Button, Form, message } from 'antd';

import { MY_ROUTE } from '@core/constants/routes.constant';
import { Gender, UserType } from '@core/enums/user.enum';
import { SignUpInput } from '@core/models/authentication.model';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
    AUTHENTICATED,
    PASSWORD_PATTERN,
    PASSWORD_VALIDATION_MESSAGE,
} from '@core/constants/authentication.constants';
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
            } as SignUpInput & SignInOptions),
        onSuccess: () => {
            message.success('Đăng ký thành công');
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
        <div className='relative pb-[350px] h-[500px] max-w-full overflow-hidden'>
            <Image src={images.loginScreen} alt='Hero' className='relative' />
            <div className='absolute top-0 left-0 right-0 opacity-90 pt-20'>
                <div className='mb-[52px]'>
                    <div className='font-bold text-[33px] py-3 border-b-[2px] border-solid border-r-0 border-t-0 border-l-0 w-[250px] text-[White] text-center mx-auto'>
                        Đăng ký
                    </div>
                </div>
                <div className='flex items-center gap-[32px] w-full justify-center mb-[58px]'>
                    <Form
                        name='signUp'
                        onFinish={handleSubmitSignUp}
                        form={form}
                        autoComplete='off'
                    >
                        <div className='font-bold text-base mb-2 text-[White]'>
                            {' '}
                            <span className='text-red-500 mr-1'>*</span>Loại người dùng
                        </div>
                        <Form.Item
                            name='type'
                            rules={[{ required: true, message: 'Vui lòng chọn loại người dùng' }]}
                        >
                            <CustomSelectInput
                                placeholder='Chọn loại người dùng'
                                optionsSelect={[
                                    { label: 'Học viên', value: UserType.STUDENT },
                                    { label: 'Người hướng dẫn', value: UserType.TUTOR },
                                ]}
                            />
                        </Form.Item>

                        <div className='font-bold text-base mb-2 text-[White]'>
                            {' '}
                            <span className='text-red-500 mr-1'>*</span>Họ và tên
                        </div>
                        <Form.Item
                            name='fullName'
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        >
                            <CustomTextInput
                                placeholder='Nhập họ và tên của bạn...'
                                classNameForm='w-[350px]'
                            />
                        </Form.Item>

                        <div className='font-bold text-base mb-2 text-[White]'>
                            {' '}
                            <span className='text-red-500 mr-1'>*</span>Email
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
                            <CustomTextInput placeholder='Nhập email...' />
                        </Form.Item>

                        <div className='font-bold text-base mb-2 text-[White]'>
                            {' '}
                            <span className='text-red-500 mr-1'>*</span>Giới tính
                        </div>
                        <Form.Item
                            name='gender'
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                        >
                            <CustomSelectInput
                                placeholder='Chọn giới tính...'
                                optionsSelect={[
                                    { label: 'Nam', value: Gender.Male },
                                    { label: 'Nữ', value: Gender.Female },
                                ]}
                            />
                        </Form.Item>

                        <div className='font-bold text-base mb-2 text-[White]'>
                            {' '}
                            <span className='text-red-500 mr-1'>*</span>Mật khẩu
                        </div>
                        <Form.Item
                            name='password'
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                {
                                    pattern: new RegExp(PASSWORD_PATTERN),
                                    message: PASSWORD_VALIDATION_MESSAGE,
                                },
                            ]}
                        >
                            <CustomPasswordInput placeholder='Nhập mật khẩu...' />
                        </Form.Item>

                        <div className='flex gap-2 text-center'>
                            <span>Bạn đã sẵn có tài khoản?</span>
                            <Link href={MY_ROUTE.LOGIN} className='text-[White]'>
                                Đăng nhập
                            </Link>
                        </div>

                        <Form.Item colon={false}>
                            <Button htmlType='submit' size='large' className='mt-[30px] w-full'>
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
