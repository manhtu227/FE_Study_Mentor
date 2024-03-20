import { api } from '@core/https/http';
import {
    CertificatesInformationInput,
    EducationInformationInput,
    PersonalInformationInput,
    UserResp,
} from '@core/models/profile.model';
import { objectToFormData } from '@core/parser/form-data.parser';
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
    return api.put<void>(`users/${id}/avatar`, objectToFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
