import {
    ConvertGradeToOption,
    getStructureEducationsApi,
    gradesKeys,
} from '@core/services/questions.service';
import { useQuery } from '@tanstack/react-query';

export const useGetGrades = ({ levelIds }: { levelIds?: string[] | undefined }) => {
    const levelQuery = useQuery({
        queryKey: gradesKeys.all,
        queryFn: () => getStructureEducationsApi(),
        select: (resp) => resp.data.data.filter((level) => levelIds?.includes(level.id)),
    });

    if (levelQuery.data && levelQuery.data.length > 0)
        return levelQuery.data
            .map((level) => level.grades)
            .flat()
            .map(ConvertGradeToOption);

    return null;
};
