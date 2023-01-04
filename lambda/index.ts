import { AppSyncResolverEvent } from "aws-lambda";

import { getTodos } from "./getTodos";
import { addTodo } from "./addTodo";
import { updateTodo } from "./updateTodo";
import { deleteTodo } from "./deleteTodo";
import { getTodoById } from "./getTodoById";

export interface Todo {
  [key: string]: string | boolean;

  id: string;
  title: string;
  completed: boolean;
}

interface AppSyncEvent  {
  info: {
    fieldName: string;
  };
  arguments: {
    id: string;
    todo: Todo;
  };
};

export async function handler(event: AppSyncEvent) {
  console.log(event);

  switch (event.info.fieldName) {
    case "getTodos":
      return getTodos();
    case "getTodoById":
      return getTodoById(event.arguments.id);
    case "addTodo":
      return addTodo(event.arguments.todo);
    case "deleteTodo":
      return deleteTodo(event.arguments.id);
    case "updateTodo":
      return updateTodo(event.arguments.todo);
    default:
      return null;
  }
}
