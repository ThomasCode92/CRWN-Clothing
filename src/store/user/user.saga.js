import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  setCurrentUser,
  setError,
  signOutStart,
  signUpStart,
} from './user.reducer';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutAuthUser,
} from '../../utils/firebase/firebase.util';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    yield put(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(setError(error));
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

    yield call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    yield put(setError(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(setError(error));
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
    yield put(setError(error));
  }
}

export function* signInAfterSignup({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield call(signOutAuthUser);
    yield put(setCurrentUser());
  } catch (error) {
    yield put(setError(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart, signUpWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(signOutStart, signOut);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
  ]);
}
