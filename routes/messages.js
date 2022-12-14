/*
    path: /api/messages
*/
const { Router } = require('express');
const { getChat } = require('../controller/messages');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/:from', validateJWT, getChat);

module.exports = router;