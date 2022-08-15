import React, { memo } from 'react';
import styled from 'styled-components';

import { Page } from '@components/layout';

interface Props {
  children?: React.ReactNode;
  [k: string]: any;
}

const Layout = ({ children, ...props }: Props) => (
  <Page>
    <Container {...props}>
      {children}
    </Container>
  </Page>
);

export default memo(Layout);

const Container = styled.main`
  position: absolute;
  width: 100vw;
  max-width: 420px;
  height: 100vh;
  max-height: 920px;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
