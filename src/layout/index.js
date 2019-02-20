import React from 'react';
import styled from '@emotion/styled';
import { rhythm } from './typography';
import './theme.css';

const Wrapper = styled.div`
  margin: auto;
  max-width: ${rhythm(24)};
`;

export default function Layout({ children }) {
  return (
    <div>
      <Wrapper>
      { children }
      </Wrapper>
    </div>
  );
}
