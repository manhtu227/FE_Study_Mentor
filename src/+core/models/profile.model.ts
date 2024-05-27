import { Gender } from '@core/enums/user.enum';
import { Dayjs } from 'dayjs';
import { FileAntd, FileReq } from './file.model';

export type PersonalInformationInput = {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: Dayjs;
    gender: Gender;
};

export type UpdatePersonalInformationInput = {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: number;
    gender: Gender;
};

export type EducationInformationInput = {
    subjectIds: string[];
    levelIds: string[];
    gradeIds: string[];
    certificateFiles: FileAntd;
};

export type CertificatesInformationRequest = {
    certificates: FileReq[] | null;
    subjectIds: string[];
    userId: string;
};

export type CertificatesSubjectNotVerifyResp = {
    userId: string;
    certificates: FileReq[];
    subjects: Subject[];
};

export type Subject = {
    id: string;
    name: string;
};

export type MentorType = {
    id: string;
    image: string | null;
    name: string;
    age: number;
    rating: number;
};

export type UserResp = {
    id: string;
    fullName: string;
    email: string;
    role: number;
    phone: string;
    dateOfBirth: Date;
    gender: number;
    isActive: boolean;
    averageRate: number;
};

export type EducationInfoResp = {
    subjects: ISubject[];
};

export type ISubject = {
    id: string;
    name: string;
};

export type IGrade = {
    id: string;
    name: string;
};

export type ILevel = {
    id: string;
    name: string;
};

export type SignedUrlResp = {
    fileKey: string;
    fileName: string;
    url: string;
};

export type FileObject = {
    fileKey: string;
    fileName: string;
};

export type IUserProfileResp = {
    id: string;
    email: string;
    gender: Gender;
    avatar?: FileObject;
    fullName: string;
    role: any;
    phone: string;
    dateOfBirth?: Date;
    isActive: boolean;
    averageRate: number;
};
