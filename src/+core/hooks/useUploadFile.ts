import { RcFile } from 'antd/es/upload';
import { useState } from 'react';

export function useUploadFile() {
    const [files, setFiles] = useState<string[]>([]);
    const getBase64 = (img: RcFile) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            console.log('vao day');
            setFiles([...files, reader.result as string]);
        });
        reader.readAsDataURL(img);
    };
    console.log(files.length, 'files');
    return { getBase64, files, setFiles };
}
