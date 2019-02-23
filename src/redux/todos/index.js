import * as $ from './constants';
import todo from './todo';

const todos = (state = {}, action) => {
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

export default todos;
