import { createAppSlice } from 'app/store';
import { APIStatusEnum } from 'app/types';
import { taskService } from 'app/services';

const initialState = {
  tasks: [],
  listStatus: APIStatusEnum.IDLE,
  createTaskStatus: APIStatusEnum.IDLE,
  updateTaskStatus: APIStatusEnum.IDLE
};

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
    getTask: create.asyncThunk(
      async (taskId, { rejectWithValue }) => {
        try {
          const updatedTask = await taskService.getTaskById(taskId);
          return updatedTask;
        } catch (error) {
          return rejectWithValue('Failed to update the task');
        }
      },
      {
        pending: (state) => {
          state.createTaskStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state) => {
          state.createTaskStatus = APIStatusEnum.SUCCESS;
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
          state.tasks = action.payload;
        },
        rejected: (state) => {
          state.listStatus = APIStatusEnum.FAILED;
        }
      }
    ),

    updateTask: create.asyncThunk(
      async ({ taskId, updatedTask }, { rejectWithValue }) => {
        try {
          const updated = await taskService.updateTask(taskId, updatedTask);
          return updated;
        } catch (error) {
          return rejectWithValue('Failed to update the task');
        }
      },
      {
        pending: (state) => {
          state.updateTaskStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.updateTaskStatus = APIStatusEnum.SUCCESS;
          const index = state.tasks.findIndex((task) => task.id === action.payload.id);

          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        },
        rejected: (state) => {
          state.updateTaskStatus = APIStatusEnum.FAILED;
        }
      }
    ),
  }),
  selectors: {
    selectListStatus: (state) => state.listStatus,
    selectTasks: (state) => state.tasks,
    selectCreateTaskStatus: (state) => state.createTaskStatus,
    selectUpdateTaskStatus: (state) => state.updateTaskStatus,
  }
});

export const { setTasks, getUserTasks, createTask, getTask, updateTask } = taskSlice.actions;
export const { selectListStatus, selectTasks, selectCreateTaskStatus, selectUpdateTaskStatus } = taskSlice.selectors;

export default taskSlice.reducer;
