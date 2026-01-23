import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6)
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional()
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional()
});
