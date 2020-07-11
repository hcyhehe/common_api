const tool = require('../../commons/tool');

exports.content = function (obj) {
    let tableName = obj.name;
    let detail = obj.detail;

    let data = {
        is_search: [],
        add_params: [],
        edit_params: [],
    }
    for(let i=0;i<detail.length;i++){
        if(detail[i].is_mkey == 2){  //1) 获取主键
            data.is_mkey = detail[i].name;
        }
        if(detail[i].is_search == 2){  //2) 获取搜索项
            data.is_search.push(detail[i].name);
        }
        if(detail[i].is_sort == 2){  //3) 获取排序
            data.is_sort = `${detail[i].name} ${detail[i].up_down}`;
        }
        if(detail[i].is_mkey != 2){  //4) add params
            data.add_params.push(detail[i].name);
        }
        data.edit_params.push(detail[i].name);  //5) edit_params
    }
    console.log('data:', data);

    //生成搜索模板
    let seachName = '';
    let seachItem = '';
    for(let i=0;i<data.is_search.length;i++){
        let name = data.is_search[i];
        seachName += `
                let ${name} = req.query.${name};`;
        seachItem += `
                if(${name}){
                    sql += \` and ${name} like "%\${${name}}%" \`;
                    sql2 += \` and ${name} like "%\${${name}}%" \`;
                }
        `;
    }
    console.log('seachName:', seachName);
    console.log('seachItem:', seachItem);


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
                ${seachName}
                
                let sql = \` select * from ${tableName} where 1 = 1 \`;
                let sql2 = \` select count(*) as count from ${tableName} where 1 = 1 \`;
                ${seachItem}
                sql += \` order by ${data.is_sort} limit \${skip}, \${limit} \`;
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
                if(!shop_id || !name){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
                let now = moment().format('YYYY-MM-DD HH:mm:ss');
                let sql = \` insert into ${tableName} (shop_id, name, imgs, sku, create_time)
                            values(\${shop_id}, '\${name}', '\${imgs}', '\${sku}', '\${now}') \`;
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
                let sql = \` select * from ${tableName} where id = \${id} \`;
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
                if(!id || !name){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
                let now = moment().format('YYYY-MM-DD HH:mm:ss');
                let sql = \` update ${tableName} set name = '\${name}', imgs = '\${imgs}', sku = '\${sku}' 
                            where id = \${id} \`;
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
                let sql = \` delete from ${tableName} where id = \${id} \`;
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