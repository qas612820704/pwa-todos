import { combineReducers } from 'redux';
import { mapKeys } from 'lodash';
import * as $ from './constants';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case $.RESTORE_TODOS:
      return mapKeys(action.payload, (todo) => todo._id);

    default:
      if (!action.type.includes('TODO'))
        return state;

      const id = action.payload._id;
      return {
        ...state,
        [id]: todo(state[id], action),
      };
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
      ];
    case $.DELETE_TODO:
      const deletedTodo = action.payload;
      return state.filter(todoId => todoId !== deletedTodo._id);
    case $.RESTORE_TODOS:
      return action.payload.map(todo => todo._id);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
});
