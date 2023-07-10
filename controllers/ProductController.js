const db = require('../models/Index');

const getAllProduct = async (req, res, next) => {
	try {
		var products = await db.Product.findAll({
			attributes: ['id', 'name', 'description', 'price'],
			include: [
				{
					model: db.Category,
					as: 'category',
					attributes: ['id', 'name'],
				}
			]
		});

		return res.status(200).json({
			status: "success",
			code: 200,
			message: "message from backend",
			results: {
				products: products
			}
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message
		});
	}
}

module.exports = {
	getAllProduct
}
