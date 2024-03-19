import { api } from '@core/https/http';
import { GradeResp, LevelResp, QuestionInput } from '@core/models/question.model';
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
