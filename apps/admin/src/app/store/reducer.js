import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'app/auth/store';
import customizationReducer from './customizationReducer';

const reducer = combineReducers({
  auth: authReducer,
  customization: customizationReducer
});

export default reducer;
