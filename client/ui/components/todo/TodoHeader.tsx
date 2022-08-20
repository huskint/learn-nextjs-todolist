import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  dateString: string;
  dayName: string;
  unDoneTaskLength: number;
}

const TodoHeader = ({ dateString, dayName, unDoneTaskLength }: Props) => (
  <Container>
    <Title>{dateString}</Title>
    <Description>{dayName}</Description>
    <UnDoneTask>할 일 {unDoneTaskLength}개 남음</UnDoneTask>
  </Container>
);

export default memo(TodoHeader);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 200px;
  padding: 48px 32px 32px 24px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #343a40;
  margin: 0;
`;

const Description = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #bbb;
`;

const UnDoneTask = styled.div`
  margin-top: 36px;
  font-size: 18px;
  font-weight: 600;
  color: #2478ff;
`;
