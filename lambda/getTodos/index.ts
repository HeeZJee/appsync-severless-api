import { Todo } from "../";

export async function getTodos() {
  const todos: Todo[] = [
    { id: "1", title: "Todo 1", completed: false },
    { id: "2", title: "Todo 2", completed: true },
  ];
  return todos;
}