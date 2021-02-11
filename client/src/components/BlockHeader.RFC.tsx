import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Arrow } from '../Arrow';
import { colors } from '../colors';
import { serverAdress } from '../constants';
import {
  contentArrayType,
  contentValueType,
  currentPatientType,
} from '../MainPage';

interface IBlockHeader {
  block: 'left' | 'right';
  contentValue?: contentValueType;
  onClick?(value: contentValueType): void;
  patientState?: contentArrayType;
}

export const BlockHeader: React.FC<IBlockHeader> = ({
  block = 'left',
  contentValue,
  patientState = [],
  onClick = () => {},
}) => {
  const [amounts, setAmounts] = useState<{ present: any; quitting: any }>({
    present: 0,
    quitting: 0,
  });

  const amount = async () => {
    let present = await fetch(`${serverAdress}/presentList?length=true`);
    present = await present.json();
    let quitting = await fetch(`${serverAdress}/quittingList?length=true`);
    quitting = await quitting.json();
    setAmounts({ present: present, quitting: quitting });
  };

  useEffect(() => {
    amount();
  }, []);

  if (block === 'left') {
    return (
      <BlockHeaderContainer bgColor={colors.blue}>
        <HeaderText>Инофрмация о пациенте</HeaderText>
        <HeaderArrow>
          <Arrow />
        </HeaderArrow>
      </BlockHeaderContainer>
    );
  } else {
    return (
      <BlockHeaderContainer bgColor={colors.grayWeak}>
        <TabList>
          <TabItem
            active={contentValue === 'present' ? true : false}
            onClick={() => {
              onClick('present');
            }}
          >
            присутствуют({amounts.present})
          </TabItem>
          <TabItem
            active={contentValue === 'quitting' ? true : false}
            onClick={() => {
              onClick('quitting');
            }}
          >
            выбывшие({amounts.quitting})
          </TabItem>
        </TabList>
      </BlockHeaderContainer>
    );
  }
};

const BlockHeaderContainer = styled.div<{ bgColor?: string }>`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderText = styled.div`
  font-size: 28px;
  margin-left: 10px;
  color: ${colors.white};
`;
const HeaderArrow = styled.div`
  width: 15px;
  margin-right: 20px;
`;
const TabList = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  padding-top: 10px;
`;
const TabItem = styled.div<{ active: boolean }>`
  text-transform: uppercase;
  font-size: 20px;
  margin-left: 20px;
  height: 100%;
  border-bottom: 2px solid
    ${(props) => (props.active ? colors.blue : colors.black)};
  color: ${(props) => (props.active ? colors.blue : colors.black)};
  cursor: pointer;
`;
