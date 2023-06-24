import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { procedure, router } from "../trpc";
import { createInput, updateInput } from "../types/todo";

// 新しいPrismaClientインスタンスを作成します。
const prisma = new PrismaClient();

// 新しいrouterを作成します。
export const todoRouter = router({
  // 全てのTODOを取得するクエリです。
  getTodos: procedure.query(async () => {
    // 全てのTODOをデータベースから取得します。
    const todos = await prisma.todo.findMany();

    // 取得したTODOを返します。
    return todos;
  }),

  // 特定のIDのTODOを取得するクエリです。
  getTodoById: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      // 指定されたIDのTODOをデータベースから取得します。
      const todo = await prisma.todo.findUnique({
        where: { id: input.id },
      });

      // TODOが見つからない場合、エラーをスローします。
      if (!todo) {
        throw new Error("Todo not found");
      }

      // 取得したTODOを返します。
      return todo;
    }),

  // 新しいTODOを作成するミューテーションです。
  createTodo: procedure.input(createInput).mutation(async ({ input }) => {
    // 新しいTODOをデータベースに作成します。タイトルとボディを入力から取得します。
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        body: input.body,
      },
    });

    // 作成したTODOを返します。
    return todo;
  }),

  updateTodo: procedure.input(updateInput).mutation(async ({ input }) => {
    const { id, title, body } = input;
    const todo = await prisma.todo.update({
      where: { id },
      data: { title, body },
    });
    return todo;
  }),
  deleteTodo: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.todo.delete({
        where: { id: input.id },
      });
    }),
});
