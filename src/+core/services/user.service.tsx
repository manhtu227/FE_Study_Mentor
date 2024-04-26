import { api } from '@core/https/http';
import { BaseResp } from '@core/models/base.model';
import {
    CertificatesInformationInput,
    EducationInfoResp,
    FileObject,
    IUserProfileResp,
    SignedUrlResp,
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

export const getSignedUrlApi = async (fileName: string) => {
    return api.post<BaseResp<SignedUrlResp>>(`/api/files/signed-url`, { fileName });
};

export const downloadFileApi = async (fileKey: string) => {
    return api.get<Blob>(`/api/files/download?filekey=${fileKey}`, {
        responseType: 'blob',
    });
};

export const previewFileApi = async (fileKey: string) => {
    return api.get<string>(`/api/files/link-preview?filekey=${fileKey}`);
};

export const updateAvatarApi = async (data: FileObject, id: string) => {
    return api.patch<IUserProfileResp>(`api/users/${id}/profile/avatar`, data);
};
