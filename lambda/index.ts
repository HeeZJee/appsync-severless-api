import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));

  if (event.httpMethod == "GET") {
    return {
      statusCode: 200,
      body: "You have successfully called the API",
    };
  }

  if (event.httpMethod == "POST") {
    return {
      statusCode: 200,
      body: JSON.stringify(event.body),
    };
  }

  return {
    statusCode: 500,
    body: "You have successfully called the API",
  };
}
