const express = require('express');
const router = express.Router();
const upload = require('../commons/upload');
const check = require('../middlewares/check');
const admin = require('../controllers/bg/admin');
const user = require('../controllers/bg/user');


router.post('/upload', upload.upload);

router.post('/login', check.verifyClient, admin.login);

router.get('/admin/list', check.verifyClient, admin.list);
router.post('/admin/add', check.verifyClient, admin.add);
router.post('/admin/modify', check.verifyClient, admin.modify);
router.post('/admin/remove', check.verifyClient, admin.remove);

router.get('/user/list', check.verifyClient, user.list);


module.exports = router
