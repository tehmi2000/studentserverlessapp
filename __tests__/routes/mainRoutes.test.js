const request = require('supertest');
// Import mysql
const { connectToDB } = require('../../configuration/appConfig');
// Import all functions from server
const { app } = require('../../app');

describe("Test API Documentation Routes", () => {

    test('GET / is working', async () => {
        try {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('text/html; charset=UTF-8');
        } catch (error) {
            console.log(error);
        }
    });

    test('GET /docs is working', async () => {
        try {
            const response = await request(app).get('/docs');
            expect(response.statusCode).toBeGreaterThan(200);
            expect(response.statusCode).toBeLessThan(400);
            expect(response.headers['content-type']).toBe('text/html; charset=UTF-8');
        } catch (error) {
            console.log(error);
        }
    });
});


describe("Test Student API Endpoints", () => {
    let mySQLConnection = null;

    afterAll(done => {
        try{
            if (mySQLConnection !== null) mySQLConnection.close();
        }catch(error){
            console.log(error);
        }
    });

    test('MySQL client is available and working', () => {
        try {
            mySQLConnection = connectToDB(false);
        } catch (error) {
            console.error(error);
        }
        expect(mySQLConnection).not.toBeNull();
    });

    test('Get all student data', async () => {
        try {
            const response = await request(app).get('/student');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
        } catch (error) {
            console.log(error);
        }
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
