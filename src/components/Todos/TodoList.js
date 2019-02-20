import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { keys } from 'lodash';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todoIds = useMappedState(
    useCallback(
      state => keys(state.todos),
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
