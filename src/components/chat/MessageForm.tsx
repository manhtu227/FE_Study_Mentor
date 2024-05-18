'use client';
import SendIcon from '@assets/icons/send-icon';
import UploadIcon from '@assets/icons/upload-icon';
import { CustomTextAreaInput } from '@components/form-input/CustomTextAreaInput';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import { FileReq } from '@core/models/file.model';
import { beforeUpload } from '@core/utilities/file.utility';
import { Form, Upload, UploadFile, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import clsx from 'clsx';
import { useState } from 'react';
import UploadFileMessage from './UploadFileMessage';

const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};

export type MessageInput = {
    text: string;
    fileList: UploadFile[];
};

type MessageFormProps = {
    onSubmit: (value: string, files?: FileReq[] | null) => void;
    className?: string;
};

export default function MessageForm({ onSubmit, className }: MessageFormProps) {
    const [form] = useForm<MessageInput>();
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

    const uploadFile = useUploadFileApi();

    const handleSubmit = async (values: MessageInput) => {
        const files = await uploadFile.uploadMultipleFiles(values.fileList);
        onSubmit(values.text, files);
        setFileList([]);
        form.resetFields();
    };

    return (
        <Form
            name='chat-form'
            form={form}
            onFinish={handleSubmit}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    console.log('vao');
                    form.submit();
                }
            }}
            autoComplete='off'
            className={className}
        >
            {/* <Spin spinning={loading}> */}
            <div className={clsx('flex gap-6 items-end')}>
                <div className='cursor-pointer'>
                    <Upload
                        fileList={fileList}
                        customRequest={dummyRequest}
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
