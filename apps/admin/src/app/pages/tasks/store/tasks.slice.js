import { createAppSlice } from 'app/store';
import { APIStatusEnum } from 'app/types';
import { taskService } from 'app/services';

const initialState = {
  tasks: [],
  listStatus: APIStatusEnum.IDLE,
}

export const taskSlice = createAppSlice({
  name: 'tasks',
  initialState,
  reducers: (create) => ({
    setTasks: create.reducer((state, action) => {
      state.tasks = action.payload;
    }),
    addNewTask: create.reducer((state, action) => {
      state.tasks.push(action.payload)
    }),
    getUserTasks: create.asyncThunk(
      async (data, { dispatch }) => {
        const tasks = await taskService.getTasks();
        dispatch(setTasks(tasks));
      },
      {
        pending: (state) => {
          state.listStatus = APIStatusEnum.LOADING;
        },
        fulfilled: (state) => {
          state.listStatus = APIStatusEnum.SUCCESS;
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

export const { setTasks, getUserTasks, addNewTask } = taskSlice.actions;
export const { selectListStatus, selectTasks } = taskSlice.selectors;


export default taskSlice.reducer;