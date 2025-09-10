'use client';

import { format } from 'date-fns';
import { CalendarDaysIcon, ChevronDownIcon, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import ListCard from '@/components/listcard';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import { useAppSelector } from '@/app/hooks';
import { priorityLevel } from '@/constant/listPriority';
import useForms from '@/Hook/useForm';
import { TPriority } from '@/types/todoTypes';

interface TodayTabsProps {
  filterPriority: TPriority | undefined;
  filterString: string | undefined;
}

const TodayTabs: React.FC<TodayTabsProps> = ({
  filterPriority,
  filterString,
}) => {
  const { todos } = useAppSelector((state) => state.todos);
  const currentDate = new Date();
  console.log(currentDate);

  const listItem = todos
    .filter(
      (item) =>
        format(item.date, 'yyyy-MM-dd') == format(currentDate, 'yyyy-MM-dd')
    )
    .filter((item) => !filterPriority || item.priority === filterPriority)
    .filter((item) => !filterString || item.title.includes(filterString));

  return (
    <div className='flex w-full flex-col gap-5'>
      {/* Title */}
      <div className='w-full'>
        <div className='flex items-center gap-2'>
          <div className='display-xs-bold text-neutral-25'>Today</div>
          <div className='text-xs-semibold text-neutral-25 rounded-full bg-neutral-900 px-3 py-0.5'>
            {listItem.length} items
          </div>
        </div>
        <div className='text-sm-regular text-neutral-400'>
          {format(currentDate, 'MMM d, yyyy')}
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {/* List */}
        {listItem.map((item, index) => (
          <ListCard key={index} todo={item} />
        ))}
      </div>
      <div className='flex-center'>
        <AddTask />
      </div>
    </div>
  );
};

export default TodayTabs;

export const AddTask = () => {
  const [openDate, setOpenDate] = useState(false);

  const {
    formstate: { errors, isSubmitting },
    handleSubmit,
    setValue,
    onSubmit,
    register,
    openDialog,
    priority,
    setPriority,
    date,
    setDate,
    setOpenDialog,
    serverError,
  } = useForms();

  useEffect(() => {
    if (priority) {
      setValue('priority', priority);
    }
  }, [priority, setValue]);

  useEffect(() => {
    setValue('date', date);
  }, [date, setValue]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className='flex-center bg-primary-100 w-full max-w-75 rounded-md px-3 py-2'>
        <Plus />
        <p>Add Task</p>
      </DialogTrigger>

      <DialogContent className='w-full max-w-117'>
        <form
          onSubmit={handleSubmit((data: any) => {
            onSubmit(data);
          })}
          className='flex flex-col gap-6'
        >
          <div className='display-xs-bold text-neutral-25'>Add Task</div>
          <div className='flex flex-col gap-4'>
            {/* Title */}
            <textarea
              {...register('title')}
              placeholder='Enter your task'
              className='text-md-regular h-35 rounded-md border border-neutral-900 px-3 py-2 text-neutral-400'
            />
            {errors.title && (
              <p className='text-sm-regular text-[var(--color-accent-red)]'>
                {errors.title.message}
              </p>
            )}
            {/* Priority */}
            <Select
              {...register('priority')}
              onValueChange={(e: TPriority) => setPriority(e)}
            >
              <SelectTrigger className='flex w-full justify-between'>
                <div className='flex flex-col items-start'>
                  {priority && (
                    <p className='text-xs-regular text-left text-neutral-500'>
                      Select Priority
                    </p>
                  )}

                  <p>{priority ? priority : 'Select Priority'}</p>
                </div>
                <ChevronDownIcon className='text-neutral-25 size-4' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {priorityLevel.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      <p className='text-md-regular'> {item}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className='text-sm-regular text-[var(--color-accent-red)]'>
                {errors.priority.message}
              </p>
            )}
            {/* Date */}
            <div className='flex-between rounded-md border border-neutral-900 px-3 py-2'>
              <div
                className='flex flex-col gap-0'
                onClick={() => setOpenDate(true)}
              >
                {date && (
                  <div className='text-xs-regular text-neutral-500'>
                    Select date
                  </div>
                )}
                <div className='text-md-regular'>
                  {date ? format(date, 'MMM d, yyyy') : 'Select Date'}
                </div>
              </div>

              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <CalendarDaysIcon aria-label='Open calendar' />
                </PopoverTrigger>
                <PopoverContent
                  className='px-auto w-auto overflow-hidden border border-neutral-900'
                  align='center'
                >
                  <Calendar
                    mode='single'
                    selected={date}
                    captionLayout='dropdown'
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        setDate(selectedDate);
                      }
                      setOpenDate(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {errors.date && (
              <p className='text-sm-regular text-[var(--color-accent-red)]'>
                {errors.date.message}
              </p>
            )}

            {/* Button */}

            <Button
              type='submit'
              className='bg-primary-100 text-md-semibold h-12 w-full rounded-md'
            >
              {isSubmitting ? 'Loading...' : 'Save'}
            </Button>
            {serverError && <div>{serverError}</div>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
