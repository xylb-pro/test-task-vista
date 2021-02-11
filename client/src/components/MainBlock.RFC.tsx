import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';

export const MainBlock: React.FC = () => {
  return <Block></Block>;
};

const Block = styled.div`
  width: 49%;
  height: 95%;
  border: 1px solid ${colors.black};
`;
