import React from 'react';
import styled from '@emotion/styled';
import { rhythm } from './typography';
import './theme.css';

const Wrapper = styled.div`
  margin: auto;
  padding: 0 ${rhythm(0.5)};
  max-width: ${rhythm(12)};
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
