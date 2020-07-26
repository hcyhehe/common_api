//基础信息类
const tool = require('../../commons/tool');

exports.content = function (obj) {
    let tableName = obj.name;
    let detail = obj.detail;

    let addInsertName = '(';  //新增sql语句name项
    let addInsertValue = 'values(';  //新增sql语句value项

    let editParams = '';  //编辑接收的参数，如req.body.xxx
    let upSql = `\` update ${tableName} set `;  //更新的sql

    for(let i=0;i<detail.length;i++){
        let name = detail[i].name;

        //add
        if(detail[i].is_mkey != 2){
          addInsertName += ` ${name},`;
        }
        if(detail[i].is_mkey != 2 && (detail[i].type == 'varchar' || detail[i].type == 'text' || detail[i].type == 'datetime')){
            addInsertValue += ` '\${${name}}',`;
        }
        if(detail[i].is_mkey != 2 && (detail[i].type == 'int' || detail[i].type == 'smallint' || detail[i].type == 'decimal')){
            addInsertValue += ` \${${name}},`;
        }

        //edit
        if(detail[i].is_mkey == 1 && detail[i].ft_type != 5 && detail[i].ft_type != 9){  //非表单时间记录字段不要
            editParams += `
                let ${name} = req.body.${name};`;
        }
        //1.input输入框 2.select选择框 3.textarea文本框 4.富文本框 5.图片上传 
        //6.日期 7.时间 8.日期时间 9.非表单时间记录 10.其他
        if(detail[i].ft_type == 5){  //图片上传
            editParams += `
                let ${name} = req.body.${name}.join(',');`;
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
    addInsertName = addInsertName.substring(0, addInsertName.length-1) + ' )';
    addInsertValue = addInsertValue.substring(0, addInsertValue.length-1) + ' )';

    //edit
    upSql = upSql.substring(0, upSql.length-2);
    upSql += ' `';


    const str = `
        const moment = require('moment');
        const code = require('../../commons/code');
        const conn = require('../../config/pool');
        
        
        exports.info = async function (req, res, next) {
            try{
                let sql = \` select * from ${tableName} limit 1 \`;
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
                let sql = \` select * from ${tableName} limit 1 \`;
                let [[raw]] = await conn.query(sql);

                let sql2;
                if(!raw){
                  sql2 = \` insert into ${tableName} ${addInsertName} 
                           ${addInsertValue} \`;
                } else {
                  sql2 = ${upSql};
                }
                await conn.query(sql2);
                res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
            } catch(e) {
                console.log(e);
                res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
            }
        }
    `;

    return tool.beautyFile(str);
}
