/*
* 工具类函数集合
*/
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const stat = fs.stat;


//去掉开头和结尾空格后的字符串，换行符转为空格
exports.convertSql = function (str) {
    return str.trim().replace(/\s+/g, ' ');
};


// 递归创建目录 同步方法
exports.mkdirsSync = function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


exports.filteremoji = function (str){
    var ranges = [
        '\ud83c[\udf00-\udfff]', 
        '\ud83d[\udc00-\ude4f]', 
        '\ud83d[\ude80-\udeff]'
    ];
    return str.replace(new RegExp(ranges.join('|'), 'g'), '')
}


//表情符转其他字符串（防止数据库报错）
exports.filteremoji2 = function(str) {
    var strArr = str.split(""),
      result = "",
      totalLen = 0;
    for(var idx = 0; idx < strArr.length; idx ++) {
      // 超出长度,退出程序
      if(totalLen >= 16) break;
      var val = strArr[idx];
      // 英文,增加长度1
      if(/[a-zA-Z]/.test(val)) {
          totalLen = 1 + (+totalLen);
          result += val;
      }
  
      // 中文,增加长度2
      else if(/[\u4e00-\u9fa5]/.test(val)) {
          totalLen = 2 + (+totalLen);
          result += val;
      }
  
      // 遇到代理字符,将其转换为 "口", 不增加长度
      else if(/[\ud800-\udfff]/.test(val)) {
          // 代理对长度为2,
          if(/[\ud800-\udfff]/.test(strArr[idx + 1])) {
              // 跳过下一个
              idx ++;
          }
          // 将代理对替换为 "口"
          result += "口";
      }
    };
    return result
}


//数组去重（非对象数组）
exports.rmRepeat = function(arr){
    let new_arr = []
    arr.map(item=>{
        if(new_arr.indexOf(item)==-1){
            new_arr.push(item)
        }
    })
    return new_arr
}


//对象数组去重
exports.rmObjson = function(arr){
    let result = [];
    for(var i=0;i<arr.length;i++){
        if(!JSON.stringify(result).match(JSON.stringify(arr[i]))){
            result.push(arr[i]);
        }
    }
    return result;
}


//计算两个经纬度之间的直线距离
exports.distance = function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
}


//n位String类型的数字随机数
exports.randomn = function(n){
    if (n > 21) return null
    var re =new RegExp("(\\d{" + n + "})(\\.|$)")
    var num = (Array(n-1).join(0) + Math.pow(10,n) * Math.random()).match(re)[1]
    return num
    // Array(n > num ? (n - ('' + num).length +1) : 0).join(0) + num 补位
}


//生成订单尾数，时间+顺序码（num为有效订单个数，leng为尾数的长度）
exports.geneMantissa = function(num, leng){
    if(!num) num = 0;
    if(!leng) leng = 0;

    let time = moment().format('YYYYMMDDHHmmss');
    let length = leng - String(num).length;

    if(num==0 && leng==0){
        return time;
    } else if( (num!=0 || leng!=0) && length<=0 ){
        return time + String(num);
    } else {
        let str = '';
        for(let i=0;i<length;i++){
            str += '0';
        }
        str += String(num);
        return time + str;
    }
}



//测试某个路径下文件是否存在
var exists = exports.exists = function exists(src, dst, callback){
    fs.exists(dst, function(exists){
        if(exists){  //不存在
            callback(src,dst);
        } else {  //存在
            fs.mkdir(dst,function(){  //创建目录
                callback(src,dst);
            })
        }
    })
}
//递归拷贝文件夹及其文件到指定目录
exports.copy = function copy(src, dst){
    //读取目录
    fs.readdir(src,function(err, paths){
        //console.log(paths);
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                } else if (st.isDirectory()){
                    exists(_src, _dst, copy);
                }
            });
        });
    });
}


