import {
    BankAccountInput,
    BankItemResp,
    LookUpBankNumberReq,
    QRCodeReq,
} from '@core/models/profile.model';
import { createQRCodeApi, lookUpBankNumberApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Image, Input, Select } from 'antd';
import { useEffect, useState } from 'react';

function BankAccountForm({ bankList }: { bankList: BankItemResp[] }) {
    const [form] = Form.useForm<BankAccountInput>();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [qrCodeImage, setQrCodeImage] = useState<string>('');

    const handleSubmitBankAccount = (values: BankAccountInput) => {
        setIsUpdate(false);

        const requestCreateQRCode: QRCodeReq = {
            accountNo: values.accountNumber,
            accountName: values.accountName,
            acqId: values.binBank,
            template: 'qr_only',
        };
        createQRCode.mutate(requestCreateQRCode);
    };

    const handleCancelUpdate = () => {
        setIsUpdate(false);
        form.resetFields();
    };

    const lookUpMutation = useMutation({
        mutationFn: (data: LookUpBankNumberReq) => lookUpBankNumberApi(data),
    });

    const createQRCode = useMutation({
        mutationFn: (data: QRCodeReq) => createQRCodeApi(data),
    });

    const handleLookUpBankNumber = async () => {
        const values = form.getFieldsValue();

        if (!values.accountNumber || !values.binBank) return;

        lookUpMutation.mutate({
            bin: values.binBank,
            accountNumber: values.accountNumber,
        });
    };

    useEffect(() => {
        if (lookUpMutation.data?.data?.data?.accountName) {
            form.setFieldValue('accountName', lookUpMutation.data?.data?.data?.accountName);
        }
    }, [lookUpMutation.data?.data?.data?.accountName]);

    useEffect(() => {
        if (createQRCode.data?.data?.data?.qrDataURL) {
            setQrCodeImage(createQRCode.data?.data?.data?.qrDataURL);
        }
    }, [createQRCode.data?.data?.data?.qrDataURL]);

    return (
        <div className='p-8 flex flex-col items-start gap-4 bg-white-900 rounded-md mb-8'>
            <div className='font-semibold text-xl text-black-800'>Tài khoản ngân hàng</div>
            <div className='text-md'>
                Cung cấp tài khoản ngân hàng chính xác để <strong>Study Mentor</strong> có thể
                chuyển tiền cho bạn
            </div>
            {qrCodeImage && <Image src={qrCodeImage} alt='QR code' width={200} height={200} />}
            <Form
                name='bankAccountForm'
                onFinish={handleSubmitBankAccount}
                form={form}
                className='w-full'
                autoComplete='off'
                disabled={!isUpdate}
            >
                {/* bank name */}
                <Form.Item
                    name='binBank'
                    rules={[{ required: true, message: 'Vui lòng chọn trường này!' }]}
                    className='!mb-2'
                >
                    <div className='font-bold text-base mb-2'>Tên ngân hàng</div>
                    <Select
                        options={bankList.map((bank) => ({
                            label: bank.shortName,
                            value: bank.bin,
                        }))}
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Chọn ngân hàng của bạn'
                        onChange={(value) => form.setFieldValue('binBank', value)}
                    />
                </Form.Item>

                {/* account number */}
                <Form.Item
                    name='accountNumber'
                    rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                    className='!mb-2'
                >
                    <div className='font-bold text-base mb-2'>Số tài khoản</div>
                    <Input
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Nhập số tài khoản của bạn'
                        type='number'
                        onChange={(e) => form.setFieldValue('accountNumber', e.target.value)}
                        onBlur={handleLookUpBankNumber}
                    />
                </Form.Item>

                {/* account name */}
                <Form.Item
                    name='accountName'
                    rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                    className='!mb-8'
                >
                    <div className='font-bold text-base mb-2'>Tên tài khoản</div>
                    <Input
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Tên tài khoản của bạn'
                        disabled
                        value={lookUpMutation.data?.data?.data?.accountName}
                    />
                </Form.Item>
                {isUpdate && (
                    <div className='flex items-center justify-between'>
                        <Button
                            size='large'
                            className='!h-12 !w-[160px] font-bold text-base bg-gray-300'
                            onClick={handleCancelUpdate}
                        >
                            Hủy
                        </Button>
                        <Form.Item colon={false} className='!mb-0'>
                            <Button
                                type='primary'
                                htmlType='submit'
                                size='large'
                                className='!h-12 font-bold text-base !w-[160px] bg-primary-800'
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form>
            {!isUpdate && (
                <Button
                    type='primary'
                    size='large'
                    className='!h-12 font-bold text-base w-[220px] bg-primary-800'
                    onClick={() => setIsUpdate(true)}
                >
                    Cập nhật
                </Button>
            )}
        </div>
    );
}

export default BankAccountForm;
