import UploadIconIcon from '@assets/icons/upload';
import { Form, FormItemProps, message, Upload, UploadProps } from 'antd';
const { Dragger } = Upload;

export const CustomDragDropFile = <T extends object>({ name, rules }: FormItemProps<T>) => {
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        listType: 'text',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            console.log(info);

            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Form.Item name={name} rules={rules}>
            <Dragger {...props}>
                <p className='ant-upload-drag-icon'>
                    <UploadIconIcon />
                </p>
                <p className='font-bold text-base text-gray-700'>Tải lên hoặc thả tệp tại đây</p>
            </Dragger>
        </Form.Item>
    );
};
