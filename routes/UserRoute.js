const express = require("express");
const router = express();

const UserRouter = require('../controllers/UserController');

router.post('/login', UserRouter.login);

module.exports = router;