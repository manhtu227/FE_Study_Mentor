import {
    ConvertSubjectToOption,
    getStructureEducationsApi,
    gradesKeys,
    levelsKeys,
    subjectsKeys,
} from '@core/services/questions.service';
import { useQuery } from '@tanstack/react-query';

export const useGetSubjects = ({ levelId, gradeId }: { levelId?: string; gradeId?: string }) => {
    const gradeQuery = useQuery({
        queryKey: [levelsKeys.all, subjectsKeys.all, gradesKeys.all],
        queryFn: () => getStructureEducationsApi(),
        select: (resp) =>
            resp.data.data
                .find((level) => level.id === levelId)
                ?.grades.find((grade) => grade.id === gradeId),
    });
    console.log(levelId, gradeId);

    if (gradeQuery.data?.subjects && gradeQuery.data.subjects.length > 0)
        return gradeQuery.data.subjects.map(ConvertSubjectToOption);

    return null;
};
