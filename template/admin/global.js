const tool = require('../../commons/tool');

exports.content = function (data1, data2, bgName) {
  let apiStr = '';
  for(let i=0;i<data2.length;i++){
    let name = data2[i].name;
    if(data2[i].is_order==1){
      apiStr += `
    erp.${name}List = bg + '/${name}/list';
    erp.${name}Add = bg + '/${name}/add';
    erp.${name}Info = bg + '/${name}/info';
    erp.${name}Edit = bg + '/${name}/edit';
    erp.${name}Del = bg + '/${name}/del';
      `;
    } else if(data2[i].is_order==2) {  //订单类
      apiStr += `
    erp.${name}List = bg + '/${name}/list';
      `;
    } else if(data2[i].is_order==3) {  //基础信息类
      apiStr += `
    erp.${name}Info = bg + '/${name}/info';
    erp.${name}Edit = bg + '/${name}/edit';
      `;
    } else {

    }
  }
  
  const str = `
    const erp = erp || {};

    erp.gaodeKey = '35982f18ea3de896092a670f25a11537';
    erp.API_SECRET_KEY = '${data1.akey}';
    
    const url = 'http://localhost:8088/${bgName}';
    
    const bg = url + '/bg';
    
    erp.upload = bg + '/upload';
    
    erp.login = bg + '/login';
    
    erp.adminList = bg + '/admin/list';
    erp.adminAdd = bg + '/admin/add';
    erp.adminMod = bg + '/admin/modify';
    erp.adminDel = bg + '/admin/remove';
    
    erp.userList = bg + '/user/list';
    ${apiStr}
    
    export default erp;
  `;

  return tool.beautyFile(str);
}