import { getSessionToken } from '@core/utilities/auth.utility';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import nProgress from 'nprogress';

const DEFAULT_CONFIG_ENDPOINTS = ['auth'];
const WHITELIST_ENDPOINTS = ['auth/token/account-information'];

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT,
});

const nProgressHandler = (type: 'start' | 'stop') => {
    if (typeof window !== 'object') return;
    if (type === 'start') nProgress.start();
    else nProgress.done();
};

api.interceptors.request.use(
    async (config: AxiosRequestConfig | any): Promise<any> => {
        nProgressHandler('start');
        const path = config.url;
        if (
            DEFAULT_CONFIG_ENDPOINTS.some((e) => path?.includes(e)) &&
            !WHITELIST_ENDPOINTS.some((e) => path?.includes(e))
        )
            return config;
        const token = await getSessionToken();
        if (!token) return config;

        // Thêm x-client-id và x-api-key cho các request cần thiết
        if (config.needsAuth) {
            config.headers['x-client-id'] = process.env.NEXT_PUBLIC_PAY_OS_CLIENT_ID;
            config.headers['x-api-key'] = process.env.NEXT_PUBLIC_PAY_OS_API_KEY;
        }

        if (config.vietQRAuth) {
            config.headers['x-client-id'] = process.env.NEXT_PUBLIC_VIETQR_CLIENT_ID;
            config.headers['x-api-key'] = process.env.NEXT_PUBLIC_VIETQR_API_KEY;
        }

        // Thêm header Authorization cho tất cả các request
        config.headers['Authorization'] = `Bearer ${token}`;

        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        nProgressHandler('stop');
        return response;
        // return response.data;
    },
    (error: AxiosError): Promise<AxiosError> => {
        // if (error.response?.status === 401) signOut();
        nProgressHandler('stop');
        return Promise.reject(error);
    },
);
