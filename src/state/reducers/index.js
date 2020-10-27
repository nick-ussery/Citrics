import { combineReducers } from 'redux';
import { cityReducer } from './searched-cities-reducers.js';
import { userReducer } from './userReducer';

export default combineReducers({
  cityReducer,
  userReducer,
});
