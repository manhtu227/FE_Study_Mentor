import SendIcon from '@assets/icons/send-icon';
import UploadIcon from '@assets/icons/upload-icon';
import { CustomTextAreaInput } from '@components/form-input/CustomTextAreaInput';
import { useUploadFile } from '@core/hooks/useUploadFile';
import { beforeUpload } from '@core/utilities/file.utility';
import { Form, Upload, UploadFile, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RcFile } from 'antd/es/upload';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import UploadFileMessage from './UploadFileMessage';

export type MessageInput = {
    text: string;
    fileList: UploadFile[];
};

type MessageFormProps = {
    onSubmit: (value: string, urlFile: string[]) => void;
};

export default function MessageForm({ onSubmit }: MessageFormProps) {
    const [form] = useForm<MessageInput>();
    const { getBase64, files, setFiles } = useUploadFile();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChangeFile: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'removed') {
            setFileList(info.fileList.filter((item) => item.uid !== info.file.uid));
            return;
        }

        // xử lý sau
        if (info.file.status === 'uploading') {
            setFileList(info.fileList);
        }
        if (info.file.status === 'error') {
            setFileList(info.fileList);
        }
        if (info.file.status === 'done') {
            setFileList(info.fileList);
        }
        form.setFieldsValue({ fileList: info.fileList });
    };

    useEffect(() => {
        const fileList = form.getFieldValue('fileList') || [];
        console.log(fileList?.length);
        console.log(files?.length);
        if (files.length > 0 && fileList.length === files.length) {
            onSubmit(form.getFieldValue('text'), files);
            setFileList([]);
            setFiles([]);
            form.resetFields();
        }
    }, [files]);

    return (
        <Form
            name='chat-form'
            form={form}
            onFinish={(values) => {
                if (values.text && values.fileList === undefined) {
                    onSubmit(values.text, []);
                    form.resetFields();
                }
                for (const file of values.fileList || []) {
                    getBase64(file.originFileObj as RcFile);
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    console.log('vao');
                    form.submit();
                }
            }}
            autoComplete='off'
        >
            {/* <Spin spinning={loading}> */}
            <div className='p-6 flex gap-6 items-end'>
                <div className='cursor-pointer'>
                    <Upload
                        action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                        listType='picture-card'
                        fileList={fileList}
                        onChange={handleChangeFile}
                        multiple
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                    >
                        <UploadIcon />
                    </Upload>
                </div>
                <CustomTextAreaInput<MessageInput>
                    name='text'
                    placeholder='Nhập nội dung tin nhắn'
                    classNameInput={clsx('rce-input', 'rce-input-textarea')}
                    autoFocus
                    fileUpload={
                        fileList.length > 0 ? (
                            <UploadFileMessage fileList={fileList} onChange={handleChangeFile} />
                        ) : undefined
                    }
                    suffix={
                        <div
                            className='cursor-pointer flex items-center'
                            onClick={() => form.submit()}
                        >
                            <SendIcon />
                        </div>
                    }
                    classNameForm='w-full'
                />
            </div>
            <Form.Item<MessageInput> name='fileList' noStyle></Form.Item>
            {/* </Spin> */}
        </Form>
    );
}
