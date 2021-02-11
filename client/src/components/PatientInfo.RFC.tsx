import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { serverAdress } from '../constants';
import { currentPatientType, personInfoType } from '../MainPage';

export const PatientInfo: React.FC<currentPatientType> = ({
  historyNumber,
  type,
}) => {
  const [info, setInfo] = useState<personInfoType>({});
  const [age, setAge] = useState<any>('');

  useEffect(() => {
    const req = async () => {
      let info = await request();
      setInfo(info);
      setAge(getAge(info.birthDate));
    };
    historyNumber && req();
  }, [historyNumber]);

  const request = async () => {
    const item = await fetch(`${serverAdress}/${type}List?id=${historyNumber}`);
    const request = await item.json();
    return request;
  };

  const getAge = (birthdate: string) => {
    const [nowYear, nowMonth, nowDay] = new Date()
      .toLocaleDateString()
      .split('.')
      .reverse();
    const [year, month, day] = birthdate.split('-');
    let age = +nowYear - +year;
    if (+month > +nowMonth) {
      age--;
    } else if (+month === +nowMonth) {
      if (+day > +nowDay) age--;
    }
    return age;
  };
  return (
    <PatientInfoContainer>
      <PatientName>
        <FieldName>ФИО</FieldName>
        <FieldValue>
          {info.firstName &&
            info.firstName + ' ' + info.lastName + ' ' + info.patrName}
        </FieldValue>
      </PatientName>
      <PatientAge>
        <FieldName>Возраст</FieldName>
        <FieldValue>{age}</FieldValue>
      </PatientAge>
      <PatientDiagnosis>
        <FieldName>Диагноз</FieldName>
        <FieldValue>{info.diagnosis}</FieldValue>
      </PatientDiagnosis>
    </PatientInfoContainer>
  );
};

const PatientInfoContainer = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const PatientName = styled.div`
  display: flex;
  margin-top: 5px;
`;
const PatientAge = styled.div`
  display: flex;
  margin-top: 5px;
`;
const PatientDiagnosis = styled.div`
  display: flex;
  margin-top: 5px;
`;
const FieldName = styled.div`
  min-width: 80px;
  margin: 0px 20px;
`;
const FieldValue = styled.div`
  min-width: 200px;
  border-bottom: 1px solid ${colors.black};
`;
