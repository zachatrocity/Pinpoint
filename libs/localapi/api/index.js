var router = require('express').Router();

router.use('/tiles', require('./tiles'));
router.use('/point', require('./points'));

module.exports = router;