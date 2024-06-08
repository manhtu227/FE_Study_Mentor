import { createSlice } from '@reduxjs/toolkit';

type RoomChatState = {
    roomIds: string[];
};

const initialState: RoomChatState = {
    roomIds: [],
};

export const roomChatSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        addRoom(state, action: { payload: string }) {
            state.roomIds.push(action.payload);
        },
        removeRoom(state, action: { payload: string }) {
            state.roomIds = state.roomIds.filter((n) => n !== action.payload);
        },
        clearRoom(state) {
            state.roomIds = [];
        },
    },
});

export const { addRoom, removeRoom, clearRoom } = roomChatSlice.actions;

export default roomChatSlice.reducer;
