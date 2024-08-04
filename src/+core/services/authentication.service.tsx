import { api } from '@core/https/http';
import {
    IAuthenResponseModel,
    LoginGoogle,
    LoginInput,
    SignUpInput,
} from '@core/models/authentication.model';
import { BaseResp } from '@core/models/base.model';

export const signUpApi = async (data: SignUpInput) => {
    return api.post<BaseResp<IAuthenResponseModel>>('/api/users/register', data);
};

export const loginApi = async (data: LoginInput) => {
    return api.post<BaseResp<IAuthenResponseModel>>('/api/users/login', data);
};

export const loginByGooogleApi = async (body: LoginGoogle) => {
    return api.post<BaseResp<IAuthenResponseModel>>('/api/auth/google', body);
};
