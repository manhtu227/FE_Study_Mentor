import { QuestionAcceptStatus, QuestionStep, QuestionType } from '@core/enums/question.enum';
import { Rule } from 'antd/es/form';
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
    voucher?: string;
    title: string;
};

export type UploadQuestionProps = {
    name: string;
    rules?: Rule[];
    isRemoveAll?: boolean;
};

export type CreateFileQuestionRequestModel = {
    userId: string;
    subjectId: string;
    numberOfStar: number;
    timeFindTutor: number;
    content: string;
    attachFiles: FileReq[] | null;
    voucherCode?: string;
    timeMeeting?: number;
    title?: string;
};

export interface ICalculatePriceRequestModel {
    level: string;
    numberOfStar: number;
    timeFindTutor: number;
    voucherCode?: string;
}

export type QuestionResp = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    answerTime: number;
    content: string;
    price: string;
    status: number;
    isPaid: boolean;
    type: number;
    googleMeetUrl: string;
    jobRunCount: number;
    step: number;
    title?: string;
};

export type AnswerRequestModel = {
    questionId: string;
    tutorId: string;
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
    promoPrice: number;
    questionId?: string;
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
    attachFiles: FileAntd;
};

export type ReportAnswer = {
    reportContent: string;
    attachFiles?: FileAntd;
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
    price: string;
    answerTime: string;
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
    methodAnswer: QuestionType;
    title?: string;
    fileQuestions: FileReq[];
    student?: UserModel;
    type: QuestionType;
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
export interface AnswerResponseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    fileAttachmentAnswers: FileReq[];
}

export enum QuestionEnum {
    GG_MEET = 0,
    FILE = 1,
}

export type GetQuestionResponseModel = {
    questionId: string;
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
    tutor?: UserModel;
    subject: SubjectModel;
    answers: AnswerResponseModel[] | null;
    isAnswered: boolean;
    roomId?: string;
    step?: QuestionStep;
    isAccepted: boolean;
    title?: string;
    questionType: QuestionEnum;
    timeMetting?: number;
    meetingURL?: string;
};

export type AcceptQuestionModel = {
    studentId: string;
    senderId: string;
    questionId: string;
    isAccepted?: QuestionAcceptStatus;
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

export type GetGoogleMeetLinkResp = {
    meetingUrl: string;
    createdAt: string;
};

export type ReportQuestionReq = {
    questionId: string;
    studentId: string;
    attachFiles?: FileReq[] | null;
    content: string;
};

export type QuestionReportRes = {
    questionName: string;
    content: string;
    studentName: string;
    attachFiles: FileReq[];
    createdAt: string;
    questionId: string;
    questionTitle: string;
};

export type GoogleMeetInfoResp = {
    meetingUrl: string;
    createdAt: string;
};
