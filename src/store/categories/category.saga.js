import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getCollectionAndDocuments } from '../../utils/firebase/firebase.util';

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './category.action';
import { CATEGORIES_ACTION_TYPE } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    console.log('ERROR');
    yield put(fetchCategoriesFailed, error);
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
