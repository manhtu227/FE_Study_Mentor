import { UserResp } from '@core/models/profile.model';
import { createSlice } from '@reduxjs/toolkit';

interface AuthenticationState {
    accessToken: string;
    user: UserResp;
}

const initialState: AuthenticationState = {
    accessToken: '',
    user: {} as UserResp,
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
        setUser: (state, action: { payload: UserResp }) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = {} as UserResp;
        },
    },
});

export const { setAccessToken, removeAccessToken, setUser, removeUser } =
    authenticationSlice.actions;

export default authenticationSlice.reducer;
