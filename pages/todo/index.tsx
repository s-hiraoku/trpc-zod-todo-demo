import { ChangeEvent, useState } from "react";
import { Todo } from "../../server/types/todo";
import { trpc } from "../../utils/trpc";
import Link from "next/link";
import styles from "./index.module.css";

export default function Page() {
  // getTodosエンドポイントからデータを取得
  const { data } = trpc.todo.getTodos.useQuery();

  // createTodoエンドポイントに対するmutationを生成
  const createTodoMutation = trpc.todo.createTodo.useMutation();

  // deleteTodoエンドポイントに対するmutationを生成
  const deleteTodoMutation = trpc.todo.deleteTodo.useMutation();

  // タイトルと本文を保持するためのstateを作成
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // データがまだ取得できていない場合、何も表示しない
  if (!data) {
    return;
  }

  // 新規ToDoを作成する処理
  const handleCreateTodo = async () => {
    try {
      // タイトルと本文が存在する場合のみ新規ToDoを作成
      if (title && body) {
        // createTodoエンドポイントを呼び出して新規ToDoを作成
        await createTodoMutation.mutateAsync({ title, body });

        // ToDo作成後、タイトルと本文をクリア
        setTitle("");
        setBody("");

        // アラートで新規登録を通知
        alert("新規登録しました");
      }
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  };

  // ToDoを削除する処理
  const handleDeleteTodo = async (id: number) => {
    try {
      // deleteTodoエンドポイントを呼び出して指定したIDのToDoを削除
      await deleteTodoMutation.mutateAsync({ id });

      // アラートで削除を通知
      alert("削除しました");
    } catch (error) {
      // エラーハンドリング
      console.error(error);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Todo list</h1>
      <div>
        <ul className={styles.list}>
          {data.map((todo: Todo) => (
            <div key={todo.id}>
              <Link href={`todo/${todo.id}`}>
                <li className={styles.listItem}>{todo.title}</li>
              </Link>
              <button
                className={styles.button}
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              >
                削除
              </button>
            </div>
          ))}
        </ul>
        <div className={styles.createForm}>
          <p>新規作成</p>
          <div className={styles.inputField}>
            <label>タイトル</label>
            <div>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>
          </div>
          <div className={styles.inputField}>
            <label>本文</label>
            <div>
              <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setBody(e.target.value);
                }}
                value={body}
              />
            </div>
          </div>
          <button className={styles.button} onClick={handleCreateTodo}>
            登録
          </button>
        </div>
      </div>
    </>
  );
}
