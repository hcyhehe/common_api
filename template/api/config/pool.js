const mysql = require('mysql2/promise'); 
const config = require('./setting.js');
const { convertSql } = require('../commons/tool');

const Pool = mysql.createPool(config.mysql);

exports.query = async function (sql) {
    try{
        sql = convertSql(sql);
        //console.log(sql);
        let res = await Pool.query(sql);
        return res;
    } catch(e) {
        console.log(e);
    }
}