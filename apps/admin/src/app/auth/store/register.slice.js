import { authService } from 'app/services';
import { APIStatusEnum } from 'app/types';
import { createAppSlice } from 'app/store';
import { setUser } from './user.slice';

const initialState = {
  success: false,
  status: APIStatusEnum.IDLE,
  errors: [],
};

export const registerSlice = createAppSlice({
  name: 'auth/register',
  initialState,
  reducers: (create) => ({
    submitRegister: create.asyncThunk(
      async (data, { rejectWithValue, dispatch }) => {
        try {
          const response = await authService.register(data);
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
        rejected: (state, action) => {
          state.errors = action.payload.errors;
          state.status = APIStatusEnum.FAILED;
        },
      },
    ),
  }),
  selectors: {
    selectRegisterError: (state) => state.errors,
    selectRegisterStatus: (state) => state.status,
  },
});

export const { submitRegister } = registerSlice.actions;
export const { selectRegisterError, selectRegisterStatus } =
  registerSlice.selectors;

export default registerSlice.reducer;
