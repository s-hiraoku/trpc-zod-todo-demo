import { Todo } from "../../server/types/todo";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

export default function Page() {
  const { data } = trpc.todo.getTodos.useQuery();

  return (
    <div>
      <ul>
        {data &&
          data.map((todo: Todo) => (
            <div key={todo.id}>
              <Link href={`todo/${todo.id}`}>
                <li>{todo.title}</li>
              </Link>
            </div>
          ))}
      </ul>
    </div>
  );
}
