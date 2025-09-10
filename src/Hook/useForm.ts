import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '@/app/hooks';
import { AddTodolist } from '@/features/todos/todolistSlice/todoslistSlice';
import { TFormScheme, formscheme } from '@/lib/validation/form';
import { Typetodos } from '@/Services/todos';
import { TPriority } from '@/types/todoTypes';

export interface DataInput {
  title: string;
  date: Date;
  priority: TPriority;
}
const useForms = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  // const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isFailed, setisFailed] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const { todos } = useAppSelector((state) => state.todos);
  const [openDialog, setOpenDialog] = useState(false);
  const [priority, setPriority] = useState<TPriority | ''>('');
  const [date, setDate] = useState<Date>(new Date());
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm<TFormScheme>({
    resolver: zodResolver(formscheme),
  });

  const onSubmit = (data: DataInput) => {
    if (errors) {
      setOpenDialog(true);
    }
    const dataSubmit: Typetodos = {
      ...data,
      priority: data.priority,
      date: data.date.toLocaleDateString(),
      id: uuidv4().toString(),
      completed: false,
    };
    setServerError(null);
    console.log(dataSubmit);

    dispatch(AddTodolist(dataSubmit));
    reset();
    setPriority('');
    setDate(new Date());
    setOpenDialog(false);
  };

  return {
    register,
    formstate: { errors, isSubmitting },

    handleSubmit,
    reset,
    onSubmit,
    serverError,
    setValue,
    openDialog,
    setOpenDialog,
    priority,
    setPriority,
    date,
    setDate,
  };
};
export default useForms;
