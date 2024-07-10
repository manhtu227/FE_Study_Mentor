import { toastError } from './toast.utility';

export const beforeUpload = (file: any) => {
    const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (!isJpgOrPng) {
        toastError('file phải có định dạng là JPG/PNG/PDF/DOCX/DOC!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
        toastError('file có kích thước nhỏ hơn 10MB!');
    }

    return isJpgOrPng && isLt10M;
};
