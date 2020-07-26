const moment = require('moment');
const path = require('path');
const fs = require('fs');
const code = require('../../commons/code');
const tool = require('../../commons/tool');
const conn = require('../../config/pool');
const temApi = require('../../template/api/index');
const temAdmin = require('../../template/admin/index');


exports.project = async function (req, res, next) {
    try{
        //1. 先获取基础设置信息
        let sql1 = ` select * from base limit 1 `;
        let [[raw1]] = await conn.query(sql1);
        //console.log(raw1);

        let Path = path.resolve(__dirname, '../../');
        let apiProjectFloder = `${raw1.project_name}_api`;   //后端API文件夹名称
        let adminProjectFloder = `${raw1.project_name}_admin`;   //管理后台页面文件夹名称
        let apiPathFixed = Path + '/fixed_file/api';
        let apiPathExp = Path + `/project_export/${apiProjectFloder}`;   //后端API输出路径
        let adminPathFixed = Path + '/fixed_file/admin';   
        let adminPathExp = Path + `/project_export/${adminProjectFloder}`;   //管理后台页面输出路径

        //2. 获取所有模块以及其字段
        let sql2 = ` select * from genecode order by sort asc `;
        let [raw2] = await conn.query(sql2);
        for(let i=0;i<raw2.length;i++){
            let sql3 = ` select * from genecode_detail where g_id = ${raw2[i].id} `;
            let [raw3] = await conn.query(sql3);
            raw2[i].detail = raw3;
        }

        //3. 先从固定的文件夹里面将前后端文件夹copy到输出目录
        tool.exists(apiPathFixed, apiPathExp, tool.copy);  //后端API文件夹拷贝
        tool.exists(adminPathFixed, adminPathExp, tool.copy);  //管理后台页面文件夹拷贝

        //4. 开始生成后端
        // 1)app.js
        let appJs = temApi.appJs.content(raw1.project_name, raw1.port);
        fs.writeFileSync(`${apiPathExp}/app.js`, appJs);
        // 2)README.md
        let readme = temApi.readme.content(apiProjectFloder, raw1.bg_remark);
        fs.writeFileSync(`${apiPathExp}/README.md`, readme);
        // 3)package.json
        let package = temApi.package.content(apiProjectFloder);
        fs.writeFileSync(`${apiPathExp}/package.json`, package);
        // 4)config/setting.js
        let setting = temApi.setting.content(apiProjectFloder, raw1);
        fs.writeFileSync(`${apiPathExp}/config/setting.js`, setting);
        // 5)循环生成CURD
        for(let i=0;i<raw2.length;i++){
            if(raw2[i].is_order == 1){  //常规类
                let curd = temApi.curd.content(raw2[i]);
                fs.writeFileSync(`${apiPathExp}/controllers/bg/${raw2[i].name}.js`, curd);
            } else if(raw2[i].is_order == 2) {  //订单类
                let curd2 = temApi.curd2.content(raw2[i]);
                fs.writeFileSync(`${apiPathExp}/controllers/bg/${raw2[i].name}.js`, curd2);
            } else if(raw2[i].is_order == 3) {  //基础信息类
                let curd3 = temApi.curd3.content(raw2[i]);
                fs.writeFileSync(`${apiPathExp}/controllers/bg/${raw2[i].name}.js`, curd3);
            } else {

            }
        }
        // 6)生成bg的路由
        let bgRouter = temApi.bgRouter.content(raw2);
        fs.writeFileSync(`${apiPathExp}/routes/bg_router.js`, bgRouter);
        // 7)生成sql文件
        let sqlFile = temApi.sql.content(raw2);
        fs.writeFileSync(`${apiPathExp}/${apiProjectFloder}.sql`, sqlFile);

        //5. 开始生成前端admin
        // 1)README.md
        let readmeAdmin = temAdmin.readme.content(adminProjectFloder, raw1.ft_remark);
        fs.writeFileSync(`${adminPathExp}/README.md`, readmeAdmin);
        // 2)package.json
        let packageAdmin = temAdmin.package.content(adminProjectFloder);
        fs.writeFileSync(`${adminPathExp}/package.json`, packageAdmin);
        // 3)index.html
        let indexHtmlAdmin = temAdmin.indexHtml.content(raw1.cname);
        fs.writeFileSync(`${adminPathExp}/index.html`, indexHtmlAdmin);
        // 4)src/js/global.js
        let globalAdmin = temAdmin.global.content(raw1, raw2, apiProjectFloder);
        fs.writeFileSync(`${adminPathExp}/src/js/global.js`, globalAdmin);
        // 5)前端路由src/router/index.js
        let routerAdmin = temAdmin.router.content(raw2);
        fs.writeFileSync(`${adminPathExp}/src/router/index.js`, routerAdmin);
        // 6)循环生成基本页面
        for(let i=0;i<raw2.length;i++){
            let name = raw2[i].name;
            let dirPath = `${adminPathExp}/src/myviews/${name}`; 
            if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath); //先判断文件夹是否存在
            if(raw2[i].is_order == 1){  //常规类
                let listHtml = temAdmin.listHtml.content(raw2[i]);
                fs.writeFileSync(`${dirPath}/list.vue`, listHtml);
                let addHtml = temAdmin.addHtml.content(raw2[i]);
                fs.writeFileSync(`${dirPath}/add.vue`, addHtml);
                let editHtml = temAdmin.editHtml.content(raw2[i]);
                fs.writeFileSync(`${dirPath}/edit.vue`, editHtml);
            } else if(raw2[i].is_order == 2) {  //订单类
                let listHtml2 = temAdmin.listHtml2.content(raw2[i]);
                fs.writeFileSync(`${dirPath}/list.vue`, listHtml2);
            } else if(raw2[i].is_order == 3) {  //基础信息类
                let listHtml3 = temAdmin.listHtml3.content(raw2[i]);
                fs.writeFileSync(`${dirPath}/list.vue`, listHtml3);
            } else {

            }
        }

        res.send({ "code": 2000000, "msg": code['2000000'], data:{} });
    } catch(e) {
        console.log(e);
        res.send({ "code": 5000000, "msg": code['5000000'], data:{} });
    }
}
