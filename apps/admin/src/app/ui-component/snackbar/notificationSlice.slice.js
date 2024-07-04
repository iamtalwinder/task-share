import { createAppSlice } from 'app/store';

const initialState = {
  isOpen: false,
  message: '',
  duration: 3000,
  severity: 'success' | 'error' | 'warning' | 'info'
}

export const snackbarSlice = createAppSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showMessage(state, action) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.duration = action.payload.duration || 3000;
      state.severity = action.payload.severity;
    },
    hideMessage(state) {
      state.isOpen = false;
      state.message = '';
    },
  }
})

export const { showMessage, hideMessage } = snackbarSlice.actions

export default snackbarSlice.reducer;