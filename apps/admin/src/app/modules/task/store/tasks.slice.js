import { createAppSlice } from 'app/store';
import { APIStatusEnum } from 'app/types';
import { taskService } from 'app/services';

const initialState = {
  tasks: [],
  listStatus: APIStatusEnum.IDLE,
  createTaskStatus: APIStatusEnum.IDLE,
  updateTaskStatus: APIStatusEnum.IDLE,
  viewTaskStatus: APIStatusEnum.IDLE
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
          return taskService.createTask(task);
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
          return taskService.getTaskById(taskId);
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
          return taskService.getTasks();
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
          return taskService.updateTask(taskId, updatedTask);
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
    viewTask: create.asyncThunk(
      async (taskId, { rejectWithValue }) => {
        try {
          return taskService.getTaskById(taskId);
        } catch (error) {
          return rejectWithValue('Failed to view the task');
        }
      },
      {
        pending: (state) => {
          state.viewTaskStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.viewTaskStatus = APIStatusEnum.SUCCESS;
          state.selectedTask = action.payload;
        },
        rejected: (state) => {
          state.viewTaskStatus = APIStatusEnum.FAILED;
        }
      }
    )
  }),
  selectors: {
    selectListStatus: (state) => state.listStatus,
    selectTasks: (state) => state.tasks,
    selectCreateTaskStatus: (state) => state.createTaskStatus,
    selectUpdateTaskStatus: (state) => state.updateTaskStatus,
    selectViewTaskStatus: (state) => state.viewTaskStatus,
    selectSelectedTask: (state) => state.selectedTask
  }
});

export const { setTasks, getUserTasks, createTask, getTask, updateTask, viewTask } = taskSlice.actions;

export const { selectListStatus, selectTasks, selectCreateTaskStatus, selectUpdateTaskStatus, selectViewTaskStatus, selectSelectedTask } =
  taskSlice.selectors;

export default taskSlice.reducer;
