import { StaticImageData } from 'next/image';
import { FileAntd, FileReq } from './file.model';
import { UserModel } from './user.model';

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
    attachFiles: FileReq[] | null;
};

export type CreateFileQuestionReducer = {
    userId: string;
    subjectId: string;
    numberOfStar: number;
    questionId?: string;
    timeFindTutor: number;
    content: string;
    attachFiles: FileReq[] | null;
};

export type CreateFileQuestionResp = {
    price: number;
    questionId: string;
};

export type RatingInput = {
    numberOfStar: number;
    comment: string;
};

export type RatingReq = RatingInput & {
    tutorId: string;
    // answerId: string;
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

export type ReceiveNewQuestionModel = {
    content: string;
    price: number;
    studentId: string;
    questionId: string;
    subject: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
    };
    createdAt: Date;
};

export type ReceivedQuestion = {
    questionId: string;
    isWatchLater: boolean;
};

export type ReceivedQuestionList = {
    receivedQuestionList: ReceivedQuestion[];
};

export type SubjectModel = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description?: string;
};

export type GetQuestionResponseModel = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    answerTime: number;
    content: string;
    price: string;
    status: number;
    isPaid: boolean;
    type: number;
    fileQuestions: FileReq[] | null;
    student: UserModel;
    subject: SubjectModel;
    answers: any[];
};

export type AcceptQuestionModel = {
    studentId: string;
    senderId: string;
    questionId: string;
};

export type AcceptQuestionResp = {
    content: string;
    answerTime: number;
    price: string;
    status: number;
    isPaid: boolean;
    type: number;
    user: { id: string };
    subject: { id: string };
    jobRunCount: number;
    id: string;
    createdAt: string;
    updatedAt: string;
};
