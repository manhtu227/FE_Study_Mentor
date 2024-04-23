import { api } from '@core/https/http';
import {
    CertificatesInformationInput,
    EducationInfoResp,
    UpdatePersonalInformationInput,
    UserResp,
} from '@core/models/profile.model';
import { objectToFormData } from '@core/parser/form-data.parser';
import { initKeys } from '@core/utilities/query-key.utility';

export const userDetailKeys = initKeys('user-detail-keys');

export const educationInfoKeys = initKeys('education-info-keys');

export const getUserDetailApi = async (id: string) => {
    return api.get<{ data: UserResp }>(`/api/users/${id}/profile`);
};

export const updateUserDetailApi = async (data: UpdatePersonalInformationInput, id: string) => {
    return api.patch<void>(`/api/users/${id}/profile`, data);
};

export const getEducationInfoApi = async (id: string) => {
    return api.get<{ data: EducationInfoResp }>(`/api/users/${id}/profile/education-interest`);
};

export const updateEducationSectionApi = async (data: string[], id: string) => {
    return api.patch<void>(`/api/users/${id}/profile/education-interest`, { subjectIds: data });
};

export const updateCertificateSectionApi = async (
    data: CertificatesInformationInput,
    id: string,
) => {
    return api.put<void>(`/users/${id}/tutor-certificate`, objectToFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateAvatarApi = async (data: { avatar: any }, id: string) => {
    return api.patch<void>(`users/${id}/avatar`, objectToFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
