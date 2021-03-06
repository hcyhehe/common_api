const tool = require('../../commons/tool');

exports.content = function (projectName) {
  const str = `
    {
      "name": "${projectName}",
      "author": "He Chunying <960696163@qq.com>",
      "version": "1.0.0",
      "private": true,
      "scripts": {
        "start": "node ./bin/www"
      },
      "dependencies": {
        "@alicloud/pop-core": "^1.7.9",
        "body-parser": "~1.16.0",
        "cookie-parser": "~1.4.3",
        "cors": "^2.8.4",
        "crypto": "^1.0.1",
        "debug": "~2.6.0",
        "ejs": "~2.5.5",
        "exceljs": "^1.15.0",
        "express": "~4.14.1",
        "formidable": "^1.2.1",
        "jsonwebtoken": "^8.3.0",
        "moment": "^2.22.2",
        "morgan": "~1.7.0",
        "mysql2": "^1.5.3",
        "node-uuid": "^1.4.8",
        "node-xlsx": "^0.15.0",
        "querystring": "^0.2.0",
        "random-string": "^0.2.0",
        "request": "^2.88.0",
        "request-promise": "^4.2.2",
        "rotating-file-stream": "^1.3.6",
        "serve-favicon": "~2.3.2",
        "sha1": "^1.1.1",
        "socket.io": "^2.1.1",
        "xml2js": "^0.4.19",
        "xmlreader": "^0.2.3"
      }
    }
  `;

  return tool.beautyFile(str);
}