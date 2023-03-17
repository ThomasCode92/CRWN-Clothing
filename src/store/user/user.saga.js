import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  signInFailed,
  signInSuccess,
  signUpFailed,
  signUpSuccess,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.util';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUpWithEmail({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInAfterSignup({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignup);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
