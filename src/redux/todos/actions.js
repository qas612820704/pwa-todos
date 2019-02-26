import uuid from 'uuid/v4';
import * as $ from './constants';

export function getTodos() {
  return async (dispatch, getState, { db }) => {
    const todos = await db
      .allDocs({
        include_docs: true,
      })
      .then(result => result.rows)
      .then(rows => rows.map(row => row.doc));

    todos.forEach(todo => {
      dispatch({
        type: $.ADD_TODO,
        payload: todo,
      });
    });

    return todos;
  }
}

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

    return await dispatch(
      syncTodoRequest(todo._id),
    );
  }
}

export function updateTodo(todo) {
  return async (dispatch, getState, api) => {
    dispatch({
     type: $.UPDATE_TODO,
     payload: todo,
    });

    return await dispatch(
      syncTodoRequest(todo._id),
    );
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

    return await dispatch(
      syncTodoRequest(todoId),
    );
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

    return await dispatch(
      syncTodoRequest(todoId),
    );
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

     return await dispatch(
      syncTodoRequest(todoId),
    );
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

export function syncTodoRequest(todoId) {
  return async (dispatch, getState, { db }) => {
    dispatch({
      type: $.SYNCING_TODO_REQUEST,
      payload: { _id: todoId },
    });

    const todo = getState().todos.byId[todoId].data;

    console.log('todo', todo);

    try {
      const syncedTodo = await db
        .put(todo, { force: true })
        .then(puttedTodo => db.get(puttedTodo.id));

      return dispatch({
        type: $.SYNCING_TODO_SUCCESS,
        payload: syncedTodo,
      })
    } catch (error) {
      return dispatch({
        type: $.SYNCING_TODO_FAILURE,
        payload: {
          _id: todoId,
          error,
        },
      });
    }
  }
}
