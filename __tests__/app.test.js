const request = require('supertest');
const app = require('../servers/Index');

describe('Test /', () => {

    test('should return 200', async (done) => {
        const response = await request(app).get('/api/test');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Hello World!');
        done();
    });

    test('should return test api', async (done) => {
        const response = await request(app).get('/api/jokosu10');
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('message');
        expect({
            message: "Joko Susilo Ganteng"
        }).toMatchObject({
            message: "Joko Susilo Ganteng"
        });
        done();
    });
});