//订单类
const tool = require('../../commons/tool');

exports.content = function (obj) {
    let tableName = obj.name;
    let detail = obj.detail;

    let seachName = '';  //列表查询接收的参数名，如req.query.xxx
    let seachItem = '';  //sql里面的查询，如果前端有传过来，如if(xxx) sql += ...
    let isSort = '';  //列表排序方式
    let listWhere = '1 = 1';
    if(obj.is_deleted == 2){
        listWhere = 'is_deleted = 1';
    }

    let isMkey;  //查询/删除/更新的时候需要的主键id
    let isMkeyType;  //主键id类型：1 number，2 string
    let infoSql;  //查询info的sql
    let delSql;  //del的sql

    for(let i=0;i<detail.length;i++){
        let name = detail[i].name;

        //list
        if(detail[i].is_search == 2){  //收集搜索项
            seachName += `
                let ${name} = req.query.${name};`;
            seachItem += `
                if(${name}){
                    sql += \` and ${name} like "%\${${name}}%" \`;
                    sql2 += \` and ${name} like "%\${${name}}%" \`;
                }
            `;
        }
        if(detail[i].is_sort == 2){  //列表查询，获取排序方式
            isSort = `${name} ${detail[i].up_down}`;
        }

        

        //info & del
        if(detail[i].is_mkey == 2){
            isMkey = name;
        }
        if(detail[i].is_mkey == 2 && (detail[i].type == 'int' || detail[i].type == 'smallint' || detail[i].type == 'decimal')){
            isMkeyType = 1;
            infoSql = `\` select * from ${tableName} where ${isMkey} = \${${isMkey}} \``;
            if(obj.is_deleted == 2){  //假删除
                delSql = `\` update ${tableName} set is_deleted = 2 where ${isMkey} = \${${isMkey}} \``;
            } else {
                delSql = `\` delete from ${tableName} where ${isMkey} = \${${isMkey}} \``;
            }
        }
        if(detail[i].is_mkey == 2 && (detail[i].type == 'varchar' || detail[i].type == 'text' || detail[i].type == 'datetime')){
            isMkeyType = 2;
            infoSql = `\` select * from ${tableName} where ${isMkey} = '\${${isMkey}}' \``;
            if(obj.is_deleted == 2){  //假删除
                delSql = `\` update ${tableName} set is_deleted = 2 where ${isMkey} = '\${${isMkey}}' \``;
            } else {
                delSql = `\` delete from ${tableName} where ${isMkey} = '\${${isMkey}}' \``;
            }
        }

    }
    

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
                
                let sql = \` select * from ${tableName} where ${listWhere} \`;
                let sql2 = \` select count(*) as count from ${tableName} where ${listWhere} \`;
                ${seachItem}
                sql += \` order by ${isSort} limit \${skip}, \${limit} \`;
                let [list] = await conn.query(sql);
                let countRaw = await conn.query(sql2);
                let count = countRaw[0][0].count;
                
                res.send({ "code": 2000000, "msg": code['2000000'], pages:pages, limit:limit, count:count, data:list });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:[] });
            }
        }


        exports.info = async function (req, res, next) {
          try{
              let ${isMkey} = req.query.${isMkey};
              if(!${isMkey}){
                  return res.send({"code": 4000000, "msg": code[4000000] });
              }
              let sql = ${infoSql};
              let [[raw]] = await conn.query(sql);
              
              res.send({ "code": 2000000, "msg": code['2000000'], data:raw });
          } catch(e) {
              console.log(e);
              res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
          }
        }
        
        
        exports.del = async function (req, res, next) {
            try{
                let ${isMkey} = req.body.${isMkey};
                if(!${isMkey}){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
                let sql = ${delSql};
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
