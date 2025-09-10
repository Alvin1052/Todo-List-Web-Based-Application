'use client';

import { addDays, format } from 'date-fns';
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
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
import { Typetodos } from '@/Services/todos';
import { TPriority } from '@/types/todoTypes';

interface UpcomingTabsProps {
  todo?: Typetodos[];
}
const UpcomingTabs: React.FC<UpcomingTabsProps> = () => {
  const { todos } = useAppSelector((state) => state.todos);
  const currentDate = new Date();

  const [filterDate, setFilterDate] = useState<Date>(new Date());

  const ListItem = todos;

  return (
    <div className='flex w-full flex-col gap-5'>
      {/* Title */}
      <div className='flex-between w-full'>
        <div className='w-full'>
          {/* Title & NumItems */}
          <div className='flex items-center gap-2'>
            <div className='display-xs-bold text-neutral-25'>Upcoming</div>
            <div className='text-xs-semibold text-neutral-25 rounded-full bg-neutral-900 px-3 py-0.5'>
              {ListItem.length} items
            </div>
          </div>
          {/* CUrrent Date */}
          <div className='text-sm-regular text-neutral-400'>
            {format(currentDate, 'MMM d, yyyy')}
          </div>
        </div>
        {/* Filter Date */}
        <div className='flex w-full max-w-40 items-center justify-center gap-3 rounded-md border border-neutral-900 px-3 py-1'>
          <ChevronLeft
            size={20}
            className='cursor-pointer'
            onClick={() => {
              setFilterDate(addDays(filterDate, -1));
            }}
          />
          <div className='w-full text-center'>
            {currentDate.toDateString() !== filterDate.toDateString()
              ? format(filterDate, 'MMM d, yyyy')
              : 'Today'}
          </div>

          <ChevronRight
            size={20}
            className='cursor-pointer'
            onClick={() => {
              setFilterDate(addDays(filterDate, +1));
            }}
          />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        {/* List */}
        {ListItem.map((item, index) => (
          <ListCard key={index} todo={item} />
        ))}
      </div>
      <div className='flex-center'>
        <AddTask />
      </div>
    </div>
  );
};

export default UpcomingTabs;

const AddTask = () => {
  const [priority, setPriority] = useState<TPriority | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const {
    formstate: { errors, isSubmitting },
    handleSubmit,
    setValue,
    onSubmit,
    register,

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
    <Dialog>
      <DialogTrigger className='flex-center bg-primary-100 w-full max-w-75 rounded-md px-3 py-2'>
        <Plus />
        <p>Add Task</p>
      </DialogTrigger>

      <DialogContent className='w-full max-w-117'>
        <form
          onSubmit={handleSubmit((data) => {
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
              defaultValue={priority}
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
                onClick={() => setOpen(true)}
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

              <Popover open={open} onOpenChange={setOpen}>
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
                      setOpen(false);
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
            <Button type='submit' className='w-full'>
              {isSubmitting ? 'Loading...' : 'Save'}
            </Button>
            {serverError && <div>{serverError}</div>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PriorityList = ({ ...props }: React.ComponentProps<'select'>) => {
  const [priority, setPriority] = useState<string | undefined>(undefined);
  return (
    <Select onValueChange={(e: TPriority) => setPriority(e)}>
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
  );
};

const DatePicker = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  return (
    <div className='flex-between rounded-md border border-neutral-900 px-3 py-2'>
      <div className='flex flex-col gap-0'>
        {date && (
          <div className='text-xs-regular text-neutral-500'>Select date</div>
        )}
        <div className='text-md-regular' onClick={() => setOpen(true)}>
          {date ? date.toLocaleDateString() : 'Select Date'}
        </div>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <CalendarDaysIcon />
        </PopoverTrigger>
        <PopoverContent
          className='px-auto w-auto overflow-hidden border border-neutral-900'
          align='center'
        >
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
