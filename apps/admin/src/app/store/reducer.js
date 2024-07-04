import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'app/auth/store';
import customizationReducer from './customizationReducer';
import taskReducer from '../modules/task/store/tasks.slice';
import notificationReducer from '../ui-component/snackbar/notificationSlice.slice';

const reducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  snackbar: notificationReducer,
  customization: customizationReducer
});

export default reducer;
