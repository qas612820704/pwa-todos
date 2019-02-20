import React, { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { getTodos } from '../../redux/actions';

export default function Todos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div>
      <TodoInput />
      <TodoList />
    </div>
  );
}
