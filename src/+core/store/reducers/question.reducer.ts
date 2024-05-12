import { CreateFileQuestionReducer } from '@core/models/question.model';
import { createSlice } from '@reduxjs/toolkit';

interface QuestionsState {
    questions: CreateFileQuestionReducer[];
    currentQuestionId: string;
}

const initialState: QuestionsState = {
    questions: [],
    currentQuestionId: '',
};

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setCurrentQuestionId: (state, action: { payload: string }) => {
            state.currentQuestionId = action.payload;
        },
        removeCurrentQuestionId: (state) => {
            state.currentQuestionId = '';
        },
        addQuestion: (state, action: { payload: CreateFileQuestionReducer }) => {
            state.questions = [...state.questions, action.payload];
        },
        removeQuestion: (state, action: { payload: CreateFileQuestionReducer }) => {
            state.questions = state.questions.filter(
                (question) => question.questionId !== action.payload.questionId,
            );
        },
        removeAllQuestion: (state) => {
            state.questions = [];
        },
    },
});

export const {
    addQuestion,
    removeQuestion,
    removeAllQuestion,
    setCurrentQuestionId,
    removeCurrentQuestionId,
} = questionSlice.actions;

export default questionSlice.reducer;
