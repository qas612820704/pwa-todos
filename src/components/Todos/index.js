import React, { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import styled from '@emotion/styled';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import { restoreTodos } from '../../redux/actions';

const Wrapper = styled.section`
  position: relative;

  background-color: white;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.2),
      0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2),
      0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  };
`;

export default function Todos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreTodos());
  }, []);

  return (
    <Wrapper>
      <TodoHeader />
      <TodoList />
    </Wrapper>
  );
}
