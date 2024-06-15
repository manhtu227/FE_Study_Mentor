import { api } from '@core/https/http';
import { BaseResp } from '@core/models/base.model';
import { SignedUrlResp } from '@core/models/profile.model';
import axios from 'axios';

export const getSignedUrlApi = async (fileName: string) => {
    return api.post<BaseResp<SignedUrlResp>>(`/api/files/signed-url`, { fileName });
};

export const uploadFileToCloudApi = async (data: { url: string; file: File }) => {
    return axios.put<void>(data.url, data.file);
};

export const downloadFileApi = async (params: { fileKey: string }) => {
    return api.get<Blob>(`/api/files/download`, {
        params,
        responseType: 'blob',
    });
};
