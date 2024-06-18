import {
    PASSWORD_PATTERN,
    PASSWORD_VALIDATION_MESSAGE,
} from '@core/constants/authentication.constants';
import { ChangePasswordInput } from '@core/models/authentication.model';
import { ResetPasswordReq } from '@core/models/user.model';
import { changePasswordApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';

function ChangePasswordForm({
    onSaveForm,
    onCancelForm,
}: {
    onSaveForm: () => void;
    onCancelForm: () => void;
}) {
    const [form] = Form.useForm<ChangePasswordInput>();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const changePasswordMutation = useMutation({
        mutationFn: (data: ResetPasswordReq) => changePasswordApi(data),
        onSuccess: () => {
            onSaveForm();
            message.success('Đổi password thành công');
        },
        onError: (error: any) => {
            setErrorMessage(error.response.data.message);
        },
    });

    const handleSubmitChangePassword = (values: ChangePasswordInput) => {
        changePasswordMutation.mutate({
            passwordNew: values.newPassword,
            passwordOld: values.oldPassword,
        });
    };

    const handleCancelUpdate = () => {
        form.resetFields();
        onCancelForm();
    };
    return (
        <Form
            name='bankAccountForm'
            onFinish={handleSubmitChangePassword}
            form={form}
            className='w-full'
            autoComplete='off'
            onChange={() => setErrorMessage('')}
        >
            <div className='font-bold text-base mb-2'>
                <span className='text-red-500'>*</span> Mật khẩu hiện tại
            </div>
            <Form.Item<ChangePasswordInput>
                name='oldPassword'
                rules={[
                    { required: true, message: 'Vui lòng nhập trường này!' },
                    {
                        pattern: new RegExp(PASSWORD_PATTERN),
                        message: PASSWORD_VALIDATION_MESSAGE,
                    },
                ]}
                className='!mb-2'
            >
                <Input
                    className='h-12 font-medium text-base text-gray-700'
                    placeholder='Nhập mật khẩu hiện tại'
                />
            </Form.Item>

            <div className='font-bold text-base mb-2'>
                <span className='text-red-500'>*</span> Mật khẩu mới
            </div>
            <Form.Item<ChangePasswordInput>
                name='newPassword'
                rules={[
                    { required: true, message: 'Vui lòng nhập trường này!' },
                    {
                        pattern: new RegExp(PASSWORD_PATTERN),
                        message: PASSWORD_VALIDATION_MESSAGE,
                    },
                ]}
                className='!mb-2'
            >
                <Input
                    className='h-12 font-medium text-base text-gray-700'
                    placeholder='Nhập mật khẩu mới'
                />
            </Form.Item>
            <div className='mt-2 text-red-500'>{errorMessage}</div>

            <div className='flex items-center justify-end gap-2 mt-4'>
                <Button
                    size='large'
                    className='!w-[160px] font-bold text-base bg-gray-300'
                    onClick={handleCancelUpdate}
                >
                    Hủy
                </Button>
                <Form.Item colon={false} className='!mb-0'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        className='font-bold text-base !w-[160px] bg-primary-800'
                    >
                        Lưu
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}

export default ChangePasswordForm;
