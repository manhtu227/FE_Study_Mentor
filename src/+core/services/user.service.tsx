import { api } from '@core/https/http';
import { BaseResp } from '@core/models/base.model';
import { FileAntd } from '@core/models/file.model';
import {
    CertificatesInformationInput,
    EducationInfoResp,
    IUserProfileResp,
    SignedUrlResp,
    UpdatePersonalInformationInput,
    UserResp,
} from '@core/models/profile.model';
import { objectToFormData } from '@core/parser/form-data.parser';
import { initKeys } from '@core/utilities/query-key.utility';

export const userDetailKeys = initKeys('user-detail-keys');

export const educationInfoKeys = initKeys('education-info-keys');

export const getUserDetailApi = async () => {
    return api.get<{ data: UserResp }>(`/api/users/profile`);
};

export const updateUserDetailApi = async (data: UpdatePersonalInformationInput) => {
    return api.patch<void>(`/api/users/profile`, data);
};

export const getEducationInfoApi = async () => {
    return api.get<{ data: EducationInfoResp }>(`/api/users/profile/education-interest`);
};

export const updateEducationSectionApi = async (data: string[]) => {
    return api.patch<void>(`/api/users/profile/education-interest`, { subjectIds: data });
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

export const updateAvatarApi = async (data: FileAntd) => {
    return api.patch<IUserProfileResp>(`api/users/profile/avatar`, data);
};
