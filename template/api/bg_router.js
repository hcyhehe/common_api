const tool = require('../../commons/tool');

exports.content = function (data) {
  //console.log('bgRouter data:', data);

  let fileImport = '';
  let router = '';
  for(let i=0;i<data.length;i++){
    let name = data[i].name;
    fileImport += `
    const ${name} = require('../controllers/bg/${name}');`;
    
    router += `
    router.get('/${name}/list', check.verifyClient, ${name}.list);
    router.post('/${name}/add', check.verifyClient, ${name}.add);
    router.get('/${name}/info', check.verifyClient, ${name}.info);
    router.post('/${name}/edit', check.verifyClient, ${name}.edit);
    router.post('/${name}/del', check.verifyClient, ${name}.del);
    `;
  }

  const str = `
    const express = require('express');
    const router = express.Router();
    const upload = require('../commons/upload');
    const check = require('../middlewares/check');
    const admin = require('../controllers/bg/admin');
    const user = require('../controllers/bg/user');
    ${fileImport}
    
    router.post('/upload', upload.upload);
    
    router.post('/login', check.verifyClient, admin.login);
    
    router.get('/admin/list', check.verifyClient, admin.list);
    router.post('/admin/add', check.verifyClient, admin.add);
    router.post('/admin/modify', check.verifyClient, admin.modify);
    router.post('/admin/remove', check.verifyClient, admin.remove);
    
    router.get('/user/list', check.verifyClient, user.list);
    ${router}
    
    module.exports = router
  `;

  return tool.beautyFile(str);
}

