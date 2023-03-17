import { all, call, takeLatest } from 'redux-saga/effects';

import { signInFailed } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

import { getCurrentUser } from '../../utils/firebase/firebase.util';

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;
  } catch (error) {}
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION);
}

export function* userSagas() {
  yield all([]);
}
