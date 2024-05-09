import { api } from '@core/https/http';
import {
    CreatePaymentRequestModel,
    CreatePaymentResp,
    PaymentInfoResp,
} from '@core/models/payment.model';

export const createNewPaymentRequestApi = async (payload: CreatePaymentRequestModel) => {
    return api.post<CreatePaymentResp>(
        `${process.env.NEXT_PUBLIC_PAY_OS_URL}/v2/payment-requests`,
        payload,
        {
            needsAuth: true,
        } as any & { needsAuth?: boolean },
    );
};

export const getInfoPaymentRequestApi = async (paymentId: string) => {
    return api.get<PaymentInfoResp>(
        `${process.env.NEXT_PUBLIC_PAY_OS_URL}/v2/payment-requests/${paymentId}`,
        {
            needsAuth: true,
        } as any & { needsAuth?: boolean },
    );
};

export const cancelPaymentRequestApi = async (paymentId: string, reason: string) => {
    return api.post<PaymentInfoResp>(
        `${process.env.NEXT_PUBLIC_PAY_OS_URL}/v2/payment-requests/${paymentId}/cancel`,
        reason,
        {
            needsAuth: true,
        } as any & { needsAuth?: boolean },
    );
};
