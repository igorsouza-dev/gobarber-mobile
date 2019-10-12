import React, { useState } from 'react';
import { Container } from './styles';
import Background from '~/components/Background';
import BackButton from '~/components/BackButton';
import DateInput from '~/components/DateInput';

export default function SelectDateTime() {
  const [date, setDate] = useState(new Date());
  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Select the Date/Time',
  headerLeft: () => (
    <BackButton onPress={() => navigation.navigate('SelectProvider')} />
  ),
});
