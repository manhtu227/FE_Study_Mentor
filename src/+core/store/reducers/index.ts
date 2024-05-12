import { combineReducers } from 'redux';
import authenticationReducer from './authentication.reducer';
import counterReducer from './counter.reducer';
import questionReducer from './question.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    authentication: authenticationReducer,
    questions: questionReducer,
});

export default rootReducer;
