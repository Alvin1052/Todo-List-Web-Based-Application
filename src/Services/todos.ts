import { TPriority } from '@/types/todoTypes';

import axiosInstance from './axios';

export interface Typetodos {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  priority: TPriority;
}

export const getTodos = async (url: string) => {
  const response = await axiosInstance().get(`/todos${url}`);
  return response.data;
};

export const addTodo = async (post: Typetodos) => {
  const response = await axiosInstance().post('/todos', { post });
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axiosInstance().delete(`/todos/${id}`);
  return response.data;
};

export const updateTodo = async (id: string, post: Typetodos) => {
  const response = await axiosInstance().put(`/todos/${id}`, { post });

  return response.data;
};
