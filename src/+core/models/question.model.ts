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

    /*
    content:<h1>cau hoi demo<h1>
skill:toán học
levelId:fa8b179e-8a35-4683-826b-21a1050d3061
categoryId:354c33bb-7878-4f7d-b172-8b626ce7e505
grade:2
tutorRating:5
tutorCriteria:tiêu chí demo
timeAnswer:10
userId:7fa92712-a755-43ab-9135-c94089f1f156
    */
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
