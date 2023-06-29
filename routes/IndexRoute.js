const express = require("express");
const router = express();
const IndexRouter = require('../controllers/IndexController');
const { jwtAuthMiddleware } = require('../services/Passport');

router.get('/api/test', IndexRouter.index);
router.get('/api/jokosu10', jwtAuthMiddleware(), IndexRouter.joko);

module.exports = router;
