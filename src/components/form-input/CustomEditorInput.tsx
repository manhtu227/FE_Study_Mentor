import { Form } from 'antd';
import { FormItemProps } from 'antd/es/form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CustomEditorInput = <T extends object>({
    label,
    name,
    rules,
    className,
}: FormItemProps<T>) => {
    return (
        <Form.Item<T> name={name} rules={rules} label={label} className={className}>
            <ReactQuill
                theme='snow'
                className='h-56 mb-16'
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' },
                        ],
                        ['link', 'image'],
                        ['clean'],
                    ],
                }}
            />
        </Form.Item>
    );
};
