import { Todo } from "../";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

export async function getTodoById(id: string): Promise<Todo> {
  const params = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      id: id,
    },
  };

  try {
    const {Item} = await docClient.get(params).promise();
    return Item;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return Promise.reject(error);
  }
}
