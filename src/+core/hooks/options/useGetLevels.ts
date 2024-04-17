import { getStructureEducationsApi, levelsKeys } from '@core/services/questions.service';
import { useQuery } from '@tanstack/react-query';

export const useGetLevels = () => {
    const levelQuery = useQuery({
        queryKey: levelsKeys.all,
        queryFn: () => getStructureEducationsApi(),
        select: (resp) => resp.data.data,
    });

    return levelQuery.data;
};
