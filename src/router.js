const { Router } = require('express');
const pages = require('./pages');

const router = new Router();

router.get('/', pages.home);

module.exports = router;
