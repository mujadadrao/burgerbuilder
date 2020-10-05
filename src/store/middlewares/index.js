import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
export const sagaMiddleware = createSagaMiddleware();
export const middlewares =  applyMiddleware(
    thunk,
    logger,
    sagaMiddleware
)
