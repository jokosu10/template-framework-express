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

	it('should respond with a erorr message jwt when access protected route', async () => {
		try {
			// Make a GET request to the protected route without the token
			const response = await request(app)
				.get('/api/jokosu10')
				.set("Accept", "application/json")
				.expect(401);

			expect(response.status).toBe(401);

			expect(response.body).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String)
			});

		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should respond with a message for authenticated users', async () => {
		const mockUser = { id: 1, name: 'John Doe' };

		try {
			// Generate a test token
			const testToken = jwt.sign({ user: mockUser }, process.env.TOKEN_KEY, { expiresIn: '1h' });

			// Make a GET request to the route with the token
			const response = await request(app)
				.get('/api/jokosu10')
				.set("Accept", "application/json")
				.set('Authorization', `Bearer ${testToken}`)
				.expect(200);

			expect(response.status).toBe(200);

			expect(response.body).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String)
			});

		} catch (error) {
			expect(error).toBe(error);
		}
	});

	it('should respond with a message for public users', async () => {
		try {
			//  Make a GET request to the public route without token
			const response = await request(app)
				.get('/api/test')
				.set("Accept", "application/json")
				.expect(200);

			expect(response.status).toBe(200);

			expect(response.body).toMatchObject({
				status: expect.any(String),
				code: expect.any(Number),
				message: expect.any(String)
			});

		} catch (error) {
			expect(error).toBe(error);
		}
	});
});
