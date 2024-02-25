import { SelectProps } from 'antd';

export type PersonalInformationInput = {
    fullName: string;
    phoneNumber: string;
    email: string;
    yearOfBirth: number;
    gender: number;
};

export type EducationInformationInput = {
    subjects: SelectProps;
    schoolLevel: number;
    class: number;
};

export type CertificatesInformationInput = {
    certificatesContent: any;
};
