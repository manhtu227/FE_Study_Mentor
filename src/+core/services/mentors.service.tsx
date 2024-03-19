import { api } from '@core/https/http';
import { MentorListReq, MentorListResp } from '@core/models/mentor.model';
import { LevelResp } from '@core/models/question.model';
import { OptionItem } from '@core/types/option.type';
import { PagingResp } from '@core/types/paging.type';
import { initKeys } from '@core/utilities/query-key.utility';

export const ConvertLevelToOption = (data: LevelResp): OptionItem => {
    return {
        label: data.LevelName,
        value: data.Id,
    };
};

export const mentorListKeys = initKeys('mentor-list-keys');
export const getMentorListApi = async (params: MentorListReq) => {
    return api.get<PagingResp<MentorListResp[]>>('/tutors', { params });
};
