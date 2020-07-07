const moment = require('moment');
const path = require('path');
const code = require('../../commons/code');
const tool = require('../../commons/tool');
const conn = require('../../config/pool');


exports.project = async function (req, res, next) {
    try{
        let Path = path.resolve(__dirname, '../../');

        //1. 先获取基础设置信息
        let sql1 = ` select * from base limit 1 `;
        let [[raw1]] = await conn.query(sql1);
        console.log(raw1);

        //2. 获取所有模块以及其字段
        let sql2 = ` select * from genecode order by sort asc `;
        let [raw2] = await conn.query(sql2);
        for(let i=0;i<raw2.length;i++){
            let sql3 = ` select * from genecode_detail where g_id = ${raw2[i].id} `;
            let [raw3] = await conn.query(sql3);
            raw2[i].detail = raw3;
        }
        console.log(raw2);

        //3. 先从固定的文件夹里面将前后端文件夹copy到输出目录
        let bgPathFixed = Path + '/fixed_file/api';
        let bgPathExp = Path + '/project_export/api';
        let ftPathFixed = Path + '/fixed_file/admin';
        let ftPathExp = Path + '/project_export/admin';
        tool.exists(bgPathFixed, bgPathExp, tool.copy);  //后端文件夹拷贝
        tool.exists(ftPathFixed, ftPathExp, tool.copy);  //前端文件夹拷贝


        //4. 开始生成后端
        //1)app.js
        

        
        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}
