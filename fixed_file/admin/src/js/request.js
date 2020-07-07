import axios from 'axios'
import crypto from 'crypto'
import base from './global'
import { Message } from 'element-ui'

const API_SECRET_KEY = base.API_SECRET_KEY;
const TIMESTAMP = new Date().getTime();
const md5 = crypto.createHash("md5");
md5.update((TIMESTAMP + API_SECRET_KEY).toLowerCase());
const SIGN = md5.digest('hex');


export async function aGet(url, params){
  try{
    if(!params) params = {};
    params.SIGN = SIGN;
    params.TIMESTAMP = TIMESTAMP;
    let res = await axios.get(url, {params:params, timeout:8000});
    return res;
  } catch(e) {
    console.log(e);
    Message({ showClose: true, message: '服务器忙', type: 'warning', duration:1200 });
  }
}


export async function aPost(url, params){
  try{
    if(!params) params = {};
    params.SIGN = SIGN;
    params.TIMESTAMP = TIMESTAMP;
    let res = await axios.post(url, params, {timeout: 8000});
    return res;
  } catch(e) {
    console.log(e);
    Message({ showClose: true, message: '服务器忙', type: 'warning', duration:1200 });
  }
}


//加密的待定
export async function upImg(url, fileName, file){
  try{
    //console.log('upImg params:', url, fileName, file);
    let params = new FormData();
    params.append(fileName, file, file.name);
    //params.append(key, value);
    let res = await axios.post(url, params,
      {headers: {'Content-Type': 'multiple/form-data'}}
    );
    return res;
  } catch(e) {
    console.log(e);
    Message({ showClose: true, message: '服务器忙', type: 'warning', duration:1200 });
  }
}


export async function upImg2(url, data){
  try{
    let params = new FormData();
    for(let i in data){
      params.append(i, data[i]);
    }
    //params.append(key, value);
    let res = await axios.post(url, params,
      {headers: {'Content-Type': 'multiple/form-data'}}
    );
    return res;
  } catch(e) {
    console.log(e);
    Message({ showClose: true, message: '服务器忙', type: 'warning', duration:1200 });
  }
}
