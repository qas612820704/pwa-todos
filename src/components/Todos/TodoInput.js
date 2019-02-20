import React, { useState } from 'react';
import { useDispatch } from 'redux-react-hook';
import { addTodo } from '../../redux/actions';

export default function TodoInput() {
  const [ message, setMessage ] = useState('');
  const dispatch = useDispatch();

  return (
    <form onSubmit={e => {
      e.preventDefault();
      dispatch(addTodo({ message }));
      setMessage('');
    }}>
      <input
        type="text"
        value={message}
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
    </form>
  )
}
