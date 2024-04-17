import { StaticImageData } from 'next/image';

export type QuestionInput = {
    questionLevel: string;
    levelId: string;
    gradeId: string;
    timeAnswer: number;
    tutorRating: number;
    content: string;
    attachFiles: any;
    tutorCriteria: string;
    subjectId: string;
    class: string;
    timeForAnswerQuestion: number;
    contentEditor: string;
    fileContent: any;
    numberOfStars: number;
};

export type CreateFileQuestionRequest = {
    userId: string;
    subjectId: string;
    timeAnswer: number;
    content: string;
    attachFiles: any;
};

export type CreateFileQuestionResp = {
    price: number;
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

export type StructureEducationsResp = {
    id: string;
    levelName: string;
    description: string;
    grades: GradeResp[];
};

export type GradeResp = {
    id: string;
    gradeName: string;
    order: number;
    subjects: SubjectResp[];
};

export type SubjectResp = {
    id: string;
    name: string;
    description: string;
};

export type InfoExchangeInput = {
    Price: string;
    AnswerTime: string;
    Subject: string;
    LevelName: string;
    payment: string;
};
