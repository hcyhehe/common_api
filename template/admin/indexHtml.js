const tool = require('../../commons/tool');

exports.content = function (cname) {
  const str = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="renderer" content="webkit">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>${cname}管理后台系统</title>
      </head>
      <body>
        <script src=<%= BASE_URL %>/tinymce4.7.5/tinymce.min.js></script>
        <div id="app"></div>
      </body>
    </html>
  `;

  return tool.beautyFile(str);
}