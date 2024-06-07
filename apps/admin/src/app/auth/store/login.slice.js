import { APIStatusEnum } from 'app/types';
import { createAppSlice } from 'app/store';
import { authService } from 'app/services';
import { setUser } from './user.slice';

const initialState = {
  success: false,
  status: APIStatusEnum.IDLE,
  errors: []
};

export const loginSlice = createAppSlice({
  name: 'auth/login',
  initialState,
  reducers: (create) => ({
    submitLogin: create.asyncThunk(
      async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
          const response = await authService.login(email, password);
          dispatch(setUser(response.user));
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      },
      {
        pending: (state) => {
          state.errors = [];
          state.status = APIStatusEnum.LOADING;
        },
        fulfilled: (state) => {
          state.errors = [];
          state.status = APIStatusEnum.SUCCESS;
        },
        rejected: (state, actions) => {
          state.errors = actions.payload.errors;
          state.status = APIStatusEnum.FAILED;
        }
      }
    )
  }),
  selectors: {
    selectLoginError: (state) => state.errors,
    selectLoginStatus: (state) => state.status
  }
});

export const { submitLogin } = loginSlice.actions;
export const { selectLoginError, selectLoginStatus } = loginSlice.selectors;

export default loginSlice.reducer;
