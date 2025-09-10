import { PencilIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

import { useAppDispatch } from '@/app/hooks';
import {
  RemoveTodolist,
  updateTodolist,
} from '@/features/todos/todolistSlice/todoslistSlice';
import { cn } from '@/lib/utils';
import { Typetodos } from '@/Services/todos';
import { TPriority } from '@/types/todoTypes';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface ListCardProps {
  todo: Typetodos;
}
const ListCard: React.FC<ListCardProps> = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const dispatch = useAppDispatch();

  const handleCheckbox = () => {
    dispatch(
      updateTodolist({
        id: todo.id,
        newTodo: { ...todo, completed: !todo.completed },

        // newTodo: {
        //   id: todo.id,
        //   title: 'lol',
        //   completed: todo.completed,
        //   date: todo.date,
        //   priority: todo.priority,
        // },
      })
    );
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    dispatch(RemoveTodolist(todo.id));
    console.log('0');
  };

  const date = new Date(todo.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <div key={todo.id} className='w-full'>
      <div className='stroke flex w-full items-center justify-between gap-4 rounded-2xl border border-neutral-900 bg-neutral-950 p-3'>
        {/* Checkbox */}
        <Checkbox
          className='cursor-pointer'
          checked={isChecked}
          onClick={handleCheckbox}
        />
        {/* Middle */}
        <div className='flex w-full flex-col gap-1'>
          <div
            className={cn(
              `text-md-semibold text-neutral-25 ${isChecked && 'text-neutral-600 line-through'}`
            )}
          >
            {todo.title}
          </div>
          <div className='flex gap-6.5'>
            <div
              className={cn(
                'text-sm-regular text-neutral-400',
                isChecked && 'text-neutral-600'
              )}
            >
              {date}
            </div>
            <PriorityTag Priority={todo.priority} />
          </div>
        </div>
        {/* Option */}

        <Popover>
          <PopoverTrigger className='rounded-[4px] p-0.5 hover:bg-neutral-800'>
            <Image
              src='/icons/three-dots.svg'
              alt='dots'
              width={24}
              height={24}
            />
          </PopoverTrigger>
          <PopoverContent className='flex flex-col gap-5'>
            <div className='flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-neutral-900'>
              <PencilIcon size={20} /> <p className='text-md-regular'> Edit</p>
            </div>
            <div
              className='flex cursor-pointer items-center gap-2 rounded-md p-1 text-[var(--color-accent-red)] hover:bg-neutral-900'
              onClick={handleDelete}
            >
              <Trash2 size={20} /> <p className='text-md-regular'> Delete</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ListCard;

type TPriorityVariants = Record<
  TPriority,
  { color: string; textColor: string }
>;

const PriorityVariants: TPriorityVariants = {
  LOW: {
    color: `var(--color-accent-green)`,
    textColor: 'white',
  },
  MEDIUM: {
    color: `var(--color-accent-yellow)`,
    textColor: 'black',
  },
  HIGH: {
    color: `var(--color-accent-red)`,
    textColor: 'white',
  },
};

interface PriorityTagProps {
  Priority: TPriority;
}
const PriorityTag: React.FC<PriorityTagProps> = ({ Priority }) => {
  return (
    <div
      className={`text-sm-semibold flex items-center justify-center rounded-md px-2 text-center`}
      style={{
        backgroundColor: PriorityVariants[Priority].color,
        color: PriorityVariants[Priority].textColor,
      }}
    >
      {Priority}
    </div>
  );
};
