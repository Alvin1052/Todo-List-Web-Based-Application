import { date, z } from 'zod';
export const formscheme = z.object({
  title: z
    .string()
    .min(3)
    .max(50, { message: 'title must be at least 10 characters' })
    .nonempty({
      message: 'title is required',
    }),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  date: z.refine((value) => date().safeParse(value).success, {
    message: 'Invalid date',
  }),
});

export type TFormScheme = z.infer<typeof formscheme>;
