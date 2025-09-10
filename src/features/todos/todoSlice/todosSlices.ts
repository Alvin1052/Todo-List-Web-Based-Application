import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Typetodos } from '@/Services/todos';

interface todoState {
  todos: Typetodos[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
  isSuccess?: boolean;
  message?: string;
}

const initialState: todoState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: undefined,
  isSuccess: false,
  message: undefined,
};

const todoslice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    AddTodolist: (state, action: PayloadAction<Typetodos>) => {
      state.todos.push(action.payload);
    },
    RemoveTodolist: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    updateTodolist: (
      state,
      action: PayloadAction<{ id: string; newTodo: Typetodos }>
    ) => {
      const todoUpdate = action.payload.newTodo;
      todoUpdate.completed = !todoUpdate.completed;
      state.todos.map(
        (item) =>
          item.id === todoUpdate.id && (item.completed = todoUpdate.completed)
      );
    },
  },
});

export const { AddTodolist, RemoveTodolist, updateTodolist } =
  todoslice.actions;
export default todoslice.reducer;
