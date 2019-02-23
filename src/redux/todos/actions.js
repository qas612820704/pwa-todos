import * as $ from './constants';

export function getTodos() {
  return async (dispatch, getState, api) => {
    const response = await api.get('/todos');
    const todos = response.data.payload;

    todos.forEach(todo => {
      dispatch(primitiveAction($.ADD_TODO, todo));
    })

    return todos;
  }
}

export function addTodo(rawTodo) {
  return async (disptch, getState, api) => {
    const response = await api.post('/todos', rawTodo);
    const todo = response.data.payload;

    disptch(primitiveAction($.ADD_TODO, todo));

    return todo;
  }
}

export function updateTodo(todo) {
  return async (dispatch, getState, api) => {
    const response = await api.post(`/todos/${todo._id}`, todo);
    const updatedTodo = response.data.payload;

    dispatch(primitiveAction($.UPDATE_TODO, updatedTodo));

    return updatedTodo;
  }
}

export function deleteTodo(todoId) {
  return async (dispatch, getState, api) => {
    const response = await api.delete(`/todos/${todoId}`);
    const deletedTodo = response.data.payload;

    dispatch(primitiveAction($.DELETE_TODO, deletedTodo));

    return deletedTodo;
  }
}

export function activateTodo(todoId) {
  return async (dispatch, getState, api) => {
    const response = await api.put(`/todos/${todoId}/activate`);
    const todo = response.data.payload;

    dispatch(primitiveAction($.ACTIVATE_TODO, todo));

    return todo;
  }
}

export function deactivateTodo(todoId) {
  return async (dispatch, getState, api) => {
    const response = await api.delete(`/todos/${todoId}/activate`);
    const todo = response.data.payload;

    dispatch(primitiveAction($.DEACTIVATE_TODO, todo));

    return todo;
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

function primitiveAction(type, payload) {
  return { type, payload };
}
