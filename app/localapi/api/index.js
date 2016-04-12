var router = require('express').Router();

router.use('/tiles', require('./tiles'));
//router.use('/prefs', require('./userprefs'));

module.exports = router;