import { Dayjs } from 'dayjs';

export type PersonalInformationInput = {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: Dayjs;
    gender: number;
};

export type EducationInformationInput = {
    skill: string;
    levelId: string;
    gradeId: string;
};

export type CertificatesInformationInput = {
    certificateFile: any;
    name: string;
};

export type Mentor = {
    id: string;
    image: string | null;
    name: string;
    age: number;
    rating: number;
    tags: Array<string>;
};

export type UserResp = {
    Id: string;
    Email: string;
    Gender: number;
    Avatar: string;
    Skill: string;
    LevelId: string;
    FullName: string;
    Role: number;
    Phone: string;
    DateOfBirth: string;
    IsActive: boolean;
    GradeId: string;
    AverageRate: number;
    LevelName: string;
    Description: string | null;
    CreatedAt: string | null;
    UpdatedAt: string | null;
    GradeName: string;
    Order: number;
    CertificateImageUrl: string;
    CertificateName: string;
    CertificateFileName: string;
};
