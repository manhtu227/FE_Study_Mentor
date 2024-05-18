import { Notification } from '@core/models/notification.model';
import { createSlice } from '@reduxjs/toolkit';

type NotificationsState = {
    notifications: Notification[];
};

const initialState: NotificationsState = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action: { payload: Notification }) {
            state.notifications.push(action.payload);
        },
        removeNotification(state, action: { payload: string }) {
            state.notifications = state.notifications.filter((n) => n.id !== action.payload);
        },
        clearNotifications(state) {
            state.notifications = [];
        },
    },
});

export const { addNotification, removeNotification, clearNotifications } =
    notificationSlice.actions;

export default notificationSlice.reducer;
