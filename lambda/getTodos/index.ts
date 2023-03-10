import { Todo } from "../";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

export async function getTodos(): Promise<Todo[]> {
  const params = {
    TableName: process.env.TODOS_TABLE,
  };

  try {
    const { Items: todos } = await docClient.scan(params).promise();
    return todos;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return Promise.reject(error);
  }
}
