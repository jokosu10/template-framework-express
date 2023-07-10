const express = require("express");
const router = express();
const ProductRouter = require('../controllers/ProductController');
const { jwtAuthMiddleware } = require('../services/Passport');

router.get('/api/product', jwtAuthMiddleware(), ProductRouter.getAllProduct);

module.exports = router;
