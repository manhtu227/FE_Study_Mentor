'use client';
import { MY_ROUTE } from '@core/constants/routes.constant';
import {
    ExpirationDateType,
    PaymentReq,
    PaymentType,
    paymemtSystemApi,
} from '@core/services/payment.service';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { toastSuccess } from '@core/utilities/toast.utility';
import { useMutation } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import CardPayment from './components/CardPayment';

export default function UpgradeAiPage() {
    const router = useRouter();
    // create new payment request api
    const mutateCreatePaymentRequest = useMutation({
        mutationFn: (body: PaymentReq) => paymemtSystemApi(body),
        onSuccess: (resp) => {
            toastSuccess('Tạo yêu cầu thanh toán thành công');
            router.push(resp.data.data.checkoutUrl);
        },
        onError: handleError,
    });

    return (
        <Spin spinning={mutateCreatePaymentRequest.isPending}>
            <div className='flex flex-col gap-4 justify-center items-center '>
                <div className='text-4xl my-6 font-bold'>Nâng cấp kế hoạch của bạn</div>
                <div className='flex px-4 gap-4'>
                    <CardPayment />
                    <CardPayment
                        checkUpgrade
                        onClick={() => {
                            mutateCreatePaymentRequest.mutate({
                                type: PaymentType.CHAT_AI,
                                cancelUrl: window.location.href,
                                returnUrl: MY_ROUTE.AI.PAID,
                                expirationDateType: ExpirationDateType.MONTH,
                            });
                        }}
                    />
                </div>
            </div>
        </Spin>
    );
}
