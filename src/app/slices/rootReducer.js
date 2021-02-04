import { combineReducers } from 'redux';
import appSlice from './appSlice'

const rootReducer = combineReducers({
  covid: appSlice,
});

export default rootReducer;