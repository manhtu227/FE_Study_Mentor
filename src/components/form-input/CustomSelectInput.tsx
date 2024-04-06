'use client';

import { OptionItems } from '@core/types/option.type';
import { Form, FormItemProps, Select } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

export type CustomSelectInputProps<T> = {
    label?: React.ReactNode;
    rules?: Array<Record<string, any>>;
    wrapperCol?: number;
    disabled?: boolean;
    classNameSelect?: string;
    classNameForm?: string;
    optionsSelect: OptionItems;
    showSearch?: boolean;
    isBlue?: boolean;
} & SelectProps &
    FormItemProps<T>;

const CustomSelectInput = <T extends object>({
    label,
    name,
    rules,
    disabled,
    classNameSelect,
    classNameForm,
    optionsSelect: options,
    showSearch,
    ...rest
}: CustomSelectInputProps<T>) => {
    return (
        <Form.Item name={name} rules={rules} label={label} className={`${classNameForm} m-0`}>
            <Select
                className={`h-[48px]  ${classNameSelect}`}
                disabled={disabled}
                options={options as any}
                showSearch={showSearch}
                {...rest}
            />
        </Form.Item>
    );
};

export default CustomSelectInput;
