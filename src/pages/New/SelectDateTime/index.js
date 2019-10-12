import React, { useState, useEffect } from 'react';
import { Container, HourList, Hour, Title } from './styles';
import Background from '~/components/Background';
import BackButton from '~/components/BackButton';
import DateInput from '~/components/DateInput';
import api from '~/services/api';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(hour) {
    navigation.navigate('Confirm', { hour, provider });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          keyExtractor={item => String(item.time)}
          renderItem={({ item }) => (
            <Hour
              enabled={item.available}
              onPress={() => handleSelectHour(item.value)}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
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
