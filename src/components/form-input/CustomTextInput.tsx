'use client';
import { Form, Input } from 'antd';
import { FormItemProps, Rule } from 'antd/es/form';
import clsx from 'clsx';
const { TextArea } = Input;

export type CustomTextInputProps<T extends object> = {
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
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
} & FormItemProps<T>;

export const CustomTextInput = <T extends object>({
    label,
    name,
    rules,
    placeholder = '',
    disabled,
    classNameInput,
    spanCol,
    classNameForm,
    defaultValue,
    prefix,
    suffix,
    type = 'text',
    value,
    onChange,
    autoFocus,
}: CustomTextInputProps<T>) => {
    return (
        <Form.Item<T>
            name={name as any}
            rules={rules}
            label={label && <label className='whitespace-normal w-full'>{label}</label>}
            wrapperCol={{ span: spanCol }}
            className={clsx('m-0', classNameForm)}
        >
            <Input
                placeholder={placeholder}
                defaultValue={defaultValue}
                prefix={prefix}
                autoFocus={autoFocus}
                suffix={suffix}
                type={type}
                className={`h-[48px] ${classNameInput} `}
                disabled={disabled}
                value={value}
                onChange={onChange}
            />
        </Form.Item>
    );
};
