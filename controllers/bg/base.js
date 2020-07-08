const moment = require('moment');
const code = require('../../commons/code');
const conn = require('../../config/pool');


exports.edit = async function (req, res, next) {
    try{
        let project_name = req.body.project_name;
        let port = req.body.port;
        let bg_remark = req.body.bg_remark;
        let ft_remark = req.body.ft_remark;
        let akey = req.body.akey;
        let hkey = req.body.hkey;
        let db_name = req.body.db_name;
        let db_user = req.body.db_user;
        let db_pass = req.body.db_pass;
        
        let sql = ` select * from base limit 1 `;
        let [raw] = await conn.query(sql);
        
        let sql2;
        if(raw.length==0){
            sql2 = ` insert into base(project_name, port, bg_remark, ft_remark, akey, hkey, db_name, db_user, db_pass)
                     values('${project_name}', '${port}', '${bg_remark}', '${ft_remark}', '${akey}', '${hkey}', '${db_name}',
                     '${db_user}', '${db_pass}') `;
        } else {
            sql2 = ` update base set project_name = '${project_name}', port = '${port}', bg_remark = '${bg_remark}', 
                     ft_remark = '${ft_remark}', akey = '${akey}', hkey = '${hkey}', db_name = '${db_name}',
                     db_user = '${db_user}', db_pass = '${db_pass}' `;
        }
        await conn.query(sql2);

        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}


exports.info = async function (req, res, next) {
    try{
        let sql = ` select * from base limit 1 `;
        let [[raw]] = await conn.query(sql);
        res.send({ "code": 2000000, "msg": code['2000000'], data:raw });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}
