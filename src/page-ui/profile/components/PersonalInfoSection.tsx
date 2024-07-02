import { Gender } from '@core/enums/user.enum';
import {
    PersonalInformationInput,
    UpdatePersonalInformationInput,
    UserResp,
} from '@core/models/profile.model';
import { updateUserDetailApi } from '@core/services/user.service';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation } from '@tanstack/react-query';
import { Button, DatePicker, Form, Input, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function PersonalInfoSection({
    data,
    onUpdatePersonalInfo,
}: {
    data?: UserResp;
    onUpdatePersonalInfo: () => void;
}) {
    const [form] = Form.useForm<PersonalInformationInput>();
    const [initialDataForm, setInitialDataForm] = useState<PersonalInformationInput>();

    const mutateUpdate = useMutation({
        mutationFn: (dataUpdate: UpdatePersonalInformationInput) => updateUserDetailApi(dataUpdate),
        onSuccess: () => {
            toastSuccess('Cập nhật thông tin thành công');
            setIsEdit(false);
            onUpdatePersonalInfo();
        },
        onError: handleError,
    });
    const handleSubmitPersonalInformationForm = (values: PersonalInformationInput) => {
        const request: UpdatePersonalInformationInput = {
            email: values.email,
            fullName: values.fullName,
            gender: values.gender,
        };

        if (values?.dateOfBirth) {
            request.dateOfBirth = dayjs(values.dateOfBirth).get('year');
        }

        if (values?.phone) request.phone = values.phone;

        mutateUpdate.mutate(request);
    };

    useEffect(() => {
        if (data) {
            const formData = {
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                dateOfBirth: dayjs(data.dateOfBirth).set('year', +data?.dateOfBirth),
                gender: data.gender,
            };

            setInitialDataForm(formData);
            form.setFieldsValue(formData);
        }
    }, [data]);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleCancelUpdate = () => {
        setIsEdit(false);

        if (initialDataForm) {
            form.setFieldsValue(initialDataForm);
        }
    };

    return (
        <Spin spinning={mutateUpdate.isPending} size='large'>
            <div className='w-full mb-8'>
                <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                    <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                    Thông tin cá nhân
                </div>
                <Form
                    name='personalInformationForm'
                    form={form}
                    onFinish={handleSubmitPersonalInformationForm}
                    autoComplete='off'
                    disabled={!isEdit}
                >
                    {/* Full name */}
                    <div className='font-bold text-base mb-2'>Họ và tên</div>
                    <Form.Item<PersonalInformationInput>
                        name='fullName'
                        rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                    >
                        <Input
                            className='h-12 font-medium text-base'
                            placeholder='Nhập họ và tên'
                        />
                    </Form.Item>

                    <div className='flex items-center gap-8 w-full'>
                        {/* Phone number */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Số điện thoại</div>
                            <Form.Item<PersonalInformationInput> name='phone'>
                                <Input
                                    className='h-12 font-medium text-base'
                                    placeholder='Nhập số điện thoại'
                                />
                            </Form.Item>
                        </div>

                        {/* Email */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Email</div>
                            <Form.Item<PersonalInformationInput>
                                name='email'
                                rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                            >
                                <Input
                                    className='h-12 font-medium text-base'
                                    placeholder='Nhập email'
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className='flex items-center gap-8 w-full'>
                        {/* Year of Birth */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Năm sinh</div>
                            <Form.Item<PersonalInformationInput> name='dateOfBirth'>
                                <DatePicker
                                    className='h-12 font-medium text-base w-full'
                                    placeholder='Nhập năm sinh'
                                    picker='year'
                                    defaultValue={''}
                                />
                            </Form.Item>
                        </div>

                        {/* Email */}
                        <div className='w-1/2'>
                            <div className='font-bold text-base mb-2'>Giới tính</div>
                            <Form.Item<PersonalInformationInput>
                                name='gender'
                                rules={[{ required: true, message: 'Vui lòng chọn giá trị!' }]}
                            >
                                <Select
                                    className='h-12 font-medium text-base'
                                    placeholder='Chọn giới tính'
                                    onChange={(e) => form.setFieldsValue({ gender: e })}
                                    options={[
                                        { value: Gender.Male, label: 'Nam' },
                                        { value: Gender.Female, label: 'Nữ' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        {isEdit && (
                            <Button
                                size='large'
                                className='!h-12 !w-[200px] font-bold text-base bg-gray-300'
                                onClick={handleCancelUpdate}
                            >
                                Hủy
                            </Button>
                        )}
                        {isEdit && (
                            <Form.Item colon={false}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    size='large'
                                    className='!h-12 !w-[200px] font-bold text-base bg-primary-800'
                                >
                                    Lưu
                                </Button>
                            </Form.Item>
                        )}
                    </div>
                </Form>
                {!isEdit && (
                    <Button
                        size='large'
                        type='primary'
                        className='!h-12 !w-[200px] font-bold text-base'
                        onClick={() => setIsEdit(true)}
                    >
                        Cập nhật
                    </Button>
                )}
            </div>
        </Spin>
    );
}
