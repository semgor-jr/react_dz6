const { Router } = require('express');
const { loginHandler } = require('../auth/local');
const { logoutHandler } = require('../auth/jwt');

const router = Router();

router.post('/login', loginHandler);
router.post('/logout', logoutHandler);

module.exports = router;