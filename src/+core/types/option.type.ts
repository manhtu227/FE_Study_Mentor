import { DefaultOptionType } from 'antd/es/select';

export type OptionItem = {
    label: string | React.ReactNode;
    value: string | number | boolean;
    // disabled?: boolean;
} & DefaultOptionType;

export type OptionItems = OptionItem[];
