import {
    BankAccountInput,
    BankItemResp,
    LookUpBankNumberReq,
    QRCodeReq,
} from '@core/models/profile.model';
import {
    createQRCodeApi,
    getBankListApi,
    getBankListKeys,
    getTutorBankInfoApi,
    getTutorBankInfoKeys,
    lookUpBankNumberApi,
    updateTutorialBankInfoApi,
} from '@core/services/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Image, Input, Select, message } from 'antd';
import { useEffect, useState } from 'react';

function BankAccountForm() {
    const [form] = Form.useForm<BankAccountInput>();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [qrCodeImage, setQrCodeImage] = useState<string>('');
    const [bankList, setBankList] = useState<BankItemResp[]>([]);

    const mutateUpdateTutorBankInfo = useMutation({
        mutationFn: (data: any) => updateTutorialBankInfoApi(data),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
        },
    });

    const handleSubmitBankAccount = (values: BankAccountInput) => {
        console.log(values);
        setIsUpdate(false);

        const requestCreateQRCode: QRCodeReq = {
            accountNo: values.accountNumber,
            accountName: values.accountName,
            acqId: +values.binBank,
            template: 'qr_only',
        };

        createQRCode.mutate(requestCreateQRCode);

        const requestUpdateTutorBankInfo = {
            idOfBanking: values.binBank,
            numberOfBanking: values.accountNumber,
            nameUserOfBanking: values.accountName,
        };

        mutateUpdateTutorBankInfo.mutate(requestUpdateTutorBankInfo);
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

    const getBankListQuery = useQuery({
        queryKey: getBankListKeys.all,
        queryFn: () => getBankListApi(),
        select: (resp) => resp.data.data,
    });

    const getTutorBankInfoQuery = useQuery({
        queryKey: getTutorBankInfoKeys.all,
        queryFn: () => getTutorBankInfoApi(),
        select: (resp) => resp.data.data,
    });

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

    useEffect(() => {
        if (getBankListQuery?.data) {
            const listData = getBankListQuery?.data;

            setBankList(listData);
        }
    }, [getBankListQuery?.data]);

    useEffect(() => {
        if (
            getTutorBankInfoQuery?.data &&
            getTutorBankInfoQuery?.data?.idOfBanking &&
            getTutorBankInfoQuery?.data?.numberOfBanking &&
            getTutorBankInfoQuery?.data?.nameOfBanking
        ) {
            form.setFieldsValue({
                binBank: getTutorBankInfoQuery?.data?.idOfBanking,
                accountNumber: getTutorBankInfoQuery?.data?.numberOfBanking,
                accountName: getTutorBankInfoQuery?.data?.nameUserOfBanking,
            });

            const requestCreateQRCode: QRCodeReq = {
                accountNo: getTutorBankInfoQuery?.data?.numberOfBanking,
                accountName: getTutorBankInfoQuery?.data?.nameUserOfBanking ?? '',
                acqId: +getTutorBankInfoQuery?.data?.idOfBanking,
                template: 'qr_only',
            };

            createQRCode.mutate(requestCreateQRCode);
        }
    }, [getTutorBankInfoQuery?.data?.idOfBanking]);

    console.log(form.getFieldsValue());

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
                <div className='font-bold text-base mb-2'>Tên ngân hàng</div>
                <Form.Item<BankAccountInput>
                    name='binBank'
                    rules={[{ required: true, message: 'Vui lòng chọn trường này!' }]}
                    className='!mb-2'
                >
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
                <div className='font-bold text-base mb-2'>Số tài khoản</div>
                <Form.Item<BankAccountInput>
                    name='accountNumber'
                    rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                    className='!mb-2'
                >
                    <Input
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Nhập số tài khoản của bạn'
                        onChange={(e) => form.setFieldValue('accountNumber', e.target.value)}
                        onBlur={handleLookUpBankNumber}
                    />
                </Form.Item>

                {/* account name */}
                <div className='font-bold text-base mb-2'>Tên tài khoản</div>
                <Form.Item<BankAccountInput>
                    name='accountName'
                    rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
                    className='!mb-8'
                >
                    <Input
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Tên tài khoản của bạn'
                        disabled
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
