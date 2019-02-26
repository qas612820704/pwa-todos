import React, { useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import TodoInput from './TodoInput';
import { activeAllTodos, deactiveAllTodos } from '../../redux/actions';

const Wrapper = styled.header`
  padding: 0.6em;
  border-bottom: 1px solid #ededed;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  position: relative;

  form {
    padding: 0;
    padding-left: 40px;
  }
`;

export default function TodoHeader() {
  return (
    <Wrapper>
      <ToggleAllBtn />
      <TodoInput />
    </Wrapper>
  );
}

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  margin: 0;
  padding: 0;
  left: 0.6em;
  border: none;
  transform: rotate(90deg);

  color: #9e9e9e;
  background: inherit;

  &:focus {
    outline: none;
  }

  ${props => props.isAllTodosCompeleted && css`
    color: #737373;
  `}
`;

function ToggleAllBtn() {
  const dispatch = useDispatch();
  const todoIds = useMappedState(
    useCallback(
      state => state.todos.allIds,
      [],
    ),
  );

  const isAllTodosCompeleted = useMappedState(
    useCallback(
      state => state.todos.allIds
        .map(todoId => state.todos.byId[todoId])
        .every(todo => todo.completedAt),
      [],
    ),
  )

  return (
    <Button
      isAllTodosCompeleted={isAllTodosCompeleted}
      onClick={() => { isAllTodosCompeleted
        ? dispatch(activeAllTodos(todoIds))
        : dispatch(deactiveAllTodos(todoIds))
      }}
    >
      ❯
    </Button>
  );
}
