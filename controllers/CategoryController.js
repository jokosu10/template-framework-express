const db = require('../models/Index');

const getAllCategory = async (req, res, next) => {
	try {
		const categoryData = await db.Category.findAll({ attributes: ['id', 'name', 'description'] });

		return res.status(200).json({
			status: "success",
			code: 200,
			message: "message from backend",
			results: {
				category: categoryData
			}
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message
		});
	}
}

module.exports = {
	getAllCategory
}
