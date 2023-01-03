import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import path = require("path");

export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appsyncApi = new appsync.GraphqlApi(this, "Api", {
      name: "Serverless CDK AppSync API",
      schema: appsync.Schema.fromAsset(
        path.join(__dirname, "schema/schema.graphql")
      ),
    });

    const lambdaFnRestApi = new lambda.Function(
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
      lambdaFnRestApi
    );

    DataSource.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    DataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    DataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });
  }
}
