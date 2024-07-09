import { createAppSlice } from 'app/store';
import { APIStatusEnum } from 'app/types';
import { testService } from 'app/services';

const initialState = {
  tests: [],
  listStatus: APIStatusEnum.IDLE,
  createTestStatus: APIStatusEnum.IDLE,
  viewTestStatus: APIStatusEnum.IDLE,
};

export const testSlice = createAppSlice({
  name: 'tests',
  initialState,
  reducers: (create) => ({
    setTests: create.reducer((state, action) => {
      state.tests = action.payload;
    }),

    createTest: create.asyncThunk(
      async (test, { rejectWithValue }) => {
        try {
          return testService.createTest(test);
        } catch (error) {
          return rejectWithValue('Failed to add new task');
        }
      },
      {
        pending: (state) => {
          state.createTestStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.createTestStatus = APIStatusEnum.SUCCESS;
          state.tests.push(action.payload);
        },
        rejected: (state) => {
          state.createTestStatus = APIStatusEnum.FAILED;
        }
      }
    ),
    getUserTests: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          return testService.getTests();
        } catch (error) {
          rejectWithValue('Failed to load the users');
        }
      },
      {
        pending: (state) => {
          state.listStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.listStatus = APIStatusEnum.SUCCESS;
          state.tests = action.payload;
        },
        rejected: (state) => {
          state.listStatus = APIStatusEnum.FAILED;
        }
      }
    ),
  }),
  selectors: {
    selectListStatus: (state) => state.listStatus,
    selectTests: (state) => state.tests,
    selectCreateTestStatus: (state) => state.createTestStatus,
    // selectUpdateTestStatus: (state) => state.updateTestStatus,
    // selectViewTestStatus: (state) => state.viewTestStatus,
    // selectSelectedTest: (state) => state.selectedTest
  }
})

export const { setTests, createTest, getUserTests } = testSlice.actions;

export const { selectCreateTestStatus, selectListStatus, selectTests } = testSlice.selectors;

export default testSlice.reducer;
