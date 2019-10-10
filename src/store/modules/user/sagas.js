import { takeLatest, all, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  const { name, email, avatar_id, ...rest } = payload.data;
  const profile = {
    name,
    email,
    avatar_id,
    ...(rest.oldPassword ? rest : {}),
  };
  try {
    const response = yield call(api.put, 'users', profile);
    Alert.alert('', 'Your profile was updated!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Update error',
      'There was an error while updating your profile.'
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
