import { combineReducers } from 'redux';
import { omitBy } from 'lodash';
import * as $ from './constants';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case $.ADD_TODO:
    case $.ACTIVATE_TODO:
    case $.DEACTIVATE_TODO:
    case $.UPDATE_TODO:
    case $.DELETE_TODO:
    case $.SYNCING_TODO_REQUEST:
    case $.SYNCING_TODO_SUCCESS:
    case $.SYNCING_TODO_FAILURE:
      const id = action.payload._id;

      return {
        ...state,
        [id]: todo(state[id], action),
      }
    default:
      return state;
  }
}


const allIds = (state = [], action) => {
  switch (action.type) {
    case $.ADD_TODO:
      const newTodo = action.payload;
      // TODO: O(n) insertion, needs to optimize by using binary insert
      return [
        newTodo._id,
        ...state,
      ]
    case $.DELETE_TODO:
      const deletedTodo = action.payload;
      return state.filter(todoId => todoId !== deletedTodo._id);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
});
