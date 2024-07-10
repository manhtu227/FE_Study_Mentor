import { Gender, UserType } from '@core/enums/user.enum';
import { UserResp } from './profile.model';

export type SignUpInput = {
    email: string;
    fullName: string;
    gender: Gender;
    password: string;
    type: UserType;
    dateOfBirth: number;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type IAuthenResponseModel = {
    accessToken: string;
    resetToken: string;
    user: UserResp;
};

export type SessionAccount = {
    user: IAuthenResponseModel;
    account?: any;
};

export enum Status {
    ACTIVE = 0,
    IN_ACTIVE = 1,
}

export type ChangePasswordInput = {
    oldPassword: string;
    newPassword: string;
};

export type ResetPasswordInput = {
    email: string;
};
