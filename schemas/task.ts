import { FastifyZodOpenApiSchema } from 'fastify-zod-openapi';
import { z } from 'zod';

export const createTaskSchema: FastifyZodOpenApiSchema = {
  params: z.object({
    id: z.number(),
  }),
  body: z.object({
    title: z.string().min(1).max(255),
    completed: z.boolean().optional(),
  }),
};

export const deleteTaskSchema: FastifyZodOpenApiSchema = {
  params: z.object({
    id: z.number(),
  }),
};