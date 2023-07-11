const { getAllCategory } = require('../controllers/CategoryController');

jest.mock('../models/Index', () => {
	const mockCategory = [
		{ id: "9febb2b3-cce4-4747-945c-f8d3d4620425", name: "test category 1", description: "desc test category 1" },
		{ id: "05e3fa81-82ff-4d23-a81f-170730fee6ea", name: "test category 2", description: "desc test category 2" },
		{ id: "e2c3bcbd-20dd-47f1-9e16-1e8deac64668", name: "test category 3", description: "desc test category 3" },
	];

	const findAll = jest.fn().mockResolvedValue(mockCategory);

	return {
		Category: {
			findAll,
		},
	};
});

describe('Unit test for category controller', () => {
	test('should return get all category', async () => {
		const req = {};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const next = jest.fn();

		await getAllCategory(req, res, next);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			status: expect.any(String),
			code: expect.any(Number),
			message: expect.any(String),
			results: expect.objectContaining({
				category: expect.arrayContaining([
					expect.objectContaining({
						name: expect.any(String),
						description: expect.any(String),
					}),
				]),
			}),
		});
		expect(next).not.toHaveBeenCalled();
	});
});
