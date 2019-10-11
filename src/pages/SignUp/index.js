import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

import logo from '~/assets/logo.png';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  const mailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder="Insert your full name"
            returnKeyType="next"
            onSubmitEditing={() => mailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            placeholder="Insert your e-mail"
            ref={mailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Insert your password"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit} loading={loading}>
            SIGN UP
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Already have an account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
