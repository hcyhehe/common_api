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

    let addParams = '';  //新增接收的参数，如req.body.xxx
    let addIsNotNull = '';  //新增的非空判断
    let addIsNotNullItem = '';  //新增的非空判断子项
    let addInsertName = '(';  //新增sql语句name项
    let addInsertValue = 'values(';  //新增sql语句value项

    let isMkey;  //查询/删除/更新的时候需要的主键id
    let isMkeyType;  //主键id类型：1 number，2 string
    let infoSql;  //查询info的sql
    let delSql;  //del的sql

    let editParams = '';  //编辑接收的参数，如req.body.xxx
    let editIsNotNull = '';  //编辑的非空判断
    let editIsNotNullItem = '';  //编辑的非空判断子项
    let upSql = `\` update ${tableName} set `;  //更新的sql

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

        //add
        if(detail[i].ft_type != 5 && detail[i].ft_type != 9 && detail[i].is_mkey != 2){  //非表单时间记录字段和主键不要
            addParams += `
                let ${name} = req.body.${name};`;
        } 
        //1.input输入框 2.select选择框 3.textarea文本框 4.富文本框 5.图片上传 
        //6.日期 7.时间 8.日期时间 9.非表单时间记录 10.其他
        if(detail[i].ft_type == 5){  //图片上传
            addParams += `
                let ${name};
                if(Array.isArray(${name})){
                    ${name} = req.body.${name}.join(',');
                } else {
                    ${name} = req.body.${name};
                }`;
        }
        if(detail[i].ft_type == 9){  //非表单时间记录字段，直接赋予当前时间
            addParams += `
                let ${name} = now;`;
        }
        if(detail[i].is_null == 1 && detail[i].is_mkey != 2){  //非空检查
            addIsNotNullItem += ` !${name} ||`;
        }
        if(detail[i].is_mkey != 2){
            addInsertName += ` ${name},`;
        }
        if(detail[i].is_mkey != 2 && (detail[i].type == 'varchar' || detail[i].type == 'text' || detail[i].type == 'datetime')){
            addInsertValue += ` '\${${name}}',`;
        }
        if(detail[i].is_mkey != 2 && (detail[i].type == 'int' || detail[i].type == 'smallint' || detail[i].type == 'decimal')){
            addInsertValue += ` \${${name}},`;
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

        //edit
        if(detail[i].ft_type != 5 && detail[i].ft_type != 9){  //非表单时间记录字段不要
            editParams += `
                let ${name} = req.body.${name};`;
        }
        //1.input输入框 2.select选择框 3.textarea文本框 4.富文本框 5.图片上传 
        //6.日期 7.时间 8.日期时间 9.非表单时间记录 10.其他
        if(detail[i].ft_type == 5){  //图片上传
            editParams += `
                let ${name};
                if(Array.isArray(${name})){
                    ${name} = req.body.${name}.join(',');
                } else {
                    ${name} = req.body.${name};
                }`;
        }
        if(detail[i].is_null == 1){  //非空检查
            editIsNotNullItem += ` !${name} ||`;
        }
        if(detail[i].is_mkey != 2 && detail[i].ft_type < 9){  //拼接更新sql
            if(detail[i].type == 'int' || detail[i].type == 'smallint' || detail[i].type == 'decimal'){
                upSql += `${name} = \${${name}}, `;
            } else {
                upSql += `${name} = '\${${name}}', `;
            }
        }
        
    }

    //add
    addIsNotNullItem = addIsNotNullItem.substring(0, addIsNotNullItem.length-2);
    addIsNotNull = `
                if(${addIsNotNullItem}){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
    `;
    addInsertName = addInsertName.substring(0, addInsertName.length-1) + ' )';
    addInsertValue = addInsertValue.substring(0, addInsertValue.length-1) + ' )';

    //edit
    editIsNotNullItem = editIsNotNullItem.substring(0, editIsNotNullItem.length-2);
    editIsNotNull = `
                if(${editIsNotNullItem}){
                    return res.send({"code": 4000000, "msg": code[4000000] });
                }
    `;
    upSql = upSql.substring(0, upSql.length-2);
    if(isMkeyType==1) upSql = upSql + ` 
                where ${isMkey} = \${${isMkey}} \``;
    if(isMkeyType==2) upSql = upSql + ` 
                where ${isMkey} = '\${${isMkey}}' \``;

    // console.log('seachName:', seachName);
    // console.log('seachItem:', seachItem);
    // console.log('addParams:', addParams);
    // console.log('addIsNotNull:', addIsNotNull);
    // console.log('addInsertName:', addInsertName);
    // console.log('addInsertValue:', addInsertValue);
    // console.log('editParams:', editParams);
    // console.log('editIsNotNull:', editIsNotNull);
    // console.log('upSql:', upSql);

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
        
        
        exports.add = async function (req, res, next) {
            try{
                let now = moment().format('YYYY-MM-DD HH:mm:ss');
                ${addParams}
                ${addIsNotNull}
                let sql = \` insert into ${tableName} ${addInsertName} 
                            ${addInsertValue} \`;
                await conn.query(sql);
        
                res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
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
        
        
        exports.edit = async function (req, res, next) {
            try{
                ${editParams}
                ${editIsNotNull}
                let sql = ${upSql};
                await conn.query(sql);
        
                res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
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