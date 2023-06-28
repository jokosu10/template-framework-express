const request = require('supertest');
const app = require("../servers/Index");
const jwt = require('jsonwebtoken');
require("dotenv").config();

describe('POST /login', () => {
	it('should respond with a JWT on successful login', async () => {

		const email = "jokosu10@opensuse.org";
		const password = "1234567890";

		try {
			const response = await request(app)
				.post('/api/login')
				.set("Accept", "application/json")
				.send({ email: email, password: password })
				.expect(200);

			expect(response.status).toBe(200);

			expect(response.body).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String),
				results: expect.objectContaining({
					token: expect.any(String),
				}),
			});

			// Test that the status is 'success'
			expect(response.body.status).toBe('success');

			// Test that the code is 200
			expect(response.body.code).toBe(200);

			// Test that the message is 'message from backend'
			expect(response.body.message).toBe('message from backend');

			// you can also decode the token and expect certain values
			const decoded = jwt.verify(response.body.results.token, process.env.TOKEN_KEY);

			expect(decoded).toHaveProperty('user_id');
			expect(decoded).toHaveProperty('iat');
			expect(decoded).toHaveProperty('exp');
		} catch (error) {
			expect(error).toBe(error);
		}
	});
});