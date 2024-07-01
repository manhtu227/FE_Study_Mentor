import { api } from '@core/https/http';
import { BaseResp } from '@core/models/base.model';
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

export enum PaymentType {
    QUESTION = 0,
    CHAT_AI = 1,
}

export enum ExpirationDateType {
    DAY = 0,
    WEEK = 1,
    MONTH = 2,
    YEAR = 3,
}

export type PaymentReq = {
    questionId?: string;
    type: PaymentType;
    expirationDateType?: ExpirationDateType;
    cancelUrl?: string;
    returnUrl?: string;
};

export const paymemtSystemApi = async (body: PaymentReq) => {
    return api.post<
        BaseResp<{
            checkoutUrl: string;
        }>
    >(`/api/payment/payment-link`, body);
};
