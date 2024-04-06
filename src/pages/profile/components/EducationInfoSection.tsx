import { PlusOutlined } from '@ant-design/icons';
import { USER_ID } from '@core/constants/commons.constant';
import { useGetGrade } from '@core/hooks/options/useGetGrade';
import { useGetLevel } from '@core/hooks/options/useGetLevel';
import { EducationInformationInput, UserResp } from '@core/models/profile.model';
import { updateEducationSectionApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputRef, Select, Spin, Tag, message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

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
        mutateUpdate.mutate({ ...values, tags: subjects });
    };

    const [subjects, setSubjects] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag: string) => {
        const newTags = subjects.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setSubjects(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue.trim() && !subjects.includes(inputValue.trim())) {
            setSubjects([...subjects, inputValue.trim()]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag: string) => (
        <span key={tag} style={{ display: 'inline-block' }}>
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        </span>
    );

    const tagChild = useMemo(() => {
        return subjects.map(forMap);
    }, [subjects]);

    const tagPlusStyle: React.CSSProperties = {
        borderStyle: 'dashed',
    };

    return (
        <Spin spinning={mutateUpdate.isPending} size='large'>
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
                    {/* School level */}
                    <div className='font-bold text-base mb-2'>Cấp học</div>
                    <Form.Item<EducationInformationInput>
                        name='levelId'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            className='h-12 font-medium text-base'
                            placeholder='Chọn cấp học'
                            onChange={(e) => mutateGrades.mutate(e)}
                            options={levelOpts.data}
                        />
                    </Form.Item>

                    {/* Class */}
                    <div className='font-bold text-base mb-2'>Khối/ Lớp</div>
                    <Form.Item<EducationInformationInput>
                        name='gradeId'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            className='h-12 font-medium text-base'
                            placeholder='Chọn khối/ lớp'
                            onChange={(e) => form.setFieldsValue({ gradeId: e })}
                            options={gradeOpts}
                        />
                    </Form.Item>

                    {/* Subjects */}
                    <div className='font-bold text-base mb-2'>Môn/ Kỹ năng</div>
                    <Form.Item<EducationInformationInput> name='skill'>
                        <div style={{ marginBottom: 16 }}>{tagChild}</div>
                        {inputVisible ? (
                            <Input
                                ref={inputRef}
                                type='text'
                                size='small'
                                style={{ width: 78 }}
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputConfirm}
                                onPressEnter={handleInputConfirm}
                            />
                        ) : (
                            <Tag onClick={showInput} style={tagPlusStyle}>
                                <PlusOutlined className='mr-2' />
                                Kỹ năng của bạn
                            </Tag>
                        )}
                    </Form.Item>
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
        </Spin>
    );
}
