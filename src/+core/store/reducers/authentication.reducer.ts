import { createSlice } from '@reduxjs/toolkit';

interface AuthenticationState {
    accessToken: string;
}

const initialState: AuthenticationState = {
    accessToken: '',
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAccessToken: (state, action: { payload: string }) => {
            state.accessToken = action.payload;
        },
        removeAccessToken: (state) => {
            state.accessToken = '';
        },
    },
});

export const { setAccessToken, removeAccessToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;
