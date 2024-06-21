import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'app/auth/store';
import customizationReducer from './customizationReducer';
import taskReducer from '../pages/tasks/store/tasks.slice';

const reducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  customization: customizationReducer,
});

export default reducer;
