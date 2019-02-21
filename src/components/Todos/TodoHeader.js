import React, { useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { keys, map } from 'lodash';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import TodoInput from './TodoInput';
import { activeAllTodos, deactiveAllTodos } from '../../redux/actions';

const Wrapper = styled.header`
  padding: 0.6em;
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
      state => keys(state.todos),
      [],
    ),
  );

  const isAllTodosCompeleted = useMappedState(
    useCallback(
      state =>
        map(
          state.todos, (todo) => todo.completedAt
        )
        .every(completedAt => completedAt),
      [],
    ),
  )

  return (
    <Button
      isAllTodosCompeleted={isAllTodosCompeleted}
      children="❯"
      onClick={() => { isAllTodosCompeleted
        ? dispatch(activeAllTodos(todoIds))
        : dispatch(deactiveAllTodos(todoIds))
      }}
    />
  );
}
