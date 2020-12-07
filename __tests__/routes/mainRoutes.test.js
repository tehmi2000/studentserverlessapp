const request = require('supertest');
// Import mysql
const { connectToDB } = require('../../configuration/appConfig');
// Import all functions from server
const { app } = require('../../app');

describe("Test Student API Endpoints", () => {
    let mySQLConnection = null;

    beforeAll(function () {
        mySQLConnection = connectToDB(false);
    });

    afterAll(done => {
        if (mySQLConnection !== null && mySQLConnection !== undefined) {
            mySqlConnection.end((err => {
                done(err);
            }));
        }
    });

    it('MySQL client is available and working', () => {
        expect(mySQLConnection).not.toBeNull();
    });

    it('POST /student/create: create new record', async () => {
        try {
            const response = await request(app).post(`/student/create`).send(
                {
                    firstname: 'Testfirstname',
                    lastname: 'Testlastname',
                    phone: '+123905678234',
                    email: 'testemail1234@somemail.com'
                }
            );
            expect(response.statusCode).toBe(200);
            expect(response.body.createdId).not.toBeNull();
            expect(response.body.createdId).not.toBeUndefined();
        } catch (error) {
            console.log(error);
        }
    });

    it('GET /student: without optional limit parameter', async () => {
        try {
            const response = await request(app).get(`/student`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
        } catch (error) {
            console.log(error);
        }
    });

    it('GET /student: with optional limit parameter', async () => {
        try {
            let limit = 2;
            const response = await request(app).get(`/student?limit=${limit}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
            expect(response.body.length).toBe(limit);
        } catch (error) {
            console.log(error);
        }
    });

    it('POST /student/update/:id: student record update', async () => {
        try {
            let recordId = 'tkoBttKtCSV5iREyk';
            let listOfRandomStudent = [
                {
                    firstname: 'Miracle',
                    lastname: 'Adams'
                }, {
                    firstname: 'Cray',
                    lastname: 'James'
                }
            ];

            let selectedRecord = listOfRandomStudent[Math.round(Math.random() * (listOfRandomStudent.length))];
            const response = await request(app).post(`/student/update/${recordId}`).send(selectedRecord);
            expect(response.statusCode).toBe(200);
            expect(response.body.updatedId).toBe(recordId);
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
