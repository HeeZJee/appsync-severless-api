import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFnRestApi = new cdk.aws_lambda.Function(
      this,
      "ServerlessCDKApiFunction",
      {
        functionName: "ServerlessCDKApiFunction",
        runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
        code: cdk.aws_lambda.Code.fromAsset("lambda"),
        handler: "index.handler",
      }
    );

    const apiGateway = new cdk.aws_apigateway.LambdaRestApi(
      this,
      "ServerlessCDKApi",
      {
        handler: lambdaFnRestApi,
        proxy: false,
      }
    );

    const items = apiGateway.root.addResource("items");
    items.addMethod("GET");
    items.addMethod("POST");
  }
}
