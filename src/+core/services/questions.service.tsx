import { api } from '@core/https/http';
import { BaseResp } from '@core/models/base.model';
import {
    AnswerRequestModel,
    CreateFileQuestionRequestModel,
    CreateFileQuestionResp,
    GetQuestionResponseModel,
    GradeResp,
    InfoExchangeInput,
    RatingReq,
    StructureEducationsResp,
    SubjectResp,
} from '@core/models/question.model';
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

export const createQuestions = (data: CreateFileQuestionRequestModel) => {
    return api.post<BaseResp<CreateFileQuestionResp>>('/api/questions', data);
};

// export const updateRatingApi = async (body: RatingReq, id: string) => {
//     return api.post<void>(`questions/rating`, body);
// };

export const createRatingApi = async (body: RatingReq, questionId: string) => {
    return api.post<void>(`/api/questions/${questionId}/rating`, body);
};

export const infoDiscusKeys = initKeys('info-discuss-keys');

export const getInfoDiscussApi = async (params: { questionId: string }) => {
    return api.get<{
        data: InfoExchangeInput[];
    }>(`/questions/info-discuss`, { params });
};

export const detailedQuestionKeys = initKeys('detailed-question-keys');

export const getDetailedQuestionApi = async (questionId: string) => {
    return api.get<BaseResp<GetQuestionResponseModel>>(`/api/questions/${questionId}`);
};

export const sendAnswerToStudentApi = async (body: AnswerRequestModel) => {
    return api.post<void>(`/api/users/tutor/answer`, body);
};
