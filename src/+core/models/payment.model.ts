export type CreatePaymentRequestModel = {
    orderCode: number;
    amount: number;
    description: string;
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    buyerAddress?: string;
    items?: ProductItem[];
    cancelUrl: string;
    returnUrl: string;
    expiredAt?: number;
    signature: string;
};

export type ProductItem = {
    name: string;
    quantity: number;
    price: number;
};

export type CreatePaymentResp = {
    code: string;
    desc: string;
    data: PaymenResponseData;
    signature: string;
};

export type PaymenResponseData = {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    expiredAt: number;
    checkoutUrl: string;
    qrCode: string;
};

export type PaymentInfoResp = {
    code: string;
    desc: string;
    data: PaymentInfoData;
    signature: string;
};

export type PaymentInfoData = {
    id: string;
    orderCode: number;
    amount: number;
    amountPaid: number;
    amountRemaining: number;
    status: string;
    createdAt: string;
    transactions: any[];
    cancellationReason: null;
    canceledAt: null;
};
