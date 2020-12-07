# Temiloluwa Assessment Submission

This project contains source code and supporting files for the serverless application that I created in the AWS Lambda console. You can check it out on Github here: https://github.com/tehmi2000/studentserverlessapp.

This project includes the following files and folders:

- public - Static web content and pages.
- configuration - Application and database configuration codes.
- routes - Route module used by express to serve endpoints.
- \_\_tests__ - Unit tests for application.
- app.js - Exports a serverless express app handler and the express app itself.
- server.js - Contains code for hosting the express app locally without serverless.

## About the application

The application is a express-serverless RESTful API that takes HTTP requests and invokes Lambda functions. The API has POST and GET methods on the `/student` path to create, list, update and delete student records. 

**To use the Student API**

1. Navigate to the **API Documentation Page** (https://j8etyxmihl.execute-api.us-east-1.amazonaws.com/production/docs) in your web browser.
1. Read instructions at the top of the page first.
1. Copy the URL that's listed on the **API Documentation Page**.
1. You can copy the Example Code on the webpage into your Javascript code directly. Alternatively, At the command line, use cURL (or Postman) to send POST requests to the application endpoint. For example:

        $ ENDPOINT=https://j8etyxmihl.execute-api.us-east-1.amazonaws.com/production/student
        $ curl -d '{"firstname":"John", "lastname":"Abbey"}' -H "Content-Type: application/json" -X POST $ENDPOINT/create
        {"firstname":"John","lastname":"Abbey"}
        $ curl -d '{"id":"Akeem", "name":"Anod"}' -H "Content-Type: application/json" -X POST $ENDPOINT/create
        {"id":"Akeem", "name":"Anod"}

1. Send a GET request to the endpoint to get a list of items.

        $ curl $ENDPOINT
        [{"firstname":"John", "lastname":"Abbey"},{"id":"Akeem", "name":"Anod"}]


To view a complete list of the application's API endpoint, navigate to the **API Documentation Page** ((https://j8etyxmihl.execute-api.us-east-1.amazonaws.com/production/docs))

## Unit tests

Requirements:

* Node.js - [Install Node.js 10](https://nodejs.org/en/), including the npm package management tool.

Tests are defined in the \_\_tests__ folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```
