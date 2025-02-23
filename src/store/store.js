import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;