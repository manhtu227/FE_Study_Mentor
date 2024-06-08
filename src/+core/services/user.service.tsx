import { api } from '@core/https/http';
import { BaseResp } from '@core/models/base.model';
import { FileAntd, FileReq } from '@core/models/file.model';
import {
    CertificatesInformationRequest,
    CertificatesSubjectNotVerifyResp,
    EducationInfoResp,
    IUserProfileResp,
    UpdatePersonalInformationInput,
    UserResp,
    UserVoucherViewModel,
} from '@core/models/profile.model';
import { OptionItem } from '@core/types/option.type';
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

export const updateCertificatesAndSubjectsApi = async (request: CertificatesInformationRequest) => {
    return api.post<void>(`/api/users/profile/tutor-certificate`, request);
};

export const subjectsCertificatedNotVerifyKeys = initKeys('subjects-certificates-keys');

export const getListSubjectsCertificatesNotVerifyApi = async () => {
    return api.get<BaseResp<CertificatesSubjectNotVerifyResp>>(
        '/api/users/profile/tutor/certificate-subject',
    );
};

export const updateAvatarApi = async (data: FileAntd) => {
    return api.patch<IUserProfileResp>(`api/users/profile/avatar`, data);
};

export const deleteSubjectsCertificatesNotVerifyApi = async () => {
    return api.delete<void>(`api/users/profile/tutor-certificate`);
};

export const convertVoucherToOption = (data: UserVoucherViewModel): OptionItem => {
    return {
        label: data.code,
        value: data.code,
    };
};

export const voucherKeys = initKeys('voucher-keys');
export const getListVoucherApi = async () => {
    return api.get<BaseResp<UserVoucherViewModel[]>>(`api/users/student/voucher`);
};

export type TutorOnlineTypeReq = {
    subjectId: string;
    page: number;
    pageSize: number;
};

export const tutorsKeys = initKeys('tutors-keys');
export const getTutorOnline = async (params: TutorOnlineTypeReq) => {
    return api.get<BaseResp<void>>(`api/users/tutor/online`, { params });
};

export type PickTutorReq = {
    tutorId: string;
    questionId: string;
};

export const pickTutor = (body: PickTutorReq) => {
    return api.post<void>('api/users/student/pick-tutor', body);
};

export const avatarTutorKeys = initKeys('avatar-tutor-keys');
export const getAvatarByIdTutor = (id: string) => {
    return api.get<FileReq>(`api/users/avatar/${id}`);
};
