import UploadIconIcon from '@assets/icons/upload';
import { beforeUpload } from '@core/utilities/file.utility';
import { Form, FormItemProps, Upload, UploadProps } from 'antd';
import { useState } from 'react';
const { Dragger } = Upload;

export const CustomDragDropFile = <T extends object>({ name, rules }: FormItemProps<T>) => {
    const [fileList, setFileList] = useState<any>(undefined);

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        listType: 'picture',
        beforeUpload: beforeUpload,
        onChange(info) {
            const { status } = info.file;
            if (status === 'uploading') {
                setFileList(info.fileList);
            } else if (status === 'done') {
                setFileList(info.fileList);
            } else if (status === 'error') {
                setFileList(info.fileList.map((file: any) => ({ ...file, status: 'done' })));
            }
        },
        onRemove(file) {
            setFileList((fileList: any) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                return newFileList;
            });
        },
    };

    return (
        <Form.Item name={name} rules={rules}>
            <Dragger {...props} fileList={fileList}>
                <p className='ant-upload-drag-icon'>
                    <UploadIconIcon />
                </p>
                <p className='font-bold text-base text-gray-700'>Tải lên hoặc thả tệp tại đây</p>
            </Dragger>
        </Form.Item>
    );
};
