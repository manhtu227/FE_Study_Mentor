import { api } from '@core/https/http';
import { BaseResp, BaseRespExternal } from '@core/models/base.model';
import { FileReq } from '@core/models/file.model';
import {
    BankItemResp,
    BankModel,
    CertificatesInformationRequest,
    CertificatesSubjectNotVerifyResp,
    EducationInfoResp,
    LookUpBankNumberReq,
    LookUpBankNumberResp,
    QRCodeReq,
    QRCodeResp,
    UpdatePersonalInformationInput,
    UserResp,
    UserVoucherViewModel,
} from '@core/models/profile.model';
import {
    ChartRevenueItem,
    OverviewTutorInfo,
    QuestionAnsweredItem,
    ResetPasswordReq,
} from '@core/models/user.model';
import { OptionItem } from '@core/types/option.type';
import { IPaginationInfo, PagingResp } from '@core/types/paging.type';
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

export const updateAvatarApi = async (data: FileReq) => {
    return api.patch<UserResp>(`api/users/profile/avatar`, data);
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

export const getBankListKeys = initKeys('get-bank-list-keys');

export const getBankListApi = async () => {
    return api.get<BaseRespExternal<BankItemResp[]>>(`https://api.vietqr.io/v2/banks`, {
        needsAuth: true,
    } as any & { needsAuth?: boolean });
};

export const lookUpBankNumberApi = async (request: LookUpBankNumberReq) => {
    return api.post<BaseRespExternal<LookUpBankNumberResp>>(
        `https://api.vietqr.io/v2/lookup`,
        request,
        {
            vietQRAuth: true,
        } as any & { vietQRAuth?: boolean },
    );
};

export const createQRCodeApi = async (data: QRCodeReq) => {
    return api.post<BaseRespExternal<QRCodeResp>>(`https://api.vietqr.io/v2/generate`, data, {
        vietQRAuth: true,
    } as any & { vietQRAuth?: boolean });
};

export const avatarTutorKeys = initKeys('avatar-tutor-keys');
export const getAvatarByIdTutorApi = (id: string) => {
    return api.get<FileReq>(`api/users/avatar/${id}`);
};

export const getTutorBankInfoKeys = initKeys('get-tutor-bank-info-keys');

export const getTutorBankInfoApi = async () => {
    return api.get<BaseResp<BankModel>>(`api/users/tutor/bank`);
};

export const updateTutorialBankInfoApi = async (data: BankModel) => {
    return api.put<void>(`api/users/tutor/bank`, data);
};

export const getOverviewTutorInfoKeys = initKeys('get-overview-tutor-info-keys');

export const getOverviewTutorInfoApi = async () => {
    return api.get<BaseResp<OverviewTutorInfo>>(`api/users/tutor/manage`);
};

export const getChartRevenueKeys = initKeys('get-chart-revenue-keys');

export const getChartRevenueApi = async (days: number) => {
    return api.get<BaseResp<ChartRevenueItem[]>>(`api/users/tutor/chart-revenue`, {
        params: { option: days },
    });
};

export const getListAnsweredQuestionsKeys = initKeys('get-list-answered-questions-keys');

export const getListAnsweredQuestionsApi = async (params: IPaginationInfo) => {
    return api.get<PagingResp<QuestionAnsweredItem[]>>(`api/users/tutor/list-answered`, { params });
};

export const createGoogleMeetApi = (body: PickTutorReq) => {
    return api.post<BaseResp<{ meetingURL: string }>>(`api/users/create/ggMeet`, body);
};

export const changePasswordApi = async (data: ResetPasswordReq) => {
    return api.put<void>(`api/users/password/change-password`, data);
};
