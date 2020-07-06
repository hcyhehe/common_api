import axios from 'axios'
import base from './global'

//判断是否包含表情
export function isEmoji(substring) {
    for ( var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                return true;
            }
        }
    }
}

//移动端关闭当前页面
export function closePage(){
    var userAgent = navigator.userAgent;
    if(userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1){
        window.location.href = "about:blank";
    } else if(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1){
        window.opener = null;
        window.open('about:blank','_self','').close();
    } else {
        window.opener = null;
        window.open("about:blank", "_self");
        window.close();
    }
}

//判断手机号是否正确
export function testPhone(phone){
    let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
    return phoneReg.test(phone);
}

//判断邮箱
export function testEmail(email){
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    return reg.test(email);
}

//判断身份证
export function idCardCheck(idNo){
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(!regIdNo.test(idNo)){ 
        return false;
    } else {
        return true;
    }
}

//判断非负整数
export function judgeNum1(str){
    if(isNaN(str)){
        return false;
    } else {
        if(str>=0 && str%1===0){
            return true;
        } else {
            return false;
        }
    }
}

//判断正整数
export function judgeNum2(str){
    if(isNaN(str)){
        return false;
    } else {
        if(str>0 && str%1===0){
            return true;
        } else {
            return false;
        }
    }
}

//判断正数
export function judgeNum3(str){
    if(isNaN(str)){
        return false;
    } else {
        if(str>0){
            return true
        } else {
            return false
        }
    }
}


//判断是否n位的小数
export function judgeNum4(x, n){
    var y = String(x).indexOf(".") + 1  //获取小数点的位置
    var count = String(x).length - y  //获取小数点后的个数
    if(y>0 && count<=n){
        return true
    } else {
        return false
    }
}


//两个数组求差
export function diff(arr1, arr2) {
    var newArr = [];
    var arr3 = [];
    for (var i=0;i<arr1.length;i++) {
      if(arr2.indexOf(arr1[i]) === -1)   
        arr3.push(arr1[i]);
    }
    var arr4 = [];
    for (var j=0;j<arr2.length;j++) {
      if(arr1.indexOf(arr2[j]) === -1)
        arr4.push(arr2[j]);
    }
    newArr = arr3.concat(arr4);
    return newArr;
}
  

//数组去重
export function uniq(arr){
    let new_arr = [];
    for(let i=0;i<arr.length;i++){
        if(new_arr.indexOf(arr[i])==-1){
            new_arr.push(arr[i]);
        }
    }
    return new_arr;
}


//微信分享接口
export function getShare(){
    let that = this;
    let pageUrl = encodeURIComponent(location.href.split('#')[0]);  //只要域名那一块
    console.log('pageUrl', pageUrl);

    axios.get(base.getShare3, {params:{pageUrl:pageUrl}}).then(res=>{
    console.log('getShare', res.data);

    wx.config({
        debug: false, // 调试模式
        appId: base.appid, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名，见附录1
        jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        var link = window.location.href;
        var protocol = window.location.protocol;
        var host = window.location.host;
        link = link.split('/?')[0] + '/#/' + link.split('#/')[1];
        //alert('link:'+link);

        //分享朋友圈
        wx.onMenuShareTimeline({
            title: 'V盟，让城市生活更美好',
            link: link,
            imgUrl: protocol+'//'+host+'/wk_vote_node/public/vmeng.jpg',// 自定义图标
        });
        //分享给好友
        wx.onMenuShareAppMessage({
            title: 'V盟，让城市生活更美好', // 分享标题
            desc: 'V盟北京 焕新上线', // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: protocol+'//'+host+'/wk_vote_node/public/vmeng.jpg', // 自定义图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        });
        wx.error(function (res) {
            console.log('wx.error', res.errMsg);
        });
    });

    }).catch(err=>{
        console.log(err);
    })
}

