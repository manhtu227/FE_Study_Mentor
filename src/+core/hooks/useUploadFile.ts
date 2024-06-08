import { RcFile } from 'antd/es/upload';
import { useState } from 'react';

export function useUploadFile() {
    const [files, setFiles] = useState<string[]>([]);
    const getBase64 = (img: RcFile) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setFiles([...files, reader.result as string]);
        });
        reader.readAsDataURL(img);
    };

    return { getBase64, files, setFiles };
}
