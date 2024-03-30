import { combineReducers } from 'redux';
import authenticationReducer from './authentication.reducer';
import counterReducer from './counter.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    authentication: authenticationReducer,
});

export default rootReducer;
