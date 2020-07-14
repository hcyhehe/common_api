const tool = require('../../commons/tool');

exports.content = function (data) {
  let sqlStr = '';
  for(let i=0;i<data.length;i++){
    //console.log('sql data:', data[i]);
    let name = data[i].name;
    let detail = data[i].detail;
    sqlStr += `
      -- ----------------------------
      -- Table structure for \`${name}\`
      -- ----------------------------
      DROP TABLE IF EXISTS \`${name}\`;
      CREATE TABLE \`${name}\` (
    `;
    
    let fields = '';
    let mkey;
    for(let j=0;j<detail.length;j++){
      fields += `\`${detail[j].name}\` ${detail[j].type}(${detail[j].leng},${detail[j].deci}) `;
      if(detail[j].is_mkey == 2){
        mkey = detail[j].name;
        fields += ` NOT NULL `;
        if(detail[j].is_autoincre == 2) fields += ` AUTO_INCREMENT `;
      } else {
        if(detail[j].is_null==1) fields += ` NOT NULL `;
        if(detail[j].default_val) fields += ` DEFAULT '${detail[j].default_val}' `;
        if(!detail[j].default_val && detail[j].default_val!==0) fields += ` DEFAULT NULL `;
        if(detail[j].remark) fields += ` COMMENT '${detail[j].remark}' `;
      }
      fields += `,
      `;
    }
    
    sqlStr += `
        ${fields}
        PRIMARY KEY (\`${mkey}\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
    `;
  }
  console.log(sqlStr);

  const str = `
    SET FOREIGN_KEY_CHECKS=0;

    -- ----------------------------
    -- Table structure for \`admin\`
    -- ----------------------------
    DROP TABLE IF EXISTS \`admin\`;
    CREATE TABLE \`admin\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`username\` varchar(20) NOT NULL,
      \`password\` varchar(50) DEFAULT NULL,
      \`role\` smallint(4) DEFAULT '0' COMMENT '0未认证的商家，1正常商家，2平台管理员',
      \`token\` varchar(40) DEFAULT NULL,
      \`create_time\` datetime NOT NULL,
      \`last_login_time\` datetime DEFAULT NULL,
      \`last_login_ip\` varchar(20) DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
    
    -- ----------------------------
    -- Records of admin
    -- ----------------------------
    INSERT INTO \`admin\` VALUES ('1', 'admin', '4297f44b13955235245b2497399d7a93', '2', null, '2020-05-23 01:03:47', '2020-07-12 19:24:39', '127.0.0.1');
  
    -- ----------------------------
    -- Table structure for \`user\`
    -- ----------------------------
    DROP TABLE IF EXISTS \`user\`;
    CREATE TABLE \`user\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`openid\` text NOT NULL,
      \`nickname\` text NOT NULL,
      \`username\` text COMMENT '姓名',
      \`avatar\` text,
      \`phone\` text COMMENT '联系号码',
      \`gender\` smallint(4) DEFAULT '1' COMMENT '1男，2女',
      \`create_time\` datetime DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

    ${sqlStr}

  `;

  return tool.beautyFile(str);
}

