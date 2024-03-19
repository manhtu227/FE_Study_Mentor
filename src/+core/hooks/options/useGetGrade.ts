import { getGradesByLevelApi } from '@core/services/questions.service';
import { OptionItems } from '@core/types/option.type';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useGetGrade = () => {
    const [gradeOpts, setGradeOpts] = useState<OptionItems>([]);

    const mutateGrades = useMutation({
        mutationFn: (data: string) => getGradesByLevelApi(data),
        onSuccess: (resp) => {
            setGradeOpts(
                resp.data.map((item) => ({
                    label: item.GradeName,
                    value: item.Id,
                })),
            );
        },
    });

    return { mutateGrades, gradeOpts };
};
