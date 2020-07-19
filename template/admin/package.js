const tool = require('../../commons/tool');

exports.content = function (projectName) {
  const str = `
    {
      "name": "${projectName}",
      "version": "1.0.0",
      "description": "A magical vue admin",
      "author": "He Chunying <960696163@qq.com>",
      "license": "MIT",
      "scripts": {
        "dev": "cross-env BABEL_ENV=development webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
        "build:prod": "cross-env NODE_ENV=production env_config=prod node build/build.js",
        "build:sit": "cross-env NODE_ENV=production env_config=sit node build/build.js",
        "test": "npm run lint",
        "precommit": "lint-staged",
        "svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml"
      },
      "keywords": [
        "vue",
        "element-ui",
        "admin",
        "management-system",
        "admin-template"
      ],
      "dependencies": {
        "@tinymce/tinymce-vue": "^1.1.0",
        "axios": "0.18.0",
        "clipboard": "1.7.1",
        "codemirror": "5.39.2",
        "connect": "3.6.6",
        "crypto": "^1.0.1",
        "driver.js": "0.5.2",
        "dropzone": "5.2.0",
        "echarts": "4.1.0",
        "element-ui": "2.4.6",
        "file-saver": "1.3.8",
        "font-awesome": "4.7.0",
        "jquery": "^3.3.1",
        "js-cookie": "2.2.0",
        "jsonlint": "1.6.3",
        "jszip": "3.1.5",
        "mockjs": "1.0.1-beta3",
        "moment": "^2.22.2",
        "normalize.css": "7.0.0",
        "nprogress": "0.2.0",
        "screenfull": "3.3.3",
        "showdown": "1.8.6",
        "simplemde": "1.11.2",
        "sortablejs": "1.7.0",
        "tinymce": "^4.8.4",
        "vue": "2.5.17",
        "vue-count-to": "1.0.13",
        "vue-i18n": "7.3.2",
        "vue-router": "3.0.1",
        "vue-splitpane": "1.0.2",
        "vuedraggable": "^2.16.0",
        "vuex": "3.0.1",
        "xlsx": "^0.11.16"
      },
      "devDependencies": {
        "autoprefixer": "8.5.0",
        "babel-core": "6.26.3",
        "babel-helper-vue-jsx-merge-props": "2.0.3",
        "babel-loader": "7.1.5",
        "babel-plugin-dynamic-import-node": "2.0.0",
        "babel-plugin-syntax-jsx": "6.18.0",
        "babel-plugin-transform-runtime": "6.23.0",
        "babel-plugin-transform-vue-jsx": "3.7.0",
        "babel-preset-env": "1.7.0",
        "babel-preset-stage-2": "6.24.1",
        "chalk": "2.4.1",
        "copy-webpack-plugin": "4.5.2",
        "cross-env": "5.2.0",
        "css-loader": "1.0.0",
        "file-loader": "1.1.11",
        "friendly-errors-webpack-plugin": "1.7.0",
        "hash-sum": "1.0.2",
        "html-webpack-plugin": "4.0.0-alpha",
        "husky": "0.14.3",
        "lint-staged": "7.2.2",
        "mini-css-extract-plugin": "0.4.1",
        "node-notifier": "5.2.1",
        "node-sass": "^4.7.2",
        "optimize-css-assets-webpack-plugin": "5.0.0",
        "ora": "3.0.0",
        "path-to-regexp": "2.4.0",
        "portfinder": "1.0.13",
        "postcss-import": "11.1.0",
        "postcss-loader": "2.1.6",
        "postcss-url": "7.3.2",
        "rimraf": "2.6.2",
        "sass-loader": "7.0.3",
        "script-ext-html-webpack-plugin": "2.0.1",
        "script-loader": "0.7.2",
        "semver": "5.5.0",
        "serve-static": "1.13.2",
        "shelljs": "0.8.2",
        "svg-sprite-loader": "3.8.0",
        "svgo": "1.0.5",
        "uglifyjs-webpack-plugin": "1.2.7",
        "url-loader": "1.0.1",
        "vue-loader": "15.3.0",
        "vue-style-loader": "4.1.2",
        "vue-template-compiler": "2.5.17",
        "webpack": "4.16.5",
        "webpack-bundle-analyzer": "2.13.1",
        "webpack-cli": "3.1.0",
        "webpack-dev-server": "3.1.5",
        "webpack-merge": "4.1.4"
      },
      "engines": {
        "node": ">= 6.0.0",
        "npm": ">= 3.0.0"
      },
      "browserslist": [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
      ]
    }
  `;

  return tool.beautyFile(str);
}