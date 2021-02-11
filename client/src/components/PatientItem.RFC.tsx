import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import {
  contentArrayType,
  contentValueType,
  personInfoType,
} from '../MainPage';

export const PatientItem: React.FC<{
  content: contentArrayType;
  setPatient: any;
  type?: contentValueType;
}> = ({ content, setPatient, type }) => {
  const patientItem = content.map((element: personInfoType, i: number) => {
    return (
      <TableElement key={i}>
        <TableItem>{i + 1}</TableItem>
        <TableItem
          cursor={'pointer'}
          onClick={() => {
            setPatient({
              historyNumber: element.historyNumber,
              type: type,
            });
          }}
        >
          {element.firstName + ' ' + element.lastName + ' ' + element.patrName}
        </TableItem>
        <TableItem>{element.cause || element.bedNumber}</TableItem>
      </TableElement>
    );
  });
  return <>{patientItem}</>;
};

const TableElement = styled.div`
  width: 100%;
  padding: 10px 0px;
  justify-content: space-between;
  border-top: 1px solid ${colors.gray};
  display: flex;
  :first-child {
    border: none;
  }
`;
const TableItem = styled.div<{ cursor?: 'pointer' }>`
  font-size: 20px;
  display: flex;
  flex-basis: 33.333333333%;
  cursor: ${(props) => props.cursor};
  :first-child {
    margin-left: 10px;
    font-size: 20px;
  }
`;
