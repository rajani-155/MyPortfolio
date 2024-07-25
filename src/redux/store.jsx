
import rootslice from './rootSlice';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  root: rootslice,
});

const store = configureStore({
  reducer,
});

export default store;
