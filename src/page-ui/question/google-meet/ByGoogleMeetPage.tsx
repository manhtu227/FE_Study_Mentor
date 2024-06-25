'use client';
import images from '@assets/images';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { CustomEditorInput } from '@components/form-input/CustomEditorInput';
import CustomSelectInput from '@components/form-input/CustomSelectInput';
import { useGetLevels } from '@core/hooks/options/useGetLevels';
import { QuestionInput } from '@core/models/question.model';
import {
    ConvertGradeToOption,
    ConvertLevelToOption,
    ConvertSubjectToOption,
} from '@core/services/questions.service';
import { Button, Form } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

export default function CreateQuestionByGoogleMeetPage() {
    const levelData = useGetLevels();
    const [form] = Form.useForm<QuestionInput>();

    const [selectedLevel, setSelectedLevel] = useState<string>('');
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');

    const levelOptions = levelData?.map(ConvertLevelToOption) ?? [];
    const filteredGrades = levelData?.find((level) => level.id === selectedLevel)?.grades ?? [];
    const gradeOptions = filteredGrades.map(ConvertGradeToOption);
    const subjectData = filteredGrades.find((grade) => grade.id === selectedGrade)?.subjects ?? [];
    const subjectOptions = subjectData?.map(ConvertSubjectToOption) ?? [];

    const handleChangeLevels = (newLevel: string) => {
        setSelectedLevel(newLevel);
        form.setFieldsValue({ levelId: newLevel });

        handleUpdateGradesWhenChanging();
        handleUpdateSubjectsWhenChanging();
    };

    const handleChangeGrades = (newGrades: string) => {
        setSelectedGrade(newGrades);
        form.setFieldsValue({ gradeId: newGrades });

        handleUpdateSubjectsWhenChanging();
    };

    const handleUpdateSubjectsWhenChanging = () => {
        setSelectedSubject('');
        form.setFieldsValue({ subjectId: undefined });
    };

    const handleUpdateGradesWhenChanging = () => {
        setSelectedGrade('');
        form.setFieldsValue({ gradeId: undefined });
    };

    const handleChangeSubjects = (value: string) => {
        setSelectedSubject(value);
        form.setFieldsValue({ subjectId: value });
    };

    return (
        <div className='w-full p-8 shadow-lg'>
            <h2 className='text-3xl leading-[27px] text-center'>Trả lời thông qua Google meet</h2>
            <div className='w-full flex justify-center'>
                <form className='p-4 w-1/2'>
                    <div className='flex flex-row gap-8'>
                        <div>
                            <div className='mb-5'>
                                <p className='text-[16px] leading-6 font-bold mb-2 text-gray-900 dark:text-white'>
                                    Thời gian giải đáp
                                </p>
                                <CustomSelectInput<QuestionInput>
                                    name='timeForAnswerQuestion'
                                    placeholder='Nhập số phút'
                                    optionsSelect={[
                                        { label: '15 phút', value: 15 },
                                        { label: '30 phút', value: 30 },
                                        { label: '45 phút', value: 45 },
                                        { label: '60 phút', value: 60 },
                                        { label: '120 phút', value: 120 },
                                    ]}
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Chọn cấp học
                                </p>
                                <CustomSelectInput<QuestionInput>
                                    name='levelId'
                                    placeholder='Chọn cấp học'
                                    optionsSelect={levelOptions}
                                    onChange={handleChangeLevels}
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Lớp
                                </p>
                                <CustomSelectInput<QuestionInput>
                                    classNameForm=' w-[530px]'
                                    name='gradeId'
                                    placeholder='Chọn lớp'
                                    optionsSelect={gradeOptions}
                                    onChange={handleChangeGrades}
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Chủ đề
                                </p>
                                <CustomSelectInput<QuestionInput>
                                    name='subjectId'
                                    classNameForm=' w-[530px]'
                                    placeholder='Chọn chủ đề'
                                    optionsSelect={subjectOptions}
                                    onChange={handleChangeSubjects}
                                />
                            </div>
                            <div className='mb-5'>
                                <p className=' mb-2 text-[16px] leading-6 font-bold text-gray-900 dark:text-white'>
                                    Thời gian bạn muốn hệ thống tìm kiếm
                                </p>
                                <CustomSelectInput<QuestionInput>
                                    name='timeAnswer'
                                    classNameForm=' w-[530px]'
                                    placeholder='Chọn thời gian bạn muốn hệ thống tìm kiếm'
                                    optionsSelect={[]}
                                />
                            </div>
                            {/* Question content */}
                            <Form.Item className='mb-0'>
                                <div className='font-bold text-base mb-2'>Nội dung câu hỏi</div>
                                <CustomEditorInput<QuestionInput>
                                    name='content'
                                    rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                                />
                                <CustomDragDropFile<QuestionInput>
                                    name='attachFiles'
                                    // rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <Button className='flex items-center justify-center text-white bg-blue-700 group text-[15px] leading-[22.5px] py-6 px-10'>
                        <span className='text-white-900 group-hover:text-blue-700'>
                            Tìm kiếm người hướng dẫn
                        </span>
                    </Button>
                </form>
                <div className='float-right mt-24 '>
                    <img src={images.gg.src} alt='' />
                </div>
            </div>
            <div className='text-center text-[14px] leading-[21px] '>
                Bạn cảm thấy mức giá không phù hợp?
                <Link
                    href='https://ant.design'
                    target='_blank'
                    className='text-[#3D64EE] font-bold text-[15px] leading-[22.5px] ml-2 no-underline'
                >
                    Tùy chọn khác
                </Link>
            </div>
        </div>
    );
}
