import { CheckCircle2Icon } from 'lucide-react';
import React from 'react';

import ListCard from '@/components/listcard';

import { Typetodos } from '@/Services/todos';

interface CompletedTabsProps {
  todo: Typetodos[];
}

const CompletedTabs: React.FC<CompletedTabsProps> = ({ todo }) => {
  const ListItem = todo.filter((item) => item.completed === true);

  return (
    <div className='flex w-full flex-col gap-5'>
      {/* Title */}
      <div className='w-full'>
        <div className='flex items-center gap-2'>
          <CheckCircle2Icon className='text-white' />
          <div className='display-xs-bold text-neutral-25'>Completed</div>
          <div className='text-xs-semibold text-neutral-25 rounded-full bg-neutral-900 px-3 py-0.5'>
            {ListItem.length} items
          </div>
        </div>
        <div className='text-sm-regular text-neutral-400'>Aug 5, 2025</div>
      </div>
      <div className='flex flex-col gap-3'>
        {/* List */}
        {ListItem.map((item, index) => (
          <ListCard key={index} todo={item} />
        ))}
      </div>
    </div>
  );
};

export default CompletedTabs;
