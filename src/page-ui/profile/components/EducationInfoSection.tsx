import { DownloadOutlined } from '@ant-design/icons';
import { CustomDragDropFile } from '@components/form-input/CustomDragDropFile';
import { useGetLevels } from '@core/hooks/options/useGetLevels';
import { useUploadFileApi } from '@core/hooks/useUploadFileApi';
import {
    CertificatesInformationRequest,
    CertificatesSubjectNotVerifyResp,
    EducationInfoResp,
    EducationInformationInput,
} from '@core/models/profile.model';
import { GradeResp, StructureEducationsResp } from '@core/models/question.model';
import {
    ConvertGradeToOption,
    ConvertLevelToOption,
    ConvertSubjectToOption,
} from '@core/services/questions.service';
import {
    deleteSubjectsCertificatesNotVerifyApi,
    getListSubjectsCertificatesNotVerifyApi,
    subjectsCertificatedNotVerifyKeys,
    updateCertificatesAndSubjectsApi,
} from '@core/services/user.service';
import { downloadUrl } from '@core/utilities/download.util';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { imageUtility } from '@core/utilities/image.utility';
import { toastSuccess } from '@core/utilities/toast.utility';
import {
    InvalidateQueryFilters,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { Button, Form, Select, Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function EducationInfoSection({ data }: { data?: EducationInfoResp }) {
    const [form] = Form.useForm<EducationInformationInput>();
    const [initialDataForm, setInitialDataForm] = useState<EducationInfoResp>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [levels, setLevels] = useState<string[]>([]);
    const [grades, setGrades] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);
    const file = useUploadFileApi();
    const [certificatesSubjectNotVerify, setCertificatesSubjectNotVerify] =
        useState<CertificatesSubjectNotVerifyResp>();

    const { data: dataUser } = useSession();
    const queryClient = useQueryClient();

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
        mutationFn: (request: CertificatesInformationRequest) =>
            updateCertificatesAndSubjectsApi(request),
        onSuccess: () => {
            toastSuccess('Gửi thành công');
            setIsEdit(false);
            queryClient.invalidateQueries(
                subjectsCertificatedNotVerifyKeys.all as InvalidateQueryFilters,
            );
        },
        onError: handleError,
    });

    const deleteSubjectsCertificatesNotVerifyMutation = useMutation({
        mutationFn: () => deleteSubjectsCertificatesNotVerifyApi(),
        onSuccess: () => {
            toastSuccess('Hủy đăng ký môn học thành công');
            queryClient.invalidateQueries(
                subjectsCertificatedNotVerifyKeys.all as InvalidateQueryFilters,
            );
        },
        onError: handleError,
    });

    const subjectsCertificatesQuery = useQuery({
        queryKey: subjectsCertificatedNotVerifyKeys.all,
        queryFn: () => getListSubjectsCertificatesNotVerifyApi(),
    });

    const handleSubmitEducationInformationForm = async (values: EducationInformationInput) => {
        const attachFiles =
            file && (await file.uploadMultipleFiles(values?.certificateFiles?.fileList));
        const request: CertificatesInformationRequest = {
            userId: dataUser?.user?.user?.id || '',
            certificates: attachFiles,
            subjectIds: values.subjectIds,
        };

        mutateUpdate.mutate(request);
        form.resetFields();
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

    const handleCancelUpdate = () => {
        setIsEdit(false);
        form.resetFields();
    };

    useEffect(() => {
        if (data) {
            setInitialDataForm({
                subjects: data.subjects,
            });
        }
    }, [data]);

    useEffect(() => {
        if (
            subjectsCertificatesQuery.data?.data?.data &&
            subjectsCertificatesQuery.data?.data?.data?.subjects
        ) {
            setCertificatesSubjectNotVerify(subjectsCertificatesQuery.data?.data.data);
        } else {
            setCertificatesSubjectNotVerify(undefined);
        }
    }, [subjectsCertificatesQuery.data]);

    const handleAddNewSubject = () => {
        setIsEdit(true);
    };

    const handleCancelUpdateCertificationsSubjects = () => {
        deleteSubjectsCertificatesNotVerifyMutation.mutate();
    };

    const isDisabledAddNewSubject =
        certificatesSubjectNotVerify && certificatesSubjectNotVerify?.subjects?.length !== 0;

    return (
        <Spin spinning={mutateUpdate.isPending} size='large'>
            <div className='w-full mb-4'>
                <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                    <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                    Thông tin giáo dục quan tâm
                </div>
                <div className='bg-gray-200 w-full min-h-[100px] rounded-md mb-8 p-4'>
                    <div className='font-bold '>Danh sách môn học đã được duyệt</div>
                    <ul className='mt-6'>
                        {initialDataForm?.subjects && initialDataForm?.subjects.length > 0
                            ? initialDataForm?.subjects.map((subject) => {
                                  return <li key={subject.id}>{subject.name}</li>;
                              })
                            : 'Không có môn học nào được duyệt'}
                    </ul>
                </div>
                <div className='bg-gray-200 w-full min-h-[100px] rounded-md mb-8 p-4'>
                    <div className='font-bold '>
                        Danh sách môn học chưa được duyệt và chứng chỉ đi kèm
                    </div>
                    {certificatesSubjectNotVerify?.subjects &&
                    certificatesSubjectNotVerify?.subjects.length > 0 ? (
                        <>
                            <ul className='mt-6 '>
                                {certificatesSubjectNotVerify?.subjects.map((subject) => {
                                    return <li key={subject.id}>{subject.name}</li>;
                                })}
                            </ul>
                            <ul className='flex gap-2 flex-wrap pl-0'>
                                {certificatesSubjectNotVerify?.certificates?.map((certificate) => {
                                    return (
                                        <div
                                            key={certificate.fileKey}
                                            className='border rounded-lg border-black-600 flex items-center justify-between p-4 border-solid w-full'
                                        >
                                            <div className='flex items-center text-base truncate max-w-2/3'>
                                                {certificate.fileName}
                                            </div>
                                            <DownloadOutlined
                                                className='text-[#4EA8B4] text-2xl cursor-pointer'
                                                onClick={async () => {
                                                    await downloadUrl(
                                                        imageUtility(certificate.fileKey),
                                                    );
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </ul>
                            <Button
                                size='large'
                                type='dashed'
                                className='!h-12 !w-[200px] font-bold text-base mt-10 bg-red-400 text-white-900 !hover:text-white-900 hover:bg-red-500'
                                onClick={handleCancelUpdateCertificationsSubjects}
                            >
                                Hủy đăng ký môn học
                            </Button>
                        </>
                    ) : (
                        <div className='flex items-center justify-center mt-6'>
                            Không có môn học nào chưa được duyệt
                        </div>
                    )}
                </div>
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
                        rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
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
                        rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
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
                    <div className='w-full font-bold text-lg text-black mb-8 items-center flex'>
                        <div className='h-[27px] w-[3px] bg-primary-600 mr-2 inline-block' />
                        Tải lên chứng chỉ để minh chứng
                    </div>
                    <div className='font-bold text-base mb-2'>Tên chứng chỉ</div>
                    <Form.Item<EducationInformationInput> name='certificateFiles'>
                        <CustomDragDropFile<EducationInformationInput> name='certificateFiles' />
                    </Form.Item>
                    {isEdit && (
                        <div className='flex items-center justify-center mt-10 gap-4'>
                            <Button
                                size='large'
                                type='dashed'
                                className='!h-12 !w-[200px] font-bold text-base bg-gray-400 text-white-900'
                                onClick={handleCancelUpdate}
                            >
                                Hủy
                            </Button>
                            <Form.Item className='mb-0'>
                                <Button
                                    type='primary'
                                    size='large'
                                    htmlType='submit'
                                    className='!h-12 font-bold text-base !w-[200px]'
                                >
                                    Gửi
                                </Button>
                            </Form.Item>
                        </div>
                    )}
                </Form>
                {isDisabledAddNewSubject && (
                    <div className='text-red-400 text-sm italic'>
                        Đã có môn học đang chờ duyệt, không thể đăng ký thêm.
                    </div>
                )}
                {!isEdit && (
                    <Button
                        size='large'
                        type='primary'
                        disabled={isDisabledAddNewSubject}
                        className='!h-12 !w-[200px] font-bold text-base mt-4'
                        onClick={handleAddNewSubject}
                    >
                        Đăng ký thêm môn học
                    </Button>
                )}
            </div>
        </Spin>
    );
}
