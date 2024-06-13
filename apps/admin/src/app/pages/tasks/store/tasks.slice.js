import { createAppSlice } from 'app/store';

const initialState = {
  title: '',
  tags: '',
  tasks: []
}

export const taskSlice = createAppSlice({
  name: 'tasks',
  initialState,
  reducers: (create) => ({
    addNewTask: create.reducer((state, action) => {
      state.tasks.push(action.payload)
    }),
  })
})

export const { addNewTask } = taskSlice.actions;


export default taskSlice.reducer;