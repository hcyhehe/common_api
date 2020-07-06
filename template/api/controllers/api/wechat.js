const moment = require('moment');
const request = require('request');
const rq = require('request-promise');
const sha1 = require('sha1');
const fs = require('fs');
const path = require('path');
const code = require('../../commons/code');
const conn = require('../../config/pool');
const setting = require('../../config/setting');
let appID = setting.appid;
let appsecret = setting.appsecret;



exports.getOpenid = async function (req, res, next) {
    try{
        //通过code换取网页授权openid
        let Code = req.query.code;
        console.log('Code', Code);
        let uri = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appID+'&secret='+appsecret+'&code='+Code+'&grant_type=authorization_code';
        let options = {
            method: 'GET',
            uri: uri,
            json: true
        }
        let data = await rq.get(options);
        console.log(data);

        //拉取用户信息
        let uri2 = 'https://api.weixin.qq.com/sns/userinfo?access_token='+data.access_token+'&openid='+data.openid+'&lang=zh_CN'
        let options2 = {
            method: 'GET',
            uri: uri2,
            json: true
        }
        let data2 = await rq.get(options2);
        res.send({"code": 2000000,"msg": code['2000000'], data: data2 });
    } catch(e) {
        console.log(e);
        res.send({"code": 5000000,"msg": code['5000000'], data: {} });
    }
}


/*
1、服务器ip在公众号的ip白名单里面
2、access_token要存储起来，过期再重新获取（调取接口，最大2000次，频繁获取会导致接口被禁止）
*/
exports.getShare = async function (req, res, next) {
    try{
        let filepath = path.resolve(__dirname, '../../') + '/access_token.json'
        let token = fs.readFileSync(filepath, 'utf-8')
        console.log('token', token)
        let tokenJson = JSON.parse(token)
        let now = Date.parse(new Date())/1000
        let validTime = tokenJson.valid_time
        
        let noncestr = '123123'
        let appid = setting.appid
        let appsecret = setting.appsecret
        let timestamp = Date.parse(new Date())/1000
        let url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+appsecret;
        let page = decodeURIComponent(req.query.pageUrl);
        console.log('url', url, 'page', page);
        
        let data
        if(Number(validTime) > Number(now)){
            console.log('validTime：'+validTime, 'now：'+now, 'access_token未过期');
            data = tokenJson;
        } else {
            console.log('access_token已过期，将重新获取');
            let res1 = await rq.get(url);
            data = JSON.parse(res1);
            if(data.access_token){
                let obj = {};
                obj.access_token = data.access_token;
                obj.valid_time = Number(now) + Number(data.expires_in) - 60;
                fs.writeFileSync(filepath, JSON.stringify(obj)); 
            }
        }
        console.log('data', data)
        
        let res2 = await rq.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+data.access_token+'&type=jsapi');
        let ticket = JSON.parse(res2).ticket; 
        console.log('ticket', ticket);
        let string = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + page;
        let signature=sha1(string); //获得签名
        //console.log('signature:', signature);
        let json = {
            signature: signature,
            nonceStr: noncestr,
            timestamp: timestamp
        }
        console.log(json);
        res.send(json);
    } catch(e) {
        console.log(e);
    }
}

