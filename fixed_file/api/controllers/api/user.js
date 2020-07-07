const moment = require('moment');
const code = require('../../commons/code');
const tool = require('../../commons/tool');
const conn = require('../../config/pool');
const setting = require('../../config/setting');
const Core = require('@alicloud/pop-core');


exports.register = async function (req, res, next){
    try{
        const openid = req.body.openid;
        const parentId = req.body.parentId || '';
        const avatar = req.body.headimgurl;
        const gender = req.body.sex;
        const nickname = tool.filteremoji2(req.body.nickname);  //过滤表情符
        console.log('nickname', nickname);
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const sql = ` select * from user where openid = '${openid}' `;
        const [raw] = await conn.query(sql);
        
        let sql2;
        if(raw.length==0){
            if(openid != parentId){  //防止上级就是自己
                sql2 = ` insert into user (openid, avatar, gender, nickname, parent_id, create_time)
                         values('${openid}', '${avatar}', ${gender}, '${nickname}', '${parentId}', '${now}') `;
                //新用户加入team
                if(parentId){
                    let sql3 = ` insert into team(parent_id, openid, join_time) 
                                 values('${parentId}', '${openid}', '${now}') `;
                    await conn.query(sql3);
                }
            } else {
                sql2 = ` insert into user (openid, avatar, gender, nickname, create_time)
                         values('${openid}', '${avatar}', ${gender}, '${nickname}', '${now}') `;
            }
        } else {
            sql2 = ` update user set avatar = '${avatar}', gender = ${gender}, nickname = '${nickname}' 
                     where openid = '${openid}' `;
        }
        await conn.query(sql2);

        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}


exports.updatePhone = async function (req, res, next){
    try{
        let openid = req.body.openid;
        let username = req.body.username;
        let phone = req.body.phone;
        if(!openid || !username || !phone){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let sql = ` update user set username = '${username}', phone = '${phone}' 
                    where openid = '${openid}' `;
        console.log(sql);
        await conn.query(sql);
        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}


exports.getInfo = async function (req, res, next){
    try{
        let openid = req.query.openid;
        if(!openid){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        
        let sql = ` select * from user where openid = '${openid}' `;
        let [[raw]] = await conn.query(sql);
        if(raw.phone){
            raw.privacy_phone = raw.phone.substring(0,3) + '****' + raw.phone.substring(raw.phone.length-4, raw.phone.length);
        }

        res.send({ "code": 2000000, "msg": code['2000000'], data:raw });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}


