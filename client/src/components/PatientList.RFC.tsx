import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import {
  contentValueType,
  contentArrayType,
  currentPatientType,
} from '../MainPage';
import { PatientItem } from './PatientItem.RFC';

interface IPatientList {
  contentValue: contentValueType;
  content: contentArrayType;
  setPatient: any;
}

export const PatientList: React.FC<IPatientList> = ({
  contentValue,
  content,
  setPatient,
}) => {
  return (
    <PatientListContainer>
      <TableElement>
        <TableHeaderEl>№ИБ</TableHeaderEl>
        <TableHeaderEl>ФИО</TableHeaderEl>
        <TableHeaderEl>
          {contentValue === 'present' ? 'Палата' : 'Причина выбытия'}
        </TableHeaderEl>
      </TableElement>
      <PatientItem
        content={content}
        setPatient={setPatient}
        type={contentValue}
      />
    </PatientListContainer>
  );
};

const PatientListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TableHeaderEl = styled.div`
  display: flex;
  flex-basis: 33.333333333%;
  :first-child {
    margin-left: 10px;
  }
`;
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
