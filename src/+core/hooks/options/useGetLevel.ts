import { ConvertLevelToOption, getLevelApi, levelKeys } from '@core/services/questions.service';
import { useQuery } from '@tanstack/react-query';

export const useGetLevel = () => {
    return useQuery({
        queryKey: levelKeys.all,
        queryFn: () => getLevelApi(),
        select: (resp) => resp.data.map(ConvertLevelToOption),
    });
};
