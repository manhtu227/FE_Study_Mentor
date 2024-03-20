import { api } from '@core/https/http';
import {
    EducationInformationInput,
    PersonalInformationInput,
    UserResp,
} from '@core/models/profile.model';
import { initKeys } from '@core/utilities/query-key.utility';

export const userDetailKeys = initKeys('user-detail-keys');
export const getUserDetailApi = async (id: string) => {
    return api.get<{ data: UserResp }>(`/users/${id}`);
};

export const updateProfileSectionApi = async (data: PersonalInformationInput, id: string) => {
    return api.patch<void>(`/users/${id}`, data);
};

export const updateEducationSectionApi = async (data: EducationInformationInput, id: string) => {
    return api.patch<void>(`/users/${id}/education-interest`, data);
};
