const express = require("express");
const router = express();
const passport = require('passport');

const IndexRouter = require('../controllers/IndexController');

router.get('/api/test', IndexRouter.index);
router.get('/api/jokosu10', passport.authenticate('jwt', { session: false }), IndexRouter.joko);

module.exports = router;