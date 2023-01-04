import { Todo } from "../";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

export async function deleteTodo(id: string): Promise<string> {
  const params = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      id: id,
    },
  };

  try {
    await docClient.delete(params).promise();
    return id;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return Promise.reject(error);
  }
}
