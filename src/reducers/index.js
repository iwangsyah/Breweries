import {combineReducers} from 'redux';
import bookmark from './Bookmark';

const appReducer = combineReducers({
  bookmark
});

const rootReducer = (state, action) =>
  //   if (action.type === types.LOGOUT) {
  //     state = undefined;
  //   }
  appReducer(state, action);
export default rootReducer;
