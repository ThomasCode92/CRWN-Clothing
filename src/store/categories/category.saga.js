import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getCollectionAndDocuments } from '../../utils/firebase/firebase.util';

import {
  fetchCategoriesStart,
  setCategories,
  setError,
} from './category.reducer';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments, 'categories');
    yield put(setCategories(categoriesArray));
  } catch (error) {
    console.log('ERROR');
    yield put(setError, error);
  }
}

export function* onFetchCategories() {
  yield takeLatest(fetchCategoriesStart, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
