const moment = require('moment');
const code = require('../../commons/code');
const conn = require('../../config/pool');


exports.list = async function (req, res, next) {
    try{
        let pages = parseInt(req.query.pages);
        let limit = parseInt(req.query.limit);
        let skip = parseInt(pages - 1) * limit;
        if(!pages || !limit){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let username = req.query.username;
        let phone = req.query.phone;

        let sql = ` select * from user where 1=1 `;
        let sql2 = ` select count(*) as count from user where 1=1 `;

        if(username){
            sql += ` and username like "%${username}%" `;
            sql2 += ` and username like "%${username}%" `;
        } 
        if(phone){
            sql += ` and phone like "%${phone}%" `;
            sql2 += ` and phone like "%${phone}%" `;
        } 
        sql += ` order by create_time desc limit ${skip}, ${limit} `;
        //console.log(sql, sql2);
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
        res.send({ "code": 5000000, "msg": code['5000000'], data:[] });
    }
}

