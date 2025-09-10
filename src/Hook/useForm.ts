import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { AddTodolist } from '@/features/todos/todolistSlice/todoslistSlice';
import { TFormScheme, formscheme } from '@/lib/validation/form';
import { Typetodos } from '@/Services/todos';
import { TPriority } from '@/types/todoTypes';

const useForms = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  // const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isFailed, setisFailed] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const { todos } = useAppSelector((state) => state.todos);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm<TFormScheme>({
    resolver: zodResolver(formscheme),
    defaultValues: {
      title: '',
      priority: undefined, // Optional, can be undefined
      date: new Date(), // Must be a Date object
    },
  });
  interface DataInput {
    title: string;
    date: Date;
    priority: TPriority;
  }
  const onSubmit = (data: DataInput) => {
    const dataSubmit: Typetodos = {
      ...data,
      priority: data.priority,
      date: data.date.toString(),
      id: uuidv4().toString(),
      completed: false,
    };
    setServerError(null);
    console.log(dataSubmit);

    dispatch(AddTodolist(dataSubmit));
    reset();
  };

  return {
    register,
    formstate: { errors, isSubmitting },

    handleSubmit,
    reset,
    onSubmit,
    serverError,
    setValue,
  };
};
export default useForms;
