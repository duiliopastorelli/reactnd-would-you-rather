/**
 * Please note: the logger middleware has been left commented out by
 * purpose. If you want this functionality uncomment it.
 */
import thunk from 'redux-thunk';
// import logger from './logger';
import {applyMiddleware} from 'redux';

export default applyMiddleware(
  thunk,
  // logger,
)