import { StaticImageData } from 'next/image';
import { FileAntd, FileReq } from './file.model';

export type QuestionInput = {
    questionLevel: string;
    levelId: string;
    gradeId: string;
    timeAnswer: number;
    tutorRating: number;
    content: string;
    attachFiles: FileAntd;
    tutorCriteria: string;
    subjectId: string;
    class: string;
    timeForAnswerQuestion: number;
    contentEditor: string;
    fileContent: any;
    numberOfStars: number;
};

export type CreateFileQuestionRequestModel = {
    userId: string;
    subjectId: string;
    numberOfStar: number;
    // price?: number
    // tutorRating: TutorRating
    // tutorCriteria?: TutorRating
    timeFindTutor: number;
    content: string;
    attachFiles: FileReq[];
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
