import React, { useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import styled from '@emotion/styled';
import { addTodo } from '../../redux/actions';

const Form = styled.form`
  margin: 0;
  padding-left: 1em;

  input {
    width: 100%;
    padding: 0;
    border: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-style: italic;
      color: #9e9e9e;
    }
  }
`;

export default function TodoInput() {
  const [ message, setMessage ] = useState('');
  const dispatch = useDispatch();

  return (
    <Form onSubmit={e => {
      e.preventDefault();
      dispatch(addTodo({ message }));
      setMessage('');
    }}>
      <input
        type="text"
        placeholder="Something needs to done?"
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
    </Form>
  )
}
