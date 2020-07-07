const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const tool = require('./tool');
const code = require('./code');
const config = require('../config/setting');


//此上传方式，fileName可自定义
exports.upload = function(req, res) {
    try{
        let form = new formidable.IncomingForm;
		form.keepExtensions = true;
		let uploadFileDir = path.resolve(__dirname, '../') + '/upload/file';

		//先判断文件夹是否存在
		let exist = fs.existsSync(uploadFileDir);
		if(!exist) tool.mkdirsSync(uploadFileDir);

		form.uploadDir = uploadFileDir;
        //console.log('path:'+form.uploadDir);
		form.onComplete = function(err, fields, files) {
			if(err) {
				res.send(JSON.stringify({ msg : '文件上传失败！',error : '文件上传失败!' + err} ));
			} else {
				let fileEntity;
				if(files.imgFile) fileEntity=files.imgFile;
				else if(files.fileToUpload) fileEntity=files.fileToUpload;
				else {
					for(var key in files) {
                        fileEntity=files[key];
                        break;
                    }
				}

				let ext = fileEntity.name.split('.');
				let newName = new Date().getTime() + "." + ext[ext.length - 1];
				let newPath = uploadFileDir + "/" + newName;
				//console.log("newPath " + newPath);
				fs.rename(fileEntity.path, newPath, function(err) {
					if(err)
						res.send({resultCode:'99',msg:'文件上传失败！',});
					else {
						let url = config.domain + "/upload/file/" + newName;
						console.log('url:', url);
						res.send({resultCode:'0', msg:'文件上传成功！', name:newName, fileurl:url});
					}
				});
			}
		};
		form.parse(req, form.onComplete);
    }catch(e){
        console.log(e);
    }
}


exports.public = async function(req, res, next){
    try{
        let url = path.resolve(__dirname, '../') + req.url;
        let exist = fs.existsSync(url);
        if(exist){
            res.sendFile(url);
        } else {
            //console.log(url + ' not exist');
            res.send({"code": 4000004, "msg": code['4000004'] });
		}
	} catch(e) {
		console.log(e);
	}
}


//xlsx下载
exports.downLoad = async function(req, res, next){
    try{
		let url = path.resolve(__dirname, '../') + decodeURI(req.url, "GBK");  //若带中文，则解码
		//console.log('url', url)
        let exist = fs.existsSync(url);
        if(exist){
            res.download(url);
        } else {
            res.send({"code": 4000004, "msg": code['4000004'] });
		}
	} catch(e) {
		console.log(e);
	}
}