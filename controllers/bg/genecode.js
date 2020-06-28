const moment = require('moment');
const code = require('../../commons/code');
const conn = require('../../config/pool');


exports.add = async function (req, res, next) {
    try{
        let username = req.body.username;
        let password = req.body.password;
        if(!username || !password){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let now = moment().format('YYYY-MM-DD HH:mm:ss');

        let sql = `  `;
        let [raw] = await conn.query(sql0);
        
        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}