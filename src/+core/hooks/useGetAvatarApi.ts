import { getAvatarByIdTutorApi } from '@core/services/user.service';
import { useMutation } from '@tanstack/react-query';

export const useGetAvatarApi = () => {
    return useMutation({
        mutationFn: (id: string) => getAvatarByIdTutorApi(id),
    });
};
