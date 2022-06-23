import {compose, applyMiddleware} from 'redux';
import { legacy_createStore as createStore} from 'redux';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

import { rootSaga } from './root-saga';

import {rootReducer} from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger, 
  sagaMiddleware
].filter(Boolean);

const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);