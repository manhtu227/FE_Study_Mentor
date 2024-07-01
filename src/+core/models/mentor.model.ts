import { FileReq } from './file.model';

export type MentorListResp = {
    id: string;
    Email: string;
    age: number;
    Gender: number;
    avatar: FileReq;
    Skill: string;
    fullName: string;
    Password: string;
    Role: number;
    Phone: string;
    DateOfBirth: string; // or Date type if you prefer
    IsActive: boolean;
    LevelId: string;
    GradeId: string;
    averageRate: number;
    LevelName: string;
    Description: string | null;
    CreatedAt: string | null; // or Date type if you prefer
    UpdatedAt: string | null; // or Date type if you prefer
    GradeName: string;
    Order: number;
};

export type MentorListFilter = {
    subjectId: string;
};

export type FavoriteMentorListFilter = {
    userId: string;
    page: number;
    pageSize: number;
};
