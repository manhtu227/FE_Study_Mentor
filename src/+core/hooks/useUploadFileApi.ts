import { FileReq } from '@core/models/file.model';
import { uploadFileToCloudApi } from '@core/services/file.service';
import { getSignedUrlApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { UploadFile } from 'antd';
import { useState } from 'react';

export const useUploadFileApi = () => {
    const [isFetching, setIsFetching] = useState(false);

    const uploadToBackend = useMutation({
        mutationFn: (data: string) => getSignedUrlApi(data),
    });

    const uploadFileToCloud = useMutation({
        mutationFn: (data: { url: string; file: File }) => uploadFileToCloudApi(data),
    });

    const uploadFile = async (file: UploadFile): Promise<FileReq> => {
        setIsFetching(true);
        return new Promise((resolve, reject) => {
            uploadToBackend.mutate(file.name, {
                onSuccess: (resp) => {
                    // upload to clound
                    uploadFileToCloud.mutate(
                        {
                            file: file.originFileObj as File,
                            url: resp.data.data.url,
                        },
                        {
                            onSuccess: () => {
                                setIsFetching(false);
                                resolve({
                                    fileKey: resp.data.data.fileKey,
                                    fileName: resp.data.data.fileName,
                                });
                            },
                            onError: (error: any) => {
                                setIsFetching(false);
                                // handleError(error as AxiosError);
                                reject(error);
                            },
                        },
                    );
                },
                onError: (error) => {
                    setIsFetching(false);
                    // handleError(error as AxiosError);
                    reject(error);
                },
            });
        });
    };

    const uploadMultipleFiles = async (files: UploadFile[]): Promise<FileReq[]> => {
        return Promise.all(files.map((file) => uploadFile(file)));
    };

    return { isFetching, uploadFile, uploadMultipleFiles };
};
