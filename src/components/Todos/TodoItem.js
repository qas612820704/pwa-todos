import React, { useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { activateTodo, deactivateTodo, deleteTodo } from '../../redux/actions';

export default function TodoItem({ todoId }) {
  const { todo, activateTodo, deactivateTodo, deleteTodo } = useTodo(todoId);

  return (
    <ol>
      <button style={{ color: 'red' }} onClick={deleteTodo}>x</button>
      <button style={{ color: 'yellow' }} onClick={deactivateTodo}>-</button>
      <button style={{ color: 'green' }} onClick={activateTodo}>v</button>
      {!todo.completedAt
        ? <span>{todo.message}</span>
        : <del>{todo.message}</del>
      }
    </ol>
  )
}

function useTodo(todoId) {
  const todo = useMappedState(
    useCallback(
      state => state.todos[todoId],
      [todoId],
    ),
  );
  const dispatch = useDispatch();

  return {
    todo,
    activateTodo: useCallback(
      () => {
        dispatch(activateTodo(todoId));
      },
      [todoId],
    ),
    deactivateTodo: useCallback(
      () => {
        dispatch(deactivateTodo(todoId));
      },
      [todoId],
    ),
    deleteTodo: useCallback(
      () => {
        dispatch(deleteTodo(todoId));
      },
      [todoId],
    ),
  };
}
