export type ListPriorityProps = {
  id: string;
  title: string;
  date: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
};

export const priorityLevel = ['LOW', 'MEDIUM', 'HIGH'];

const ListPriorityItems: ListPriorityProps[] = [
  {
    id: '1',
    title: 'Pratice about Frontend Developer',
    date: 'Aug 5, 2025',
    priority: 'MEDIUM',
    completed: true,
  },
  {
    id: '2',
    title: 'Pratice about Frontend Developer',
    date: 'Sep 6, 2025',
    priority: 'LOW',
    completed: true,
  },
  {
    id: '2',
    title: 'Pratice about Frontend Developer',
    date: 'Aug 5, 2025',
    priority: 'MEDIUM',
    completed: true,
  },
  {
    id: '2',
    title: 'Pratice about Frontend Developer',
    date: 'Aug 5, 2025',
    priority: 'HIGH',
    completed: true,
  },
  {
    id: '2',
    title: 'Pratice about Frontend Developer',
    date: 'Aug 5, 2025',
    priority: 'MEDIUM',
    completed: true,
  },
];

export default ListPriorityItems;
