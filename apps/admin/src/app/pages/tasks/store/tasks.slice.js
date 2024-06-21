import { createAppSlice } from 'app/store';
import { APIStatusEnum } from 'app/types';
import { taskService } from 'app/services';

const initialState = {
  tasks: [],
  listStatus: APIStatusEnum.IDLE,
  createTaskStatus: APIStatusEnum.IDLE,
}

export const taskSlice = createAppSlice({
  name: 'tasks',
  initialState,
  reducers: (create) => ({
    setTasks: create.reducer((state, action) => {
      state.tasks = action.payload;
    }),
    createTask: create.asyncThunk(
      async (task, { rejectWithValue }) => {
        try {
          const newTask = await taskService.createTask(task);
          return newTask;
        } catch (error) {
          return rejectWithValue('Failed to add new task');
        }
      },
      {
        pending: (state) => {
          state.createTaskStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.createTaskStatus = APIStatusEnum.SUCCESS;
          state.tasks.push(action.payload);
        },
        rejected: (state) => {
          state.createTaskStatus = APIStatusEnum.FAILED;
        }
      }
    ),
    getUserTasks: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const tasks = await taskService.getTasks();
          return tasks;
        }
        catch (error) {
          rejectWithValue('Failed to load the users')
        }
      },
      {
        pending: (state) => {
          state.listStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.listStatus = APIStatusEnum.SUCCESS;
          state.tasks = action.payload;
        },
        rejected: (state) => {
          state.listStatus = APIStatusEnum.FAILED;
        }
      }
    )
  }),
  selectors: {
    selectListStatus: (state) => state.listStatus,
    selectTasks: (state) => state.tasks
  }
})

export const { setTasks, getUserTasks, createTask } = taskSlice.actions;
export const { selectListStatus, selectTasks } = taskSlice.selectors;


export default taskSlice.reducer;