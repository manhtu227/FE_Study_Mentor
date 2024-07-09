import { toastError } from './toast.utility';

export const beforeUpload = (file: any) => {
    const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (!isJpgOrPng) {
        toastError('file must be JPG/PNG/PDF/DOCX/DOC!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        toastError('file must smaller than 10MB!');
    }
    return isJpgOrPng && isLt2M;
};
