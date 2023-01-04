import { Todo } from "../";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

export async function addTodo(todo: Todo): Promise<Todo> {
  const params = {
    TableName: process.env.TODOS_TABLE,
    Item: todo,
  };

  try {
    await docClient.put(params).promise();
    return todo;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return Promise.reject(error);
  }
}
