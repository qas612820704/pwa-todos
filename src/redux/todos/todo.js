import { combineReducers } from 'redux';
import * as $ from './constants';

const _id = (state = null, action) => {
  switch (action.type) {
    case $.ADD_TODO:
      return action.payload._id;
    default:
      return state;
  }
}

const message = (state = null, action) => {
  switch (action.type) {
    case $.ADD_TODO:
    case $.UPDATE_TODO:
    case $.DELETE_TODO:
      return action.payload.message || state;
    default:
      return state;
  }
}

const isDirty = (state = true, action) => {
  switch (action.type) {
    case $.STORING_TODO_SUCCESS:
      return false;
    case $.SYNCING_TODO_REQUEST:
    case $.SYNCING_TODO_SUCCESS:
    case $.SYNCING_TODO_FAILURE:
      return state;
    default:
      return true;
  }
}

const isSynced = (state = false, action) => {
  switch (action.type) {
    case $.SYNCING_TODO_SUCCESS:
      return true;
    default:
      return false;
  }
}

const isStoring = (state = false, action) => {
  switch (action.type) {
    case $.STORING_TODO_REQUEST:
    return true;
    case $.STORING_TODO_SUCCESS:
    case $.STORING_TODO_FAILURE:
      return false;
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

const completedAt = (state = null, action) => {
  switch (action.type) {
    case $.ACTIVATE_TODO:
      return null;
    case $.DEACTIVATE_TODO:
      return new Date().toISOString();
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

const storingErrorMessage = (state = null, action) => {
  switch (action.type) {
    case $.STORING_TODO_REQUEST:
      return null;
    case $.STORING_TODO_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
}

const syncingErrorMessage = (state = null, action) => {
  switch (action.type) {
    case $.SYNCING_TODO_REQUEST:
      return null;
    case $.SYNCING_TODO_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
}

export default combineReducers({
  _id,
  message,
  isDirty,
  isSynced,
  isStoring,
  isSyncing,
  completedAt,
  deletedAt,
  storingErrorMessage,
  syncingErrorMessage,
});
