import { StepUpdateReq, updateStepQuestionApi } from '@core/services/questions.service';
import { handleError } from '@core/utilities/failure-handler.utitlity';
import { useMutation } from '@tanstack/react-query';

export const useUpdateStepApi = () => {
    return useMutation({
        mutationFn: (data: StepUpdateReq) => updateStepQuestionApi(data),
        onError: handleError,
    });
};
