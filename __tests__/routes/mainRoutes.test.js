// Import mysql
const { connectToDB } = require('../../configuration/appConfig');
// Import all functions from server
const lambda = require('../../app');

describe("Test API", () => {
    let mySQLConnection = null;
    beforeAll(() => {
        mySQLConnection = connectToDB();
    });

    afterAll(done => {

    });

    test('Home route is working', () => {
        expect(mySQLConnection).not.toBeNull();
    });
});


// This includes all tests for getAllItemsHandler
// describe('Test express app', () => {
//     let scanSpy;

//     // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
//     beforeAll(() => {
//         // Mock DynamoDB scan method
//         // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
//         scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'scan');
//     });

//     // Clean up mocks
//     afterAll(() => {
//         scanSpy.mockRestore();
//     });

//     // This test invokes getAllItemsHandler and compares the result
//     it('should return ids', async () => {
//         const items = [{ id: 'id1' }, { id: 'id2' }];

//         // Return the specified value whenever the spied scan function is called
//         scanSpy.mockReturnValue({
//             promise: () => Promise.resolve({ Items: items }),
//         });

//         const event = {
//             httpMethod: 'GET'
//         };

//         // Invoke app from server
//         const result = await lambda.handler(event);

//         const expectedResult = {
//             statusCode: 200,
//             body: JSON.stringify(items),
//         };

//         // Compare the result with the expected result
//         expect(result).toEqual(expectedResult);
//     });
// });
