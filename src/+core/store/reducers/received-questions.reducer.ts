import { ReceivedQuestion } from '@core/models/question.model';
import { createSlice } from '@reduxjs/toolkit';

type ReceivedQuestionsState = {
    receivedQuestions: ReceivedQuestion[];
};

const initialState: ReceivedQuestionsState = {
    receivedQuestions: [],
};

export const receivedQuestionsSlice = createSlice({
    name: 'receivedQuestions',
    initialState,
    reducers: {
        setIsWatchedLater(
            state,
            action: { payload: { questionId: string; isWatchedLater: boolean } },
        ) {
            const question = state.receivedQuestions.find(
                (n) => n.questionId === action.payload.questionId,
            );
            if (question) {
                question.isWatchLater = action.payload.isWatchedLater;
            }
        },
        addReceivedQuestion(state, action: { payload: ReceivedQuestion }) {
            state.receivedQuestions.push(action.payload);
        },
        removeReceivedQuestion(state, action: { payload: string }) {
            state.receivedQuestions = state.receivedQuestions.filter(
                (n) => n.questionId !== action.payload,
            );
        },
        clearReceivedQuestions(state) {
            state.receivedQuestions = [];
        },
    },
});

export const {
    setIsWatchedLater,
    addReceivedQuestion,
    removeReceivedQuestion,
    clearReceivedQuestions,
} = receivedQuestionsSlice.actions;

export default receivedQuestionsSlice.reducer;
