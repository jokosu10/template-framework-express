const express = require("express");
const router = express();
const CategoryRouter = require('../controllers/CategoryController');

router.get('/api/category', CategoryRouter.getAllCategory);

module.exports = router;
