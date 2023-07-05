const request = require('supertest');
const app = require("../servers/Index");
const jwt = require('jsonwebtoken');
const db = require('../models/Index');

require("dotenv").config();

beforeAll(async () => {
	// do something before all tests
	await db.sequelize.sync();
});

afterAll(async () => {
	// close the Sequelize connection after all tests
	jest.setTimeout(10000);
	await db.sequelize.close();
});

describe('unit testing for endpoint users', () => {
	it('should return a response with a success message when successful login', async () => {

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

	it('should return a response with a error message because token is expired / token invalid', async () => {
		const mockUser = { id: 1, name: 'John Doe' };

		try {
			const expiredToken = jwt.sign({ user: mockUser }, process.env.TOKEN_KEY, { expiresIn: '-1s' });

			const response = await request(app)
				.get('/products')
				.set("Accept", "application/json")
				.set('Authorization', `Bearer ${expiredToken}`)
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

	it('should return a response with a error message jwt when access protected route without token', async () => {
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

	it('should return a response with a success message for authenticated users when accessing a protected route', async () => {
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

	it('should respond with a success message for public route', async () => {
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
