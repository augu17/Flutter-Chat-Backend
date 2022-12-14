/*
    Path: api/users
*/

const { Router } = require('express');
const { getUsers } = require('../controller/users');

const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

module.exports = router;