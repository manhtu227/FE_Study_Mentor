import { USER_ID } from '@core/constants/commons.constant';
import { useGetGrade } from '@core/hooks/options/useGetGrade';
import { useGetLevel } from '@core/hooks/options/useGetLevel';
import { EducationInformationInput, UserResp } from '@core/models/profile.model';
import { updateEducationSectionApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect } from 'react';

export function EducationInfoSection({ data }: { data?: UserResp }) {
    const [form] = Form.useForm<EducationInformationInput>();

    /* get options api */
    const levelOpts = useGetLevel();
    const { mutateGrades, gradeOpts } = useGetGrade();

    const mutateUpdate = useMutation({
        mutationFn: (data: EducationInformationInput) => updateEducationSectionApi(data, USER_ID),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
        },
    });

    useEffect(() => {
        if (data) {
            mutateGrades.mutate(data.LevelId);
            form.setFieldsValue({
                skill: data.Skill,
                levelId: data.LevelId,
                gradeId: data.GradeId,
            });
        }
    }, [data]);

    const handleSubmitEducationInformationForm = (values: EducationInformationInput) => {
        mutateUpdate.mutate(values);
    };

    return (
        <div className='w-full mb-8'>
            <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                Thông tin giáo dục quan tâm
            </div>
            <div className='bg-blue-400 w-full h-[100px] rounded-md mb-8' />
            <Form
                name='educationInformationForm'
                form={form}
                onFinish={handleSubmitEducationInformationForm}
                autoComplete='off'
            >
                {/* Subjects */}
                <div className='font-bold text-base mb-2'>Môn/ Kỹ năng</div>
                <Form.Item<EducationInformationInput>
                    name='skill'
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input
                        className='h-12 font-medium text-base text-gray-700'
                        placeholder='Nhập môn/ kỹ năng quan tâm'
                    />
                </Form.Item>

                <div className='flex items-center gap-8 w-full'>
                    {/* School level */}
                    <div className='w-1/2'>
                        <div className='font-bold text-base mb-2'>Cấp học</div>
                        <Form.Item<EducationInformationInput>
                            name='levelId'
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn cấp học'
                                onChange={(e) => mutateGrades.mutate(e)}
                                options={levelOpts.data}
                            />
                        </Form.Item>
                    </div>

                    {/* Class */}
                    <div className='w-1/2'>
                        <div className='font-bold text-base mb-2'>Lớp</div>
                        <Form.Item<EducationInformationInput>
                            name='gradeId'
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                className='h-12 font-medium text-base text-gray-700'
                                placeholder='Chọn lớp'
                                onChange={(e) => form.setFieldsValue({ gradeId: e })}
                                options={gradeOpts}
                            />
                        </Form.Item>
                    </div>
                </div>

                <Form.Item colon={false}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        className='!h-12 !w-[200px] font-bold text-base bg-primary-800'
                    >
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
