import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTodos, Typetodos, updateTodo } from '@/Services/todos';

interface todolistState {
  todos: Typetodos[];
  selectedtodos: Typetodos | null;
  isLoading: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: todolistState = {
  todos: [],
  selectedtodos: null,
  isLoading: false,
  status: 'idle',
  error: null,
};

export const fetchAllList = createAsyncThunk<
  Typetodos[],
  {
    completed?: boolean | undefined;
    priority?: string | undefined;
    pageNumber: number;
    limit: number;
    sort?: keyof Typetodos | undefined;
    order: 'asc' | 'desc';
    iscompleted?: boolean;
  },
  { rejectValue: unknown }
>(
  'todos/fetchAllList',
  async (
    {
      pageNumber = 1,
      limit = 10,
      order = 'asc',
      completed = undefined,
      priority = undefined,
      sort = 'id',
      iscompleted = false,
    },
    { rejectWithValue }
  ) => {
    try {
      // http://localhost:8080/todos?completed=false&priority=MEDIUM&page=1&limit=10&sort=id&order=asc
      const query = `?${iscompleted ? `completed=${completed}&` : ''}${priority ? `priority=${priority}&` : ''}page=${pageNumber}&limit=${limit}&sort=${sort}&order=${order}`;

      // const query = `?page=${pageNumber}&limit=${limit}&order=${order}`;
      const todolist = await getTodos(query);
      return todolist.todos;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch todo list.'
      );
    }
  }
);

const updateTodoList = createAsyncThunk<
  Typetodos,
  { id: string; newTodo: Typetodos },
  { rejectValue: string }
>('todos/UpdateList', async ({ id, newTodo }, { rejectWithValue }) => {
  try {
    console.log(id, `todo:`, newTodo);
    const todolist = await updateTodo(id, newTodo);
    console.log('todolist:', todolist);
    return todolist;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        'Failed to update todos.'
    );
  }
});

const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    AddTodolist: (state, action) => {
      state.todos.push(action.payload);
    },
    RemoveTodolist: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    updateTodolist: (
      state,
      action: PayloadAction<{ id: string; newTodo: Typetodos }>
    ) => {
      const todoUpdate = action.payload.newTodo;

      state.todos.map((item) => {
        if (item.id === todoUpdate.id) {
          item.completed = todoUpdate.completed;
        }
      });

      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(
        fetchAllList.fulfilled,
        (state, action: PayloadAction<Typetodos[]>) => {
          state.isLoading = false;
          state.todos = action.payload;
          state.status = 'succeeded';
        }
      )
      .addCase(fetchAllList.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load products.';
      })

      .addCase(
        updateTodoList.fulfilled,
        (state, action: PayloadAction<Typetodos>) => {
          const todoUpdate = action.payload;
          console.log('aa');
          todoUpdate.completed = !todoUpdate.completed;
          state.todos.map(
            (item) =>
              item.id === todoUpdate.id &&
              (item.completed = todoUpdate.completed) &&
              updateTodoList({ id: item.id, newTodo: todoUpdate })
          );

          state.status = 'succeeded';

          state.isLoading = false;
        }
      )
      .addCase(updateTodoList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load products.';
      });
  },
});
export const { updateTodolist, AddTodolist, RemoveTodolist } =
  todolistSlice.actions;
export default todolistSlice.reducer;
