const ADD_TODO = 'ADD_TODO';

const todo = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

const todos = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        [action.payload._id]: todo(undefined, action),
      }
    default:
      return state;
  }
}

export function getTodos() {
  return async (dispatch, getState, api) => {
    const response = await api.get('/todos');
    const todos = response.data.payload;

    todos.forEach(todo => {
      dispatch(primitiveAddTodo(todo));
    })

    return todos;
  }
}

export function addTodo(rawTodo) {
  return async (disptch, getState, api) => {
    const response = await api.post('/todos', rawTodo);
    const todo = response.data.payload;

    disptch(primitiveAddTodo(todo));

    return todo;
  }
}

function primitiveAddTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  }
}

export default todos;
