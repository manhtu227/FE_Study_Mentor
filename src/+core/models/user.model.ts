import { UserType } from '@core/enums/user.enum';
import { FileReq } from './file.model';
import { Subject } from './profile.model';

export enum UserRole {
    STUDENT = 0,
    TUTOR = 1,
    ADMIN = 2,
}

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
    subjects?: Subject[];
    certificates: FileReq[];
    isMembership: boolean;
    expirationDate: Date;
};

export type OverviewTutorInfo = {
    revenue: number;
    numberOfQuestionsAnswered: number;
    numberOfComment: number;
    numberOfStudent: number;
};

export type ChartRevenueItem = {
    date: string;
    totalCost: number;
};

export type QuestionAnsweredItem = {
    questionId: string;
    studentId: string;
    name: string;
    avatar?: FileReq;
    expense: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    isPaid: boolean;
};

export type ResetPasswordReq = {
    passwordOld: string;
    passwordNew: string;
};

export type ReportModel = {
    id: string;
    questionName: string;
    FullName: string;
    content: string;
    userId: string;
    attachFiles?: FileReq[];
    createdAt: Date;
    questionId: string;
    questionTitle: string;
    hasFeedback: boolean;
    userType: UserType;
};
