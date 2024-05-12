import { combineReducers } from 'redux';
import authenticationReducer from './authentication.reducer';
import counterReducer from './counter.reducer';
import questionReducer from './question.reducer';
import socketReducer from './socket.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    authentication: authenticationReducer,
    questions: questionReducer,
    socket: socketReducer,
});

export default rootReducer;
