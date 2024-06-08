import { StepUpdateReq, updateStepQuestionApi } from '@core/services/questions.service';
import { useMutation } from '@tanstack/react-query';

export const useUpdateStepApi = () => {
    return useMutation({
        mutationFn: (data: StepUpdateReq) => updateStepQuestionApi(data),
    });
};
