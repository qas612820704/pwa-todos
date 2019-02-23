import * as $ from './constants';

const todo = (state = {}, action) => {
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
      return undefined;
    default:
      return state;
  }
}

export default todo;
