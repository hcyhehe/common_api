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

        let sql = ` select * from genecode where 1=1 `;
        let sql2 = ` select count(*) as count from genecode where 1=1 `;

        sql += ` order by sort asc limit ${skip}, ${limit}`;
        
        let [list] = await conn.query(sql);
        let countRaw = await conn.query(sql2);
        let count = countRaw[0][0].count;

        for(let i=0;i<list.length;i++){
            list[i].create_time = moment(list[i].create_time).format('YYYY-MM-DD HH:mm');
        }
        res.send({ "code": 2000000, "msg": code['2000000'], pages:pages, limit:limit, count:count, data:list });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], pages:pages, limit:limit, count:0, data:[] });
    }
}


exports.add = async function (req, res, next) {
    try{
        let name = req.body.name;
        let cname = req.body.cname;
        let sort = req.body.sort;
        let icon = req.body.icon;
        let is_deleted = req.body.is_deleted;
        let is_order = req.body.is_order;
        let data = req.body.data;
        //console.log(name, sort, icon, data);
        if(!name){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }
        let now = moment().format('YYYY-MM-DD HH:mm:ss');

        let sql = ` insert into genecode(name, cname, icon, sort, is_deleted, is_order, create_time)
                    values('${name}', '${cname}', '${icon}', ${sort}, ${is_deleted}, ${is_order}, '${now}') `;
        //console.log(sql);
        let [raw] = await conn.query(sql);
        let g_id = raw.insertId;

        for(let i=0;i<data.length;i++){
            let sql2 = ` insert into genecode_detail(g_id, name, type, leng, deci, is_null, default_val, is_mkey, is_autoincre,
                         remark, is_search, ft_type, is_sort, up_down, cname, list_show)
                         values(${g_id}, '${data[i].name}', '${data[i].type}', ${data[i].leng}, ${data[i].deci}, ${data[i].is_null}, 
                         '${data[i].default_val}', ${data[i].is_mkey}, ${data[i].is_autoincre}, '${data[i].remark}', 
                         ${data[i].is_search}, ${data[i].ft_type}, ${data[i].is_sort}, '${data[i].up_down}', '${data[i].cname}',
                         ${data[i].list_show}) `;
            //console.log(sql2);
            await conn.query(sql2);
        }
        
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

        let sql = ` select * from genecode where id = ${id} `;
        let [[raw]] = await conn.query(sql);

        let sql2 = ` select * from genecode_detail where g_id = ${id} `;
        let [raw2] = await conn.query(sql2);
        raw.detail = raw2;
        
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
        let cname = req.body.cname;
        let sort = req.body.sort;
        let icon = req.body.icon;
        let is_deleted = req.body.is_deleted;
        let is_order = req.body.is_order;
        let data = req.body.data;
        //console.log(name, sort, icon, data);
        if(!id || !name){
            return res.send({"code": 4000000, "msg": code[4000000] });
        }

        let sql = ` update genecode set name = '${name}', cname = '${cname}', icon = '${icon}', sort = ${sort}, 
                    is_deleted = ${is_deleted}, is_order = ${is_order} 
                    where id = ${id} `;
        await conn.query(sql);

        //先删除之前的所有子项
        let sql2 = ` delete from genecode_detail where g_id = ${id} `;
        await conn.query(sql2);

        //重新插入子项
        for(let i=0;i<data.length;i++){
            let sql2 = ` insert into genecode_detail(g_id, name, type, leng, deci, is_null, default_val, is_mkey, is_autoincre,
                         remark, is_search, ft_type, is_sort, up_down, cname, list_show)
                         values(${id}, '${data[i].name}', '${data[i].type}', ${data[i].leng}, ${data[i].deci}, ${data[i].is_null}, 
                         '${data[i].default_val}', ${data[i].is_mkey}, ${data[i].is_autoincre}, '${data[i].remark}', 
                         ${data[i].is_search}, ${data[i].ft_type}, ${data[i].is_sort}, '${data[i].up_down}', '${data[i].cname}',
                         ${data[i].list_show}) `;
            //console.log(sql2);
            await conn.query(sql2);
        }
        
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

        let sql = ` delete from genecode where id = ${id} `;
        await conn.query(sql);

        //删除之前的所有子项
        let sql2 = ` delete from genecode_detail where g_id = ${id} `;
        await conn.query(sql2);
        
        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}

