import { AppSyncResolverEvent } from "aws-lambda";

import { getTodos } from "./getTodos";
import { addTodo } from "./addTodo";
import { updateTodo } from "./updateTodo";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export async function handler(event: AppSyncResolverEvent<any>) {
  console.log(event); 

  switch (event.info.fieldName) {
    case "getTodos":
      return getTodos();
    case "addTodo":
      return addTodo(event.arguments.todo);
    case "updateTodo":
      return updateTodo(event.arguments);
    default:
      return null;
  }
}