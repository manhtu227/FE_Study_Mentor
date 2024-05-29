import { UserModel } from '@core/models/user.model';
import { createSlice } from '@reduxjs/toolkit';

interface TutorsState {
    tutors: UserModel[];
}

const initialState: TutorsState = {
    tutors: [],
};

export const tutorsSlice = createSlice({
    name: 'tutors',
    initialState,
    reducers: {
        // add tutor
        addTutor: (state, action: { payload: UserModel }) => {
            state.tutors = [...state.tutors, action.payload];
        },
        // remove tutor
        removeTutor: (state, action: { payload: UserModel }) => {
            state.tutors = state.tutors.filter((tutor) => tutor.id !== action.payload.id);
        },
        // remove all tutor
        removeAllTutor: (state) => {
            state.tutors = [];
        },
    },
});

export const { addTutor, removeTutor, removeAllTutor } = tutorsSlice.actions;

export default tutorsSlice.reducer;
