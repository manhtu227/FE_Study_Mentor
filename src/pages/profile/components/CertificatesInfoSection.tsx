import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { USER_ID } from '@core/constants/commons.constant';
import { CertificatesInformationInput, UserResp } from '@core/models/profile.model';
import { updateCertificateSectionApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message, Spin } from 'antd';
import { useEffect } from 'react';

export function CertificatesInfoSection({ data }: { data?: UserResp }) {
    const [form] = Form.useForm<CertificatesInformationInput>();

    const mutateUpdate = useMutation({
        mutationFn: (data: CertificatesInformationInput) =>
            updateCertificateSectionApi(data, USER_ID),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
        },
    });

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.CertificateName,
                certificateFile: data.CertificateImageUrl,
            });
        }
    }, [data]);

    const handleSubmitCertificatesInformationForm = (values: CertificatesInformationInput) => {
        mutateUpdate.mutate(values);
    };

    return (
        <Spin spinning={mutateUpdate.isPending} size='large'>
            <div className='w-full'>
                <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                    <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                    Chứng chỉ
                </div>
                <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
                <Form
                    name='certificatesInformationForm'
                    form={form}
                    onFinish={handleSubmitCertificatesInformationForm}
                    //cancel

                    autoComplete='off'
                >
                    <div className='font-bold text-base mb-2'>Tên chứng chỉ</div>
                    <Form.Item<CertificatesInformationInput>
                        name='name'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input
                            className='h-12 font-medium text-base'
                            placeholder='Nhập tên chứng chỉ'
                        />
                    </Form.Item>
                    <CustomDragDropFile<CertificatesInformationInput> name='certificateFile' />
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
                </Form>
            </div>
        </Spin>
    );
}
