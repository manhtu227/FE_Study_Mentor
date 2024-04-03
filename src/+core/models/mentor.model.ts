import { PagingReq } from '@core/types/paging.type';

export type MentorListResp = {
    Id: string;
    Email: string;
    Gender: number;
    Avatar: string | null;
    Skill: string;
    FullName: string;
    Password: string;
    Role: number;
    Phone: string;
    DateOfBirth: string; // or Date type if you prefer
    IsActive: boolean;
    LevelId: string;
    GradeId: string;
    AverageRate: number;
    LevelName: string;
    Description: string | null;
    CreatedAt: string | null; // or Date type if you prefer
    UpdatedAt: string | null; // or Date type if you prefer
    GradeName: string;
    Order: number;
};

export type MentorListFilter = {
    levelId?: string;
    gradeId?: string;
};

export type MentorListReq = MentorListFilter & PagingReq;
