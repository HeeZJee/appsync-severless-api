import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import path = require("path");

export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appsyncApi = new appsync.GraphqlApi(this, "Api", {
      name: "Serverless CDK AppSync API",
      schema: appsync.Schema.fromAsset(
        path.join(__dirname, "../schema/schema.graphql")
      ),
    });

    const lambdaFnTodos = new lambda.Function(
      this,
      "ServerlessCDKApiFunction",
      {
        functionName: "ServerlessCDKApiFunction",
        runtime: lambda.Runtime.NODEJS_16_X,
        code: lambda.Code.fromAsset("lambda"),
        handler: "index.handler",
      }
    );

    const DataSource = appsyncApi.addLambdaDataSource(
      "lambdaDataSource",
      lambdaFnTodos
    );

    DataSource.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });
    DataSource.createResolver({
      typeName: "Query",
      fieldName: "getTodoById",
    });

    DataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    DataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    DataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });

    const todosTable = new dynamodb.Table(this, "Todos", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
 
    todosTable.grantFullAccess(lambdaFnTodos);
    lambdaFnTodos.addEnvironment("TODOS_TABLE", todosTable.tableName);
  }
}
