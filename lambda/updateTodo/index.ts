import { Todo } from "../";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

interface IParams {
  TableName: string | undefined;
  Key:  string | object;
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const params: IParams = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      id: todo.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "ALL_NEW",
  };

  let prefix = "set ";
  let attributes  = Object.keys(todo);

  for (let attribute of attributes)  {
    if (attribute !== "id") {
      //   UpdateExpression: 'set #title = :title, #done = :done',
      params["UpdateExpression"] += `${prefix}#${attribute} = :${attribute}`;
       //   ExpressionAttributeNames: { '#title': 'title', '#done': 'done' },
      params["ExpressionAttributeNames"][`#${attribute}`] = attribute;
      //   ExpressionAttributeValues: { ':title': '2nd todo', ':done': true },
      params["ExpressionAttributeValues"][`:${attribute}`] = todo[attribute];
       
      prefix = ", ";
    }
  }

  try {
    const {Attributes: todo} = await docClient.update(params).promise();
    return todo;
  } catch (error) {
    console.error("DynamoDB error: ", error);
    return Promise.reject(error);
  }
}
