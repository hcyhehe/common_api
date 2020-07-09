const tool = require('../../commons/tool');

exports.content = function (obj) {
    let tableName = obj.name;
    const str = `
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
                let name = req.query.name;
                
                let sql = ' select * from ${tableName} where 1 = 1 ';
                let sql2 = ' select count(*) as count from ${tableName} where 1 = 1 ';
        
                if(name){
                    sql += ' and name like "%'+name+'%" ';
                    sql2 += ' and name like "%'+name+'%" ';
                }
                sql += ' order by sort asc limit '+skip+','+limit;
                let [list] = await conn.query(sql);
                let countRaw = await conn.query(sql2);
                let count = countRaw[0][0].count;
                
                res.send({ "code": 2000000, "msg": code['2000000'], pages:pages, limit:limit, count:count, data:list });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:[] });
            }
        }
        
        
        exports.add = async function (req, res, next) {
            try{
                let shop_id = req.body.shop_id;
                let name = req.body.name;
                let imgs = req.body.imgs.join(',');
                let sku = req.body.sku;
                let detail = req.body.detail;
                let score = req.body.score;
                let ori_price = req.body.ori_price;
                let price = req.body.price;
                let discount = req.body.discount;
                let un_price = req.body.un_price;
                let fare = req.body.fare;
                let sort = req.body.sort;
                if(!shop_id || !name){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
                let now = moment().format('YYYY-MM-DD HH:mm:ss');
                let sql = ' insert into ${tableName}(shop_id, name, imgs, sku, detail, score, ori_price, price, discount, '+
                          ' un_price, fare, sort, create_time) '+
                          ' values('+shop_id+', \\''+name+'\\', \\''+imgs+'\\', \\''+sku+'\\', \\''+detail+'\\', '+score+
                          ', '+ori_price+', '+price+', '+discount+', '+un_price+', '+fare+', '+sort+', \\''+now+'\\') ';
                await conn.query(sql);
        
                res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
            }
        }
        
        
        exports.info = async function (req, res, next) {
            try{
                let id = req.query.id;
                if(!id){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
                let sql = ' select * from ${tableName} where id = '+id;
                let [[raw]] = await conn.query(sql);
                
                res.send({ "code": 2000000, "msg": code['2000000'], data:raw });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
            }
        }
        
        
        exports.edit = async function (req, res, next) {
            try{
                let id = req.body.id;
                let name = req.body.name;
                let imgs = req.body.imgs.join(',');
                let sku = req.body.sku;
                let detail = req.body.detail;
                let score = req.body.score;
                let ori_price = req.body.ori_price;
                let price = req.body.price;
                let discount = req.body.discount;
                let un_price = req.body.un_price;
                let fare = req.body.fare;
                let sort = req.body.sort;
                if(!id || !name){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
                let now = moment().format('YYYY-MM-DD HH:mm:ss');
                let sql = ' update ${tableName} set name = \\''+name+'\\', imgs = \\''+imgs+'\\', sku = \\''+sku+'\\', '+
                          ' detail = \\''+detail+'\\', '+
                          ' score = '+score+', ori_price = '+ori_price+', price = '+price+', discount = '+discount+', '+
                          ' un_price = '+un_price+', fare = '+fare+', sort = '+sort+
                          ' where id = '+id;
                await conn.query(sql);
        
                res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
            }
        }
        
        
        exports.del = async function (req, res, next) {
            try{
                let id = req.body.id;
                if(!id){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
                let sql = ' update ${tableName} set is_deleted = 2 where id = '+id;
                await conn.query(sql);
        
                res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
            }
        }
    `;

    return tool.beautyFile(str);
}