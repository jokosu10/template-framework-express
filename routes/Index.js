const express = require("express");
const router = express();

const indexRouter = require('../controllers/IndexController');

router.get('/test', indexRouter.index);
router.get('/jokosu10', indexRouter.joko);

module.exports = router;
