# Codeweavers Assessment Project

This project contains source code and supporting files for the serverless application that I created in the AWS Lambda console. You can check it out on Github here: https://github.com/tehmi2000.

This project includes the following files and folders:

- public - Static web pages.
- configuration - Code for the application and database configuration.
- routes - Route module used by express serve endpoints.
- \_\_tests__ - Unit tests for the application code.
- template.yml - A SAM template that defines the application's AWS resources.

## Try the application out

The application creates a RESTful API that takes HTTP requests and invokes Lambda functions. The API has POST and GET methods on the root path to create, list, update and delete student records. It has a GET method that takes an ID path parameter to retrieve items. Each method maps to one of the application's three Lambda functions.

**To use the Student API**

1. Choose your application from the [**Applications page**](https://console.aws.amazon.com/lambda/home#/applications) in the Lambda console. (Make sure you're in the right region)
1. Copy the URL that's listed under **API endpoint**.
1. At the command line, use cURL to send POST requests to the application endpoint.

        $ ENDPOINT=<paste-your-endpoint-here>
        $ curl -d '{"id":"1234ABCD", "name":"My item"}' -H "Content-Type: application/json" -X POST $ENDPOINT
        {"id":"1234ABCD","name":"My item"}
        $ curl -d '{"id":"2234ABCD", "name":"My other item"}' -H "Content-Type: application/json" -X POST $ENDPOINT
        {"id":"2234ABCD","name":"My other item"}

1. Send a GET request to the endpoint to get a list of items.

        $ curl $ENDPOINT
        [{"id":"1234ABCD","name":"My item"},{"id":"2234ABCD","name":"My other item"}]

1. Send a GET request with the item ID to get a single item.

        $ curl $ENDPOINT/1234ABCD
        {"id":"1234ABCD","name":"My item"}

To view the application's API, functions, and table, use the links in the **Resources** section of the application overview in the Lambda console.

## Add a resource to your application

The application template uses the AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources, such as functions, triggers, and APIs. For resources that aren't included in the [AWS SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use the standard [AWS CloudFormation resource types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

Update `template.yml` to add a dead-letter queue to your application. In the **Resources** section, add a resource named **MyQueue** with the type **AWS::SQS::Queue**.

```
Resources:
  MyQueue:
    Type: AWS::SQS::Queue
```

The dead-letter queue is a location for Lambda to send events that could not be processed. It's only used if you invoke your function asynchronously, but it's useful here to show how you can modify your application's resources and function configuration.

Commit the change and push.

```bash
my-application$ git commit -am "Add dead-letter queue."
my-application$ git push
```

**To see how the pipeline processes and deploys the change**

1. Open the [**Applications**](https://console.aws.amazon.com/lambda/home#/applications) page.
1. Choose your application.
1. Choose **Deployments**.

When the deployment completes, view the application resources on the **Overview** tab to see the new resource.

## Update the permissions boundary

The sample application applies a **permissions boundary** to its function's execution role. The permissions boundary limits the permissions that you can add to the function's role. Without the boundary, users with write access to the project repository could modify the project template to give the function permission to access resources and services outside of the scope of the sample application.

In order for the function to use the queue that you added in the previous step, you must extend the permissions boundary. The Lambda console detects resources that aren't in the permissions boundary and provides an updated policy that you can use to update it.

**To update the application's permissions boundary**

1. Open the [**Applications**](https://console.aws.amazon.com/lambda/home#/applications) page.
1. Choose your application.
1. Choose **Edit permissions boundary**.
1. Follow the instructions shown to update the boundary to allow access to the new queue.

## Update the function configuration

Now you can grant the function permission to access the queue and configure the dead-letter queue setting.

In the function's properties in `template.yml`, add the **DeadLetterQueue** configuration. Under Policies, add **SQSSendMessagePolicy**. **SQSSendMessagePolicy** is a [policy template](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html) that grants the function permission to send messages to a queue.

```
Resources:
  MyQueue:
    Type: AWS::SQS::Queue
  getAllItemsFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./
      Handler: src/handlers/get-all-items.getAllItemsHandler
      Runtime: nodejs10.x
      MemorySize: 128
      Timeout: 60
      DeadLetterQueue:
        Type: SQS
        TargetArn: !GetAtt MyQueue.Arn
      Policies:
        - SQSSendMessagePolicy:
            QueueName: !GetAtt MyQueue.QueueName
        - DynamoDBCrudPolicy:
            TableName: !Ref SampleTable
```

Commit and push the change. When the deployment completes, view the function in the console to see the updated configuration that specifies the dead-letter queue.

## Unit tests

Requirements:

* Node.js - [Install Node.js 10](https://nodejs.org/en/), including the npm package management tool.

Tests are defined in the \_\_tests__ folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```

## Resources

For an introduction to the AWS SAM specification, the AWS SAM CLI, and serverless application concepts, see the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

Next, you can use the AWS Serverless Application Repository to deploy ready-to-use apps that go beyond Hello World samples and learn how authors developed their applications. For more information, see the [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/) and the [AWS Serverless Application Repository Developer Guide](https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html).
