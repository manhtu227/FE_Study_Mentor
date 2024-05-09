import { Gender, TypeUser } from '@core/enums/user.enum';
import { UserResp } from './profile.model';

export type SignUpInput = {
    email: string;
    fullName: string;
    gender: Gender;
    password: string;
    type: TypeUser;
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

export enum Status {
    ACTIVE = 0,
    IN_ACTIVE = 1,
}
