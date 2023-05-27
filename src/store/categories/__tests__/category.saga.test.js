import { call } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from '../category.saga';
import {
  fetchCategoriesStart,
  setCategories,
  setError,
} from '../category.reducer';

import { getCollectionAndDocuments } from '../../../utils/firebase/firebase.util';

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

  test('fetchCategoriesAsync success', () => {
    const mockCategoriesArray = [
      { id: 1, name: 'Category A' },
      { id: 2, name: 'Category B' },
    ];

    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCollectionAndDocuments, 'categories'), mockCategoriesArray],
      ])
      .put(setCategories(mockCategoriesArray))
      .run();
  });

  test('fetchCategoriesAsync failed', () => {
    const mockError = new Error('An error occurred');

    return expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCollectionAndDocuments, 'categories'), throwError(mockError)],
      ])
      .put(setError(mockError))
      .run();
  });
});
