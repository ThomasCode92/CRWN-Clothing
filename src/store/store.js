import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean);

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
