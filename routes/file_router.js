const express = require('express');
const router = express.Router();
const upload = require('../commons/upload');

//file
router.get('/upload/*', upload.public);  //公共访问文件路径

//xlsx
router.get('/public/*', upload.downLoad);  //xlsx下载

module.exports = router;
