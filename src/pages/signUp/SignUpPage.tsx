'use client';
import { LockOutlined } from '@ant-design/icons';
import images from '@assets/images';
import { CustomPasswordInput } from '@components/form-input/CustomPasswordInput';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import { Button, Form, message } from 'antd';

import { Gender, TypeUser } from '@core/enums/user.enum';
import { SignUpInput } from '@core/models/authentication.model';
import { signUpApi } from '@core/services/authentication.service';
import { RootState } from '@core/store';
import { setAccessToken, setUser } from '@core/store/reducers/authentication.reducer';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SignUpPage = () => {
    const [form] = Form.useForm<SignUpInput>();
    const router = useRouter();
    const dispatch = useDispatch();
    const accessToken = useSelector((state: RootState) => state.authentication)?.accessToken ?? '';

    const signUpMutate = useMutation({
        mutationFn: (data: SignUpInput) => signUpApi(data),
        onSuccess: () => {
            message.success('Đăng ký thành công');
        },
    });

    const handleSubmitSignUp = (values: SignUpInput) => {
        console.log('Submit', values);
        signUpMutate.mutate(values);
    };

    useEffect(() => {
        if (accessToken) {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        signUpMutate.data?.data.data.token &&
            dispatch(setAccessToken(signUpMutate.data?.data.data.token)) &&
            dispatch(setUser(signUpMutate.data?.data.data.user)) &&
            router.push('/');
    }, [signUpMutate.data?.data.data.token]);

    return (
        <div className='relative pb-[300px] h-[500px] max-w-full'>
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
                        <div className='font-bold text-base mb-2 text-[White]'>Loại người dùng</div>
                        <Form.Item
                            name='type'
                            rules={[{ required: true, message: 'Vui lòng chọn loại người dùng' }]}
                        >
                            <CustomSelectInput
                                placeholder='Chọn loại người dùng'
                                optionsSelect={[
                                    { label: 'Học viên', value: TypeUser.STUDENT },
                                    { label: 'Người hướng dẫn', value: TypeUser.TUTOR },
                                ]}
                            />
                        </Form.Item>

                        <div className='font-bold text-base mb-2 text-[White]'>Họ và tên</div>
                        <Form.Item
                            name='fullName'
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        >
                            <CustomTextInput
                                placeholder='Nhập họ và tên của bạn...'
                                classNameForm='w-[300px]'
                            />
                        </Form.Item>

                        <div className='font-bold text-base mb-2 text-[White]'>Email</div>
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
                                    { label: 'Nam', value: Gender.Male },
                                    { label: 'Nữ', value: Gender.Female },
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
            </div>
        </div>
    );
};

export default SignUpPage;
