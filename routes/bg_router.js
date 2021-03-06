const express = require('express');
const router = express.Router();
const upload = require('../commons/upload');
const check = require('../middlewares/check');
const admin = require('../controllers/bg/admin');
const user = require('../controllers/bg/user');
const genecode = require('../controllers/bg/genecode');
const base = require('../controllers/bg/base');
const product = require('../controllers/bg/product');


router.post('/upload', upload.upload);

router.post('/login', check.verifyClient, admin.login);

router.get('/admin/list', check.verifyClient, admin.list);
router.post('/admin/add', check.verifyClient, admin.add);
router.post('/admin/modify', check.verifyClient, admin.modify);
router.post('/admin/remove', check.verifyClient, admin.remove);

router.get('/user/list', check.verifyClient, user.list);

router.get('/genecode/list', check.verifyClient, genecode.list);
router.post('/genecode/add', check.verifyClient, genecode.add);
router.get('/genecode/info', check.verifyClient, genecode.info);
router.post('/genecode/edit', check.verifyClient, genecode.edit);
router.post('/genecode/del', check.verifyClient, genecode.del);

router.post('/base/edit', check.verifyClient, base.edit);
router.get('/base/info', check.verifyClient, base.info);

router.post('/product/project', check.verifyClient, product.project);


module.exports = router
