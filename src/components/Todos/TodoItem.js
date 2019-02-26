import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { activateTodo, deactivateTodo, updateTodo, deleteTodo } from '../../redux/actions';

const Wrapper = styled.ol`
  display: block;
  position: relative;

  margin: 0;
  border-bottom: 1px solid #ededed;

  input[type=checkbox] {
    cursor: pointer;
    opacity: 0;

    position: absolute;
    margin: auto;
    padding-left: 0.6em;
    left: 0;
    top: 0;
    bottom: 0;
    height: 40px;
    width: 40px;
  }
  label {
    display: block;

    padding: 0.6em;
    padding-left: calc(0.6em + 40px);

    width: 100%;

    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;

    transition: color 0.5s;
  }
  button {
    cursor: pointer;
    opacity: 0;

    position: absolute;

    width: 40px;
    height: 40px;

    margin: auto;
    padding: 0;

    top: 0;
    bottom: 0;
    right: 0.6em;

    color: #f88d8d;
    background: initial;
    border: none;
    outline: none;

    transition: opacity 0.2s;

    &:hover {
      filter: brightness(70%);
    }
    &:active {
      filter: brightness(50%);
      transform: translate(1px, 1px);
    }
  }
  &:hover button {
    opacity: 1;
  }
  form {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 calc(0.6em + 20px);

    input {
      width: 100%;
      height: 100%;
      padding-left: 19px; /* 1px for border*/
      border: 1px solid #999;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    }
  }
  ${props => props.isCompoleted && css`
    label {
      color: #9e9e9e;
      text-decoration: line-through;
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
    }
  `}
  ${props => props.isEditing && css`
    input[type=checkbox], button {
      display: none;
    }
    label {
      background-image: initial;
    }
    form {
      display: block;
    }
  `}

`;

export default function TodoItem({ todoId }) {
  const input = useRef();
  const { todo, activateTodo, deactivateTodo, updateTodo, deleteTodo } = useTodo(todoId);
  const [ isEditing, enableEditing ] = useState(false);
  const [ message, setMessage ] = useState(todo.message);

  useEffect(() => {
      input.current.focus();
    },
    [isEditing],
  )

  return (
    <Wrapper
      isCompoleted={!!todo.completedAt}
      isEditing={isEditing}
      onDoubleClick={e => enableEditing(true)}
      onMouseLeave={e => enableEditing(false)}
    >
      <input type="checkbox"
        onClick={!!todo.completedAt ? activateTodo : deactivateTodo}
      />
      <label>{todo.message}</label>
      <button onClick={deleteTodo}>x</button>
      <form onSubmit={e => {
        e.preventDefault();
        updateTodo({
          ...todo,
          message,
        });
        enableEditing(false);
      }}>
        <input
          ref={input}
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </form>
    </Wrapper>
  )
}

function useTodo(todoId) {
  const todo = useMappedState(
    useCallback(
      state => state.todos.byId[todoId],
      [todoId],
    ),
  );
  const dispatch = useDispatch();

  return {
    todo: todo,
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
    updateTodo: useCallback(
      todo => {
        dispatch(updateTodo(todo));
      },
      [],
    ),
    deleteTodo: useCallback(
      () => {
        dispatch(deleteTodo(todoId));
      },
      [todoId],
    ),
  };
}

