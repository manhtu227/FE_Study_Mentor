import { api } from '@core/https/http';
import { BaseResp } from '@core/models/base.model';
import {
    CreateFileQuestionRequest,
    CreateFileQuestionResp,
    GradeResp,
    InfoExchangeInput,
    RatingReq,
    StructureEducationsResp,
    SubjectResp,
} from '@core/models/question.model';
import { objectToFormData } from '@core/parser/form-data.parser';
import { OptionItem } from '@core/types/option.type';
import { initKeys } from '@core/utilities/query-key.utility';

export const ConvertLevelToOption = (data: StructureEducationsResp): OptionItem => {
    return {
        label: data.levelName,
        value: data.id,
    };
};

export const ConvertGradeToOption = (data: GradeResp): OptionItem => {
    return {
        label: data.gradeName,
        value: data.id,
    };
};

export const ConvertSubjectToOption = (data: SubjectResp): OptionItem => {
    return {
        label: data.name,
        value: data.id,
    };
};

export const levelsKeys = initKeys('levels-keys');

export const getStructureEducationsApi = async () => {
    return api.get<BaseResp<StructureEducationsResp[]>>(`/api/questions/structure-educations`);
};

export const gradesKeys = initKeys('grades-keys');

export const subjectsKeys = initKeys('subjects-keys');

export const createQuestions = (data: CreateFileQuestionRequest, userId: string) => {
    return api.post<BaseResp<CreateFileQuestionResp>>(
        '/api/questions',
        objectToFormData({ ...data, userId: userId }),
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        },
    );
};

export const updateRatingApi = async (body: RatingReq, id: string) => {
    return api.post<void>(`questions/rating`, body);
};

export const infoDiscusKeys = initKeys('info-discuss-keys');

export const getInfoDiscussApi = async (params: { questionId: string }) => {
    return api.get<{
        data: InfoExchangeInput[];
    }>(`/questions/info-discuss`, { params });
};
