import { StaticImageData } from 'next/image';

export type QuestionInput = {
    questionLevel: string;
    levelId: string;
    grade: string;
    timeAnswer: number;
    tutorRating: number;
    content: string;
    attachFiles: any;
    tutorCriteria: string;
};

export type RatingInput = {
    starNumber: number;
    comment: string;
};

export type RatingReq = RatingInput & {
    tutorId: string;
    answerId: string;
};

export type Question = {
    id: number;
    image: StaticImageData;
    type: number;
    title: string;
    shortDescription: string;
    tags: Array<string>;
};

export type AnswerQuestion = {
    contentEditor: string;
    fileContent: any;
};

export type ReportAnswer = {
    reportContent: string;
    fileContent: any;
};

export type LevelResp = {
    Id: string;
    LevelName: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
};

export type GradeResp = {
    Id: string;
    GradeName: string;
    LevelId: string;
    Order: number;
};

export type InfoExchangeInput = {
    price: string;
    answerTime: string;
    subject: string;
    levelName: string;
    payment: string;
};
