import React, { useMemo, useState } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import Background from '~/components/Background';
import BackButton from '~/components/BackButton';
import api from '~/services/api';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const datetime = navigation.getParam('datetime');
  const [loading, setLoading] = useState(false);

  const formattedDateTime = useMemo(
    () => formatRelative(parseISO(datetime), new Date(), { locale: pt }),
    [datetime]
  );
  async function handeAddAppointment() {
    setLoading(true);
    const response = await api.post('appointments', {
      provider_id: provider.id,
      date: datetime,
    });
    setLoading(false);
    navigation.navigate('Dashboard');
  }
  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/120/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{formattedDateTime}</Time>
        <SubmitButton onPress={handeAddAppointment} loading={loading}>
          CONFIRM
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirm your appointment',
  headerLeft: () => (
    <BackButton onPress={() => navigation.navigate('SelectProvider')} />
  ),
});
