'use client';

import { addDays, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

import ListCard from '@/components/listcard';

import { useAppSelector } from '@/app/hooks';
import { TPriority } from '@/types/todoTypes';

import { AddTask } from './today';

interface UpcomingTabsProps {
  filterPriority: TPriority | undefined;
  filterString: string | undefined;
}
const UpcomingTabs: React.FC<UpcomingTabsProps> = ({
  filterPriority,
  filterString,
}) => {
  const { todos } = useAppSelector((state) => state.todos);
  const currentDate = new Date();

  const [filterDate, setFilterDate] = useState<Date>(new Date());

  const ListItem = todos
    .filter(
      (item) =>
        format(item.date, 'yyyy-MM-dd') >= format(filterDate, 'yyyy-MM-dd')
    )
    .filter((item) => !filterPriority || item.priority === filterPriority)
    .filter((item) => !filterString || item.title.includes(filterString));

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
