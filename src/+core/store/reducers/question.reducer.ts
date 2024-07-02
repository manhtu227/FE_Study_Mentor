import { CreateFileQuestionReducer, ReceiveNewQuestionModel } from '@core/models/question.model';
import { createSlice } from '@reduxjs/toolkit';

interface QuestionsState {
    questions: CreateFileQuestionReducer[];
    currentQuestionId: string;
    pickedQuestion: ReceiveNewQuestionModel | null;
}

const initialState: QuestionsState = {
    questions: [],
    currentQuestionId: '',
    pickedQuestion: null,
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
        setPickedQuestion: (state, action: { payload: ReceiveNewQuestionModel }) => {
            state.pickedQuestion = action.payload;
        },
        removePickedQuestion: (state) => {
            state.pickedQuestion = null;
        },
    },
});

export const {
    addQuestion,
    removeQuestion,
    removeAllQuestion,
    setCurrentQuestionId,
    removeCurrentQuestionId,
    setPickedQuestion,
    removePickedQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
