import { DatePicker, Form, FormItemProps } from 'antd';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';

export type CustomDateInputProps<T extends object> = {
    placeholder?: string;
    spanCol?: number;
    disabled?: boolean;
    classNameInput?: string;
    classNameForm?: string;
    className?: string;
    disabledBeforeDate?: boolean;
    beforeDate?: Dayjs;
    isYearOnly?: boolean;
    yearOnly?: string;
    picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
    bordered?: boolean;
    defaultValue?: string;
    value?: Dayjs | null;
    showTime?: boolean;
    labelWidth?: number;
    onChange?: (value: Dayjs | null) => void;
    classNameLabel?: string;
} & FormItemProps<T>;

export const CustomDateInput = <T extends object>({
    label,
    name,
    rules,
    placeholder = '',
    disabled,
    classNameInput,
    spanCol,
    className,
    value,
    disabledBeforeDate = false,
    beforeDate = dayjs(),
    isYearOnly,
    yearOnly,
    picker,
    bordered,
    classNameForm,
    defaultValue,
    labelWidth,
    showTime,
    onChange,
    classNameLabel,
}: CustomDateInputProps<T>) => {
    const disabledDate = (current: Dayjs) => {
        if (isYearOnly) {
            return !dayjs(current).isSame(yearOnly, 'year');
        }
        return disabledBeforeDate ? (current ? current.isBefore(beforeDate, 'day') : false) : false;
    };

    return (
        <Form.Item<T>
            name={name}
            rules={rules}
            wrapperCol={{ span: spanCol }}
            className={clsx(classNameForm, bordered === false && 'border-input-none')}
        >
            <DatePicker
                disabled={disabled}
                placeholder={placeholder}
                // bordered={bordered}
                className={clsx(`h-[39px] w-full ${classNameInput}`)}
                disabledDate={disabledDate}
                picker={picker}
                value={value}
                onChange={onChange}
                showTime={showTime ? { format: 'HH:mm' } : false}
            />
        </Form.Item>
    );
};
