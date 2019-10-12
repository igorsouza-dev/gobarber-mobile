import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Touchable } from './styles';

export default function BackButton({ onPress }) {
  return (
    <Touchable onPress={onPress}>
      <Icon color="#fff" name="chevron-left" size={20} />
    </Touchable>
  );
}

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
