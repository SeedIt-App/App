import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import sagas from './sagas';
import { AuthActions } from './actions';
import { setAuthHeaders } from './api';

const localStorageMiddleware = ({ getState }) => next => action => {
  const result = next(action);
  // if (action.type === AuthActions.SET_AUTH_USER) {
  AsyncStorage.setItem('authState', JSON.stringify(getState().auth));
  setAuthHeaders(getState().auth);
  // }
  if (action.type === AuthActions.LOGOUT) {
    AsyncStorage.removeItem('authState');
    setAuthHeaders('');
  }
  return result;
};

const networkErrorMiddleware = store => next => action => {
  if (action.payload && action.payload.code === 9999) {
    return store.dispatch({ type: 'NETWORK_ERROR' });
  }
  return next(action);
};

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  if (initialState && initialState.auth) {
    setAuthHeaders(initialState.auth);
  }
  const middleware = [
    sagaMiddleware,
    localStorageMiddleware,
    networkErrorMiddleware,
  ];
  const composeEnhancers =
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(sagas);
  return store;
}
