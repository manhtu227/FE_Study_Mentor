import { FileReq } from './file.model';

export type UserModel = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    gender: number;
    skill?: string;
    fullName: string;
    role: number;
    phone: string;
    tutorState?: number;
    status: number;
    dateOfBirth?: number;
    averageRate: number;
    isOnline: boolean;
    avatar?: FileReq;
};
