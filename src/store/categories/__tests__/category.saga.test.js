import { call } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from '../category.saga';
import { fetchCategoriesStart } from '../category.reducer';

describe('Category Saga tests', () => {
  test('categoriesSaga', () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });

  test('onFetchCategories', () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(fetchCategoriesStart, fetchCategoriesAsync)
      .next()
      .isDone();
  });
});
