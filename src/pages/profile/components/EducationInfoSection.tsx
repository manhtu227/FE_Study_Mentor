import { useGetLevels } from '@core/hooks/options/useGetLevels';
import { EducationInfoResp, EducationInformationInput } from '@core/models/profile.model';
import { GradeResp, StructureEducationsResp } from '@core/models/question.model';
import {
    ConvertGradeToOption,
    ConvertLevelToOption,
    ConvertSubjectToOption,
} from '@core/services/questions.service';
import { updateEducationSectionApi } from '@core/services/user.service';
import { RootState } from '@core/store';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Select, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function EducationInfoSection({ data }: { data?: EducationInfoResp }) {
    const [form] = Form.useForm<EducationInformationInput>();
    const [initialDataForm, setInitialDataForm] = useState<EducationInformationInput>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [levels, setLevels] = useState<string[]>([]);
    const [grades, setGrades] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);
    const user = useSelector((state: RootState) => state.authentication)?.user ?? '';

    const levelData = useGetLevels();
    const levelOptions = levelData?.map(ConvertLevelToOption) ?? [];
    // Filter grades based on selected levels
    const filteredGrades =
        levelData
            ?.filter((level) => levels?.includes(level.id))
            .map((level) => level.grades)
            .flat() || []; // Handle empty grades case

    const gradeOptions = filteredGrades.map(ConvertGradeToOption);
    const subjectData = filteredGrades
        .filter((grade) => grades?.includes(grade.id))
        .map((grade) => grade.subjects)
        .flat();
    const subjectOptions = subjectData?.map(ConvertSubjectToOption) ?? [];

    const mutateUpdate = useMutation({
        mutationFn: (subjectIds: string[]) => updateEducationSectionApi(subjectIds, user?.id),
        onSuccess: () => {
            message.success('Cập nhật thông tin thành công');
            setIsEdit(false);
        },
    });

    const handleSubmitEducationInformationForm = (values: EducationInformationInput) => {
        if (JSON.stringify(values.subjectIds) === JSON.stringify(initialDataForm?.subjectIds)) {
            setIsEdit(false);
            message.warning('Bạn chưa thay đổi thông tin môn học nên không thể cập nhật!');
            initialDataForm && form.setFieldsValue(initialDataForm);
        } else if (JSON.stringify(values) !== JSON.stringify(initialDataForm)) {
            mutateUpdate.mutate(values.subjectIds);
            setInitialDataForm(values);
        }
    };

    const handleChangeSubjects = (values: string[]) => {
        setSubjects(values);
        form.setFieldsValue({ subjectIds: values });
    };

    const handleChangeLevels = (newLevels: string[]) => {
        const currentLevels = levelData?.filter((level) => newLevels?.includes(level.id));

        currentLevels && handleUpdateGradesWhenChangeLevel(currentLevels);
        setLevels(newLevels);
        form.setFieldsValue({ levelIds: newLevels });

        currentLevels && handleUpdateSubjectsWhenChangeLevel(currentLevels);
    };

    const handleChangeGrades = (newGrades: string[]) => {
        const currentGrades = filteredGrades.filter((grade) => newGrades?.includes(grade.id));

        setGrades(newGrades);
        form.setFieldsValue({ gradeIds: newGrades });

        currentGrades && handleUpdateSubjectsWhenChangeGrades(currentGrades);
    };

    const handleUpdateSubjectsWhenChangeGrades = (currentGrades: GradeResp[]) => {
        const currentSubjects = currentGrades
            ?.map((grade) => grade.subjects)
            .flat()
            .map(ConvertSubjectToOption);
        const newSubjects = subjects?.filter((selectedSubject) =>
            currentSubjects?.map((subject) => subject.value).includes(selectedSubject),
        );

        setSubjects(newSubjects);
        form.setFieldsValue({ subjectIds: newSubjects });
    };

    const handleUpdateSubjectsWhenChangeLevel = (currentLevels: StructureEducationsResp[]) => {
        const currentSubjects = currentLevels
            ?.map((level) => level.grades)
            .flat()
            .map((grade) => grade.subjects)
            .flat()
            .map(ConvertSubjectToOption);
        const newSubjects = subjects?.filter((selectedSubject) =>
            currentSubjects?.map((subject) => subject.value).includes(selectedSubject),
        );

        setSubjects(newSubjects);
        form.setFieldsValue({ subjectIds: newSubjects });
    };

    const handleUpdateGradesWhenChangeLevel = (currentLevels: StructureEducationsResp[]) => {
        const currentGrades = currentLevels
            ?.map((level) => level.grades)
            .flat()
            .map(ConvertGradeToOption);
        const newGrades = grades?.filter((selectedGrade) =>
            currentGrades?.map((grade) => grade.value).includes(selectedGrade),
        );

        setGrades(newGrades);
        form.setFieldsValue({ gradeIds: newGrades });
    };

    useEffect(() => {
        if (data) {
            const initLevels = data.levels.map((level) => level.id);
            const initGrades = data.grades.map((grade) => grade.id);
            const initSubjects = data.subjects.map((subject) => subject.id);

            setLevels(initLevels);
            setGrades(initGrades);
            setSubjects(initSubjects);
            setInitialDataForm({
                levelIds: initLevels,
                gradeIds: initGrades,
                subjectIds: initSubjects,
            });

            form.setFieldsValue({ levelIds: initLevels });
            form.setFieldsValue({ gradeIds: initGrades });
            form.setFieldsValue({ subjectIds: initSubjects });
        }
    }, [data]);

    const handleCancelUpdate = () => {
        setIsEdit(false);

        if (initialDataForm) {
            form.setFieldsValue(initialDataForm);
            setLevels(initialDataForm.levelIds);
            setGrades(initialDataForm.gradeIds);
            setSubjects(initialDataForm.subjectIds);
        }
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
                    disabled={!isEdit}
                >
                    {/* School level */}
                    <div className='font-bold text-base mb-2'>Cấp học</div>
                    <Form.Item<EducationInformationInput>
                        name='levelIds'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            mode='multiple'
                            className='h-12 font-medium text-base'
                            placeholder='Chọn cấp học'
                            onChange={handleChangeLevels}
                            options={levelOptions}
                            value={levels}
                        />
                    </Form.Item>

                    {/* Class */}
                    <div className='font-bold text-base mb-2'>Khối/ Lớp</div>
                    <Form.Item<EducationInformationInput>
                        name='gradeIds'
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select
                            mode='multiple'
                            className='h-12 font-medium text-base'
                            placeholder='Chọn khối/ lớp'
                            onChange={handleChangeGrades}
                            options={gradeOptions}
                            value={grades}
                        />
                    </Form.Item>

                    {/* Subjects */}
                    <div className='font-bold text-base mb-2'>Môn/ Kỹ năng</div>
                    <Form.Item<EducationInformationInput> name='subjectIds'>
                        <Select
                            mode='multiple'
                            className='h-12 font-medium text-base'
                            placeholder='Chọn môn/ kỹ năng'
                            onChange={handleChangeSubjects}
                            options={subjectOptions}
                            value={subjects}
                        />
                    </Form.Item>
                    <div className='flex gap-4'>
                        {isEdit && (
                            <Button
                                size='large'
                                className='!h-12 !w-[200px] font-bold text-base bg-gray-300'
                                onClick={handleCancelUpdate}
                            >
                                Hủy
                            </Button>
                        )}
                        {isEdit && (
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
                        )}
                    </div>
                </Form>
                {!isEdit && (
                    <Button
                        size='large'
                        type='primary'
                        className='!h-12 !w-[200px] font-bold text-base'
                        onClick={() => setIsEdit(true)}
                    >
                        Cập nhật
                    </Button>
                )}
            </div>
        </Spin>
    );
}
