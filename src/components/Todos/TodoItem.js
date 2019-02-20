import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

export default function TodoItem({ todoId }) {
  const todo = useMappedState(
    useCallback(
      state => state.todos[todoId],
      [todoId],
    ),
  );

  return (
    <ol>{ todo.message }</ol>
  )
}
