# Codeweavers Assessment Project

This project contains source code and supporting files for the serverless application that I created in the AWS Lambda console. You can check it out on Github here: https://github.com/tehmi2000.

This project includes the following files and folders:

- public - Static web pages.
- configuration - Code for the application and database configuration.
- routes - Route module used by express serve endpoints.
- tests - Unit tests for the application code.

## About the application

The application creates a RESTful API that takes HTTP requests and invokes Lambda functions. The API has POST and GET methods on the root path to create, list, update and delete student records. 

**To use the Student API**

1. Navigate to the API homepage (https://j8etyxmihl.execute-api.us-east-1.amazonaws.com/production/index.html) in your web browser.
1. Copy the URL that's listed on the **API Documentation Page**.
1. At the command line, use cURL (or Postman) to send POST requests to the application endpoint.

        $ ENDPOINT=https://j8etyxmihl.execute-api.us-east-1.amazonaws.com/production/student
        $ curl -d '{"firstname":"John", "lastname":"Abbey"}' -H "Content-Type: application/json" -X POST $ENDPOINT/create
        {"firstname":"John","lastname":"Abbey"}
        $ curl -d '{"id":"Akeem", "name":"Anod"}' -H "Content-Type: application/json" -X POST $ENDPOINT/create
        {"id":"Akeem", "name":"Anod"}

1. Send a GET request to the endpoint to get a list of items.

        $ curl $ENDPOINT
        [{"firstname":"John", "lastname":"Abbey"},{"id":"Akeem", "name":"Anod"}]


To view a complete list of the application's API endpoint, navigate to the API's Documentation ((https://j8etyxmihl.execute-api.us-east-1.amazonaws.com/production/documentation/index.html))

## Unit tests

Requirements:

* Node.js - [Install Node.js 10](https://nodejs.org/en/), including the npm package management tool.

Tests are defined in the tests__ folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```
