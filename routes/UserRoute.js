const express = require("express");
const router = express();

const UserRouter = require('../controllers/UserController');

router.post('/api/login', UserRouter.login);

module.exports = router;
