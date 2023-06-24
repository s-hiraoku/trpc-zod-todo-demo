import { z } from "zod";

// 新規作成用
export const createInput = z.object({
  title: z
    .string()
    .min(1, "todo must be at least 1 letter")
    .max(10, "todo must be 10 letters or less"),
  body: z
    .string()
    .min(1, "todo must be at least 1 letter")
    .max(50, "todo must be 50 letters or less"),
});

// 更新用
export const updateInput = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, "todo must be at least 1 letter")
    .max(50, "todo must be 10 letters or less"),
  body: z
    .string()
    .min(1, "todo must be at least 1 letter")
    .max(50, "todo must be 50 letters or less"),
});

export type Todo = z.infer<typeof updateInput>;
