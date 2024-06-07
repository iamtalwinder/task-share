import { APIStatusEnum } from 'app/types';
import { createAppSlice } from '../../store/create-app-slice';

const initialState = {
  user: null,
  status: APIStatusEnum.IDLE
};

export const userSlice = createAppSlice({
  name: 'auth/user',
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action) => {
      state.user = action.payload;
    }),
    fetchUserProfile: create.asyncThunk(
      async (userId, { rejectWithValue }) => {
        try {
          const response = { data: { id: userId, name: 'John Doe', email: 'user1@example.com' } }; // Mocked response
          return response.data;
        } catch (error) {
          return rejectWithValue('Failed to fetch user profile');
        }
      },
      {
        pending: state => {
          state.status = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = APIStatusEnum.IDLE;
          state.user = action.payload;
        },
        rejected: state => {
          state.status = APIStatusEnum.FAILED;
        }
      }
    )
  })
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
