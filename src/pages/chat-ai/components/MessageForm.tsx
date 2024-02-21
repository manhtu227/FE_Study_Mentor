import SendIcon from '@assets/icons/send-icon';
import UploadIcon from '@assets/icons/upload-icon';
import { CustomTextInput } from '@components/form-input/CustomTextInput';
import Form, { useForm } from 'antd/es/form/Form';

type MessageInput = {
    text: string;
};

type MessageFormProps = {
    onSubmit: (value: string) => void;
};

export default function MessageForm({ onSubmit }: MessageFormProps) {
    const [form] = useForm<MessageInput>();

    return (
        <Form
            name='chat-form'
            form={form}
            onFinish={(values) => {
                if (!values.text) return;
                onSubmit(values.text);
                form.resetFields();
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    form.submit();
                }
            }}
            autoComplete='off'
        >
            <div className='p-6 flex gap-6 items-center'>
                <div className='cursor-pointer'>
                    <UploadIcon />
                </div>
                <CustomTextInput<MessageInput>
                    name='text'
                    placeholder='Nhập nội dung tin nhắn'
                    autoFocus
                    suffix={
                        <div className='cursor-pointer' onClick={() => form.submit()}>
                            <SendIcon />
                        </div>
                    }
                    classNameForm='w-full'
                />
            </div>
        </Form>
    );
}
