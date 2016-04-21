var router = require('express').Router();

router.use('/tiles', require('./tiles'));

module.exports = router;