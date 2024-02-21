import { Form, Input } from 'antd';
import { FormItemProps, Rule } from 'antd/es/form';
const { TextArea } = Input;

export type CustomTextAreaInputProps<T extends object> = {
    placeholder?: string;
    spanCol?: number;
    disabled?: boolean;
    classNameInput?: string;
    classNameForm?: string;
    type?: string;
    defaultValue?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    label?: React.ReactNode;
    rules?: Rule[];
    rows?: number;
    draggable?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    autoFocus?: boolean;
} & FormItemProps<T>;

export const CustomTextAreaInput = <T extends object>({
    label,
    name,
    rules,
    placeholder = '',
    disabled,
    classNameInput,
    spanCol,
    classNameForm,
    rows,
    draggable,
    defaultValue,
    value,
    onChange,
    autoFocus,
}: CustomTextAreaInputProps<T>) => {
    return (
        <Form.Item<T>
            name={name}
            rules={rules}
            label={label && <label className='whitespace-normal w-full'>{label}</label>}
            wrapperCol={{ span: spanCol }}
            className={classNameForm}
        >
            <TextArea
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                className={`h-full ${classNameInput}`}
                disabled={disabled}
                rows={rows}
                draggable={draggable}
                autoFocus={autoFocus}
            />
        </Form.Item>
    );
};
