import { combineReducers } from 'redux';
import * as $ from './constants';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case $.ADD_TODO:
    case $.ACTIVATE_TODO:
    case $.DEACTIVATE_TODO:
    case $.UPDATE_TODO:
      return {
        ...state,
        [action.payload._id]: todo(undefined, action),
      }
    case $.DELETE_TODO:
      const deletedTodoId = action.payload._id;
      const { [deletedTodoId]: _, ...nextState } = state;
      return nextState;
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
