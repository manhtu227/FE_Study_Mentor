import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { CertificatesInformationInput, UserResp } from '@core/models/profile.model';
import { Button, Form, Input } from 'antd';

export function CertificatesInfoSection({ data }: { data?: UserResp }) {
    const [certificatesInformationForm] = Form.useForm<CertificatesInformationInput>();

    const handleSubmitCertificatesInformationForm = (values: CertificatesInformationInput) => {
        console.log(values);
    };

    return (
        <div className='w-full'>
            <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                Chứng chỉ
            </div>
            <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
            <Form
                name='certificatesInformationForm'
                form={certificatesInformationForm}
                onFinish={handleSubmitCertificatesInformationForm}
                //cancel

                autoComplete='off'
            >
                <div className='font-bold text-base mb-2'>Tên chứng chỉ</div>
                <Form.Item<CertificatesInformationInput>
                    name='fullName'
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Nhập tên chứng chỉ'
                    />
                </Form.Item>
                <CustomDragDropFile<CertificatesInformationInput> name='certificatesContent' />
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
    );
}
