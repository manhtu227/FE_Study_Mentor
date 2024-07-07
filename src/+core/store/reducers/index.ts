import { combineReducers } from 'redux';
import authenticationReducer from './authentication.reducer';
import counterReducer from './counter.reducer';
import notificationReducer from './notification.reducer';
import questionReducer from './question.reducer';
import receivedQuestionsReducer from './received-questions.reducer';
import roomChatReducer from './room-chat.reducer';
import socketReducer from './socket.reducer';
import tutorsReducer from './tutor.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    authentication: authenticationReducer,
    questions: questionReducer,
    tutors: tutorsReducer,
    socket: socketReducer,
    notifications: notificationReducer,
    receivedQuestions: receivedQuestionsReducer,
    roomChat: roomChatReducer,
});

export default rootReducer;
