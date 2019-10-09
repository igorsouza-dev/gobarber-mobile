import React from 'react';
import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function SignIn() {
  return (
    <Background>
      <Input icon="call" placeholder="Insert your name" />
      <Button>Sign In</Button>
    </Background>
  );
}
