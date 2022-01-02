const express = require('express');
const router = express.Router();
const settingsController = require('../../controller/admin/settings');
router.get('/',settingsController.index);


module.exports = router;