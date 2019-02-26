import { combineReducers } from 'redux';
import * as $ from './constants';

const data = (state = {}, action) => {
  switch (action.type) {
    case $.ADD_TODO:
    case $.UPDATE_TODO:
    case $.SYNCING_TODO_SUCCESS:
    case $.DELETE_TODO:
      return {
        ...state,
        ...action.payload,
      }
    case $.ACTIVATE_TODO:
      return {
        ...state,
        completedAt: null,
      }
    case $.DEACTIVATE_TODO:
      return {
        ...state,
        completedAt: new Date().toISOString(),
      }
    default:
      return state;
  }
}

const isLocal = (state = true, action) => {
  switch (action.type) {
    case $.ADD_TODO:
    case $.ACTIVATE_TODO:
    case $.DEACTIVATE_TODO:
    case $.UPDATE_TODO:
    case $.DELETE_TODO:
      return true;
    case $.FETCHING_TODO_SUCCESS:
      return false;
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
    case $.SYNCING_TODO_FAILURE:
      return action.payload.error;
    case $.FETCHING_TODO_REQUEST:
    case $.FETCHING_TODO_SUCCESS:
    case $.SYNCING_TODO_REQUEST:
    case $.SYNCING_TODO_SUCCESS:
      return null;
    default:
      return state;
  }
}

const isSyncing = (state = false, action) => {
  switch (action.type) {
    case $.SYNCING_TODO_REQUEST:
      return true;
    case $.SYNCING_TODO_SUCCESS:
    case $.SYNCING_TODO_FAILURE:
      return false;
    default:
      return state;
  }
}

const deletedAt = (state = null, action) => {
  switch (action.type) {
    case $.DELETE_TODO:
      return new Date().toISOString();
    default:
      return state;
  }
}

export default combineReducers({
  data,
  isLocal,
  isSyncing,
  isFetching,
  errorMessage,
  deletedAt,
});
