import React from "react"
import styled from '@emotion/styled';
import Layout from '../layout';
import Todos from '../components/Todos';

const Wrapper = styled.main`
  h1 {
    text-align: center;
  }
`;

export default function Index() {
  return (
    <Layout>
      <Wrapper>
        <h1>Waker</h1>
        <Todos />
      </Wrapper>
    </Layout>
  )
}
