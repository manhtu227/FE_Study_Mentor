import { api } from '@core/https/http';
import {
    GradeResp,
    InfoExchangeInput,
    LevelResp,
    QuestionInput,
    RatingReq,
} from '@core/models/question.model';
import { objectToFormData } from '@core/parser/form-data.parser';
import { OptionItem } from '@core/types/option.type';
import { initKeys } from '@core/utilities/query-key.utility';

export const ConvertLevelToOption = (data: LevelResp): OptionItem => {
    return {
        label: data.LevelName,
        value: data.Id,
    };
};

export const levelKeys = initKeys('level-list-keys');
export const getLevelApi = async () => {
    return api.get<LevelResp[]>('/questions/levels');
};

export const gradesKeys = initKeys('grade-list-keys');
export const getGradesByLevelApi = async (id: string) => {
    return api.get<GradeResp[]>(`/questions/levels/${id}/grades`);
};

export const createQuestions = (data: QuestionInput) => {
    return api.post(
        '/questions',
        objectToFormData({ ...data, userId: '7fa92712-a755-43ab-9135-c94089f1f156' }),
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
