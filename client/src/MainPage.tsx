import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from './colors';
import { BlockHeader } from './components/BlockHeader.RFC';
import { PatientInfo } from './components/PatientInfo.RFC';
import { PatientList } from './components/PatientList.RFC';
import { serverAdress } from './constants';

export type contentValueType = 'quitting' | 'present';

export type personInfoType = {
  historyNumber?: number;
  firstName?: string;
  lastName?: string;
  patrName?: string;
  birthDate?: string;
  diagnosis?: string;
  bedNumber?: number;
  cause?: string;
};

export type currentPatientType = {
  historyNumber?: number;
  type?: contentValueType;
};

export type contentArrayType = personInfoType[];

export const MainPage: React.FC = () => {
  const [contentValue, setContentValue] = useState<contentValueType>('present');
  const [patientState, setPatientState] = useState<contentArrayType>([]);
  const [currentPatient, setCurrentPatient] = useState<currentPatientType>({});

  const request = async (type: contentValueType) => {
    let json: contentArrayType = [];
    try {
      const response = await fetch(`${serverAdress}/${type}List`);
      json = await response.json();
    } catch (error) {
      console.log(error);
    }
    return json;
  };

  const onClickOnTab = async (value: contentValueType) => {
    setContentValue(value);
    setPatientState(await request(value));
  };

  useEffect(() => {
    const firstFetch = async () => {
      const req = await request('present');
      setPatientState(req);
    };
    firstFetch();
  }, []);

  return (
    <Container>
      <Block maxHeight={'95vh'}>
        <BlockHeader block="left"></BlockHeader>
        <PatientInfo
          historyNumber={currentPatient.historyNumber}
          type={currentPatient.type}
        />
      </Block>
      <Block>
        <BlockHeader
          block="right"
          contentValue={contentValue}
          patientState={patientState}
          onClick={onClickOnTab}
        />
        <PatientList
          contentValue={contentValue}
          content={patientState}
          setPatient={setCurrentPatient}
        />
      </Block>
    </Container>
  );
};

const Container = styled.div`
  width: 1600px;
  min-height: calc(100vh - 40px);
  margin: 20px auto;
  padding: 0px 20px;
  /* border: 1px solid ${colors.gray}; */
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
`;

const Block = styled.div<{ maxHeight?: string }>`
  width: 49%;
  max-height: ${(props) => props.maxHeight};
  min-height: 95%;
  flex-grow: 0;
  /* align-self: flex-start; */
  border: 1px solid ${colors.gray};
  background-color: ${colors.white};
`;
