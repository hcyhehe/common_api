const appJs = require('./app.js');
const readme = require('./readme.js');
const package = require('./package.js');
const setting = require('./setting.js');
const curd = require('./curd.js');
const curd2 = require('./curd2.js');  //订单类
const curd3 = require('./curd3.js');  //基础信息类
const bgRouter = require('./bg_router.js');
const sql = require('./sql.js');

module.exports = {
    appJs,
    readme,
    package,
    setting,
    curd,
    curd2,
    curd3,
    bgRouter,
    sql
}
