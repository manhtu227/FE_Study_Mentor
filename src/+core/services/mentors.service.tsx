import { api } from '@core/https/http';
import {
    FavoriteMentorListFilter,
    MentorListFilter,
    MentorListResp,
} from '@core/models/mentor.model';
import { PagingResp } from '@core/types/paging.type';
import { initKeys } from '@core/utilities/query-key.utility';

export const mentorListKeys = initKeys('mentor-list-keys');

export const getMentorListApi = async (params: MentorListFilter) => {
    return api.get<PagingResp<MentorListResp[]>>('/api/users/tutors-online', { params });
};

export const getFavoriteMentorListApi = async (params: FavoriteMentorListFilter) => {
    return api.get<PagingResp<MentorListResp[]>>('/api/users/tutors-online/favorite', { params });
};
