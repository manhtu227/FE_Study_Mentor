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
    certificatesContent: any;
    fullName: string;
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

    /*
     "Id": "8d116df8-29f3-40d2-b3c0-9b554c78f59e",
        "Email": "daniel@example.com",
        "Gender": 1,
        "Avatar": "uploads\\54153446-27e5-4111-8bc7-7778c645da54.jpg",
        "Skill": "khong cos",
        "FullName": "Jacky",
        "Role": 1,
        "Phone": "07062512432",
        "DateOfBirth": "1989-12-31T03:00:00.000Z",
        "IsActive": true,
        "LevelId": "fa8b179e-8a35-4683-826b-21a1050d3061",
        "GradeId": "8d116df8-29f3-40d2-b3c0-9b554c78f59e",
        "AverageRate": 0,
        "LevelName": "Cấp 2",
        "Description": null,
        "CreatedAt": null,
        "UpdatedAt": null,
        "GradeName": "Lớp 1",
        "Order": 1,
        "CertificateImageUrl": "uploads\\f5b70f16-38a9-4b4e-8e39-719b691d51f6.csv"
    */
};
