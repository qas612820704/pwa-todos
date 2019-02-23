import { combineReducers } from 'redux';
import * as $ from './constants';

const data = (state = {}, action) => {
  switch (action.type) {
    case $.ADD_TODO:
    case $.ACTIVATE_TODO:
    case $.DEACTIVATE_TODO:
    case $.UPDATE_TODO:
      return {
        ...state,
        ...action.payload,
      }
    case $.DELETE_TODO:
      return null;
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case $.FETCHING_TODO_REQUEST:
      return true;
    case $.FETCHING_TODO_SUCCESS:
    case $.FETCHING_TODO_FAILURE:
      return false;
    default:
      return state;
  }
}

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case $.FETCHING_TODO_FAILURE:
      return action.payload;
    case $.FETCHING_TODO_REQUEST:
    case $.FETCHING_TODO_SUCCESS:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  data,
  isFetching,
  errorMessage,
});
