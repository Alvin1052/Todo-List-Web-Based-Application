'use client';

import { SelectGroup } from '@radix-ui/react-select';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import { FilterIcon, MoonIcon, Search, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';

import { priorityLevel } from '@/constant/listPriority';
import { fetchAllList } from '@/features/todos/todolistSlice/todoslistSlice';
import CompletedTabs from '@/partials/completed';
import TodayTabs from '@/partials/today';
import UpcomingTabs from '@/partials/upcoming';
import { TPriority } from '@/types/todoTypes';

import { useAppDispatch, useAppSelector } from './hooks';

const Home = () => {
  const { setTheme } = useTheme();
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<TPriority | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(
      fetchAllList({
        priority: filterPriority,
        pageNumber: 1,
        limit: 100,
        sort: 'title',
        order: 'asc',
      })
    );
    console.log(filterPriority);
  }, [dispatch, filterPriority]);

  const ListTodo = todos
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 100);

  return (
    <div className='custom-container mt-26 max-w-150 pt-5 pb-40'>
      <div className='flex-center w-full flex-col gap-5'>
        {/* Title */}
        <div className='flex-between w-full'>
          <div className='flex flex-col gap-2'>
            <div className='display-sm-bold'>What’s on Your Plan Today?</div>
            <div className='text-md-regular'>Your productivity starts now.</div>
          </div>
          <div className='flex items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-950 p-2'>
            <button
              className='bg-primary-100 rounded-xl p-1.5'
              onClick={() => {
                setTheme('light');
              }}
            >
              <Sun size={20} />
            </button>
            <button
              className='bg-primary-100 rounded-xl p-1.5'
              onClick={() => setTheme('dark')}
            >
              <MoonIcon size={20} />
            </button>
          </div>
        </div>
        {/* Filter */}
        <div className='flex h-12 w-full gap-3'>
          {/* Search */}
          <div className='flex w-full items-center gap-2.5 rounded-2xl border border-neutral-900 px-4 py-3'>
            <Search />
            <input
              value={search}
              type='search'
              placeholder='Search'
              className='w-full focus:outline-none'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Priority */}
          <Select onValueChange={(e: TPriority) => setFilterPriority(e)}>
            <SelectTrigger className='flex cursor-pointer flex-row items-center gap-3 rounded-2xl border border-neutral-900 px-3 py-3.5 hover:bg-neutral-900 dark:bg-transparent'>
              <FilterIcon size={20} />
              <div> Priority</div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={'aa'}>--</SelectItem>
                {priorityLevel.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Today Upcoming */}
        <div className='w-full'>
          <Tabs defaultValue='today'>
            <TabsList className='flex w-full rounded-2xl border-1 border-neutral-900 bg-neutral-950 p-2'>
              <TabsTrigger className='w-full text-center' value='today'>
                Today
              </TabsTrigger>
              <TabsTrigger className='w-full text-center' value='upcoming'>
                Upcoming
              </TabsTrigger>
              <TabsTrigger className='w-full text-center' value='completed'>
                Completed
              </TabsTrigger>
            </TabsList>
            <TabsContent value='today'>
              <TodayTabs todo={ListTodo} />
            </TabsContent>
            <TabsContent value='upcoming'>
              <UpcomingTabs todo={ListTodo} />
            </TabsContent>
            <TabsContent value='completed'>
              <CompletedTabs todo={ListTodo} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
