const moment = require('moment');
const crypto = require('crypto');
const code = require('../../commons/code');
const conn = require('../../config/pool');


exports.login = async function (req, res, next) {
    try{
        let username = req.body.username;
        let password = req.body.password;
        if(!username || !password){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        
        let sql = ` select id, username, role, last_login_ip from admin 
                    where username = '${username}' and password = '${password}' `;
        let raw = await conn.query(sql);
        if(raw[0].length == 0){
            return res.send({"code": 4000002, "msg": code[4000002] });
        } 

        let id = raw[0][0].id;
        let data = raw[0][0];

        //插入最后登录时间，ip
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
        if(ip == '::1') ip = '127.0.0.1';
        let sql2 = ` update admin set last_login_time = '${now}', last_login_ip = '${ip}' where id = ${id} `; 
        await conn.query(sql2);
        
        if(data.role == 0){data.role = ['visitor'];data.token = 'visitor';}
        if(data.role == 1){data.role = ['editor'];data.token = 'editor';}
        if(data.role == 2){data.role = ['admin'];data.token = 'admin';}

        res.send({ "code": 2000000, "msg": code['2000000'], data:data });
    } catch(e) {
        console.log(e);
        res.send({"code": 5000000,"msg": code['5000000'] });
    }
}


exports.list = async function (req, res, next) {
    try{
        let pages = parseInt(req.query.pages);
        let limit = parseInt(req.query.limit);
        let skip = parseInt(pages - 1) * limit;
        if(!pages || !limit){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let username = req.query.username;

        let sql = ` select * from admin where 1=1 `;
        let sql2 = ` select count(*) as count from admin where 1=1 `;

        if(username){
            sql += ` and username like "%${username}%"`;
            sql2 += ` and username like "%${username}%"`;
        } 

        sql += ` order by id asc limit ${skip}, ${limit}`;
        
        let list = await conn.query(sql);
        let countRaw = await conn.query(sql2);
        let count = countRaw[0][0].count;

        for(let i=0;i<list[0].length;i++){
            list[0][i].create_time = moment(list[0][i].create_time).format('YYYY-MM-DD HH:mm');
            list[0][i].last_login_time = moment(list[0][i].last_login_time).format('YYYY-MM-DD HH:mm');
        }
        res.send({ "code": 2000000, "msg": code['2000000'], pages:pages, limit:limit, count:count, data:list[0] });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], pages:pages, limit:limit, count:0, data:[] });
    }
}


exports.add = async function (req, res, next) {
    try{
        let username = req.body.username;
        let password = req.body.password;
        if(!username || !password){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let md5 = crypto.createHash("md5");
        md5.update(password);
        let md5pass = md5.digest('hex');
        let now = moment().format('YYYY-MM-DD HH:mm:ss');

        let sql0 = ` select * from admin where username = '${username}' `;
        let [raw0] = await conn.query(sql0);
        if(raw0.length>0){
            return res.send({"code": 4000007, "msg": code[4000007] });
        }

        let sql = ` insert into admin (username, password, role, create_time)
                    values('${username}', '${md5pass}', 1, '${now}') `;
        await conn.query(sql);
        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}


exports.modify = async function (req, res, next) {
    try{
        let id = req.body.id;
        let username = req.body.username;
        let password = req.body.password;
        if(!id){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let md5 = crypto.createHash("md5");
        md5.update(password);
        let md5pass = md5.digest('hex');

        let sql0 = ` select * from admin where id = '${id}' `;
        let [[raw0]] = await conn.query(sql0);
        //只考虑传入的用户名跟之前不一样的情况
        if(raw0.username != username){
            let sql1 = ` select * from admin where username = '${username}' `;
            let [raw1] = await conn.query(sql1);
            if(raw1.length>0){
                return res.send({"code": 4000007, "msg": code[4000007] });
            }
        }
        
        let sql;
        if(password){
            sql = ` update admin set username = '${username}', password = '${md5pass}' where id = ${id} `;
        } else {
            sql = ` update admin set username = '${username}' where id = ${id} `;
        }
        await conn.query(sql);
        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}


exports.remove = async function (req, res, next) {
    try{
        let id = req.body.id;
        if(!id){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let sql = ` delete from admin where id = ${id} `;
        await conn.query(sql);
        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}

