const request = require('supertest');
// Import all functions from server
const { app } = require('../../app');
const appRouter = app;

describe("Test Student API Endpoints", () => {
    let studentId = null;

    test('POST /student/create: create new record', async () => {
        const response = await request(appRouter).post(`/student/create`).send(
            {
                firstname: 'Testfirstname',
                lastname: 'Testlastname',
                phone: '+123905678234',
                email: 'testemail1234@somemail.com'
            }
        );
        
        studentId = response.body.createdId; 
        expect(response.statusCode).toBe(200);
        expect(response.body.createdId).not.toBeNull();
        expect(response.body.createdId).not.toBeUndefined();
    });

    test('GET /student: without optional limit parameter', async () => {
        const response = await request(appRouter).get(`/student`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    test('GET /student: with optional limit parameter', async () => {
        let limit = 2;
        const response = await request(appRouter).get(`/student?limit=${limit}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body.length).toBe(limit);
    });

    test('POST /student/update/:id: student record update', async () => {
        let recordId = studentId;
        let listOfRandomStudent = [
            {
                firstname: 'Miracle',
                lastname: 'Adams'
            }, {
                firstname: 'Cray',
                lastname: 'James'
            }
        ];

        let randIndex = Math.round(Math.random() * (listOfRandomStudent.length - 1));
        let selectedRecord = listOfRandomStudent[randIndex];
        console.log(randIndex);
        const response = await request(appRouter).post(`/student/update/${recordId}`).send(selectedRecord);
        expect(response.statusCode).toBe(200);
        expect(response.body.updatedId).toBe(recordId);
    });

    test('POST /student/delete/:id: Deletes a record', async () => {
        // studentId = 'tW5FH75ZthDT2nNkH';
        const response = await request(appRouter).delete(`/student/delete/${studentId}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.deletedId).not.toBeNull();
        expect(response.body.deletedId).not.toBeUndefined();
    });
});
