import { createSlice } from '@reduxjs/toolkit';

interface AvatarState {
    avatar: string | undefined;
}

const initialState: AvatarState = {
    avatar: '',
};

export const avatarSlice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
        setAvatarReducer: (state, action: { payload: string | undefined }) => {
            state.avatar = action.payload;
        },
        removeAvatar: (state) => {
            state.avatar = '';
        },
    },
});

export const { setAvatarReducer, removeAvatar } = avatarSlice.actions;

export default avatarSlice.reducer;
