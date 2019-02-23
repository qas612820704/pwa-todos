import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todoIds = useMappedState(
    useCallback(
      state => state.todos.allIds,
      [],
    ),
  );

  return (
    <ul>
    { todoIds.map(todoId => (
      <TodoItem key={todoId} todoId={todoId} />
    ))}
    </ul>
  )
}
