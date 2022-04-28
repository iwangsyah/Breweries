import _ from 'lodash';
import {ActionTypes as types} from '../configs';

const bookmarkReducer = (state = {bookmarkList: []}, action) => {
  switch (action.type) {
    case 'SET_BOOKMARK_LIST':
      return {...state, bookmarkList: action.payload};
    default:
      return state;
  }
};

export default bookmarkReducer;
