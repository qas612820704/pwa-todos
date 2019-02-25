import uuid from 'uuid/v4';
import * as $ from './constants';

// TODO: change it to get from PouchDB
// export function getTodos() {
//   return async (dispatch, getState, api) => {
//     const response = await api.get('/todos');
//     const todos = response.data.payload;

//     todos.forEach(todo => {
//       dispatch(primitiveAction($.ADD_TODO, todo));
//     })

//     return todos;
//   }
// }

export function addTodo(fields) {
  return async (dispatch, getState, api) => {
    const todo = {
      _id: uuid(),
      ...fields,
    };

    dispatch({
      type: $.ADD_TODO,
      payload: todo
    });

    // TODO: FETCH_TODO
  }
}

export function updateTodo(todo) {
  return async (dispatch, getState, api) => {

    dispatch({
     type: $.UPDATE_TODO,
     payload: todo,
    });

    // TODO: FETCH_TODO
  }
}

export function deleteTodo(todoId) {
  return async (dispatch, getState, api) => {
    dispatch({
      type: $.DELETE_TODO,
      payload: {
        _id: todoId
      },
     });

     // TODO: FETCH_TODO
  }
}

export function activateTodo(todoId) {
  return async (dispatch, getState, api) => {
    dispatch({
      type: $.ACTIVATE_TODO,
      payload: {
        _id: todoId,
      },
     });

     // TODO: FETCH_TODO
  }
}

export function deactivateTodo(todoId) {
  return async (dispatch, getState, api) => {
    dispatch({
      type: $.DEACTIVATE_TODO,
      payload: {
        _id: todoId,
      },
     });

     // TODO: FETCH_TODO
  }
}

export function activeAllTodos(todoIds = []) {
  return async (dispatch, getState, api) => {
    await Promise.all(
      todoIds.map(
        todoId => dispatch(activateTodo(todoId))
      )
    );
  }
}

export function deactiveAllTodos(todoIds = []) {
  return async (dispatch, getState, api) => {
    await Promise.all(
      todoIds.map(
        todoId => dispatch(deactivateTodo(todoId))
      )
    );
  }
}
