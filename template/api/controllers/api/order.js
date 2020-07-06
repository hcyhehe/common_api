const moment = require('moment');
const uuid = require('node-uuid');
const code = require('../../commons/code');
const tool = require('../../commons/tool');
const conn = require('../../config/pool');
const setting = require('../../config/setting');


exports.list = async function (req, res, next) {
    try{
        let pages = parseInt(req.query.pages);
        let limit = parseInt(req.query.limit);
        let skip = parseInt(pages - 1) * limit;
        if(!pages || !limit){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let status = req.query.status;
        let openid = req.query.openid;

        let sql = ` select * from orders where is_deleted = 1 `;
        let sql2 = ` select count(*) as count from orders where is_deleted = 1 `;

        if(status && String(status)!=0){
            sql += ` and status = ${status} `;
            sql2 += ` and status = ${status} `;
        } 
        if(openid){
            sql += ` and openid = '${openid}' `;
            sql2 += ` and openid = '${openid}' `;
        } 

        sql += ` order by create_time desc limit ${skip}, ${limit} `;
        //console.log(sql);
        let [list] = await conn.query(sql);
        let countRaw = await conn.query(sql2);
        let count = countRaw[0][0].count;

        for(let i=0;i<list.length;i++){
            if(list[i].create_time){
                list[i].create_time = moment(list[i].create_time).format('YYYY-MM-DD HH:mm');
            }
        }

        res.send({ "code": 2000000, "msg": code['2000000'], pages:pages, limit:limit, count:count, data:list });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], pages:pages, limit:limit, count:0, data:[] });
    }
}


exports.getInfo = async function (req, res, next){
    try{
        let order_id = req.query.order_id;
        let sql = ` select * from orders where order_id = '${order_id}' `;
        let [[raw]] = await conn.query(sql);
        
        if(raw.create_time) raw.create_time = moment(raw.create_time).format('YYYY-MM-DD HH:mm');

        res.send({ "code": 2000000, "msg": code['2000000'], data:raw });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}

