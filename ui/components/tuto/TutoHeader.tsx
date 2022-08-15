import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const TutoHeader = ({ title }: Props) => (
  <Container>
    <Title>{title}</Title>
  </Container>
);

export default memo(TutoHeader);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 24px;
  box-sizing: content-box;
`;

const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 12px;
`;
