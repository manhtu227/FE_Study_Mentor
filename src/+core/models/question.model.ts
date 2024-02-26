import { StaticImageData } from 'next/image';

export type QuestionInput = {
    questionLevel: string;
    level: string;
    class: string;
    timeForAnswerQuestion: number;
    contentEditor: string;
    fileContent: any;
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
