const express = require('express');
const router = express.Router();
const check = require('../middlewares/check');
const wechat = require('../controllers/api/wechat');
const user = require('../controllers/api/user');
const order = require('../controllers/api/order');


router.get('/getOpenid', check.verifyH5, wechat.getOpenid);
router.get('/getShare', check.verifyH5, wechat.getShare);

router.post('/user/register', check.verifyH5, user.register);
router.post('/user/updatePhone', check.verifyH5, user.updatePhone);
router.get('/user/getInfo', check.verifyH5, user.getInfo);

router.get('/order/list', check.verifyH5, order.list);
router.get('/order/getInfo', check.verifyH5, order.getInfo);


module.exports = router;
