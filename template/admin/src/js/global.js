const erp = erp || {};

erp.API_SECRET_KEY = 'commonApi88.admin';
erp.gaodeKey = '35982f18ea3de896092a670f25a11537';

const url = 'http://localhost:8088/common_api';

const bg = url + '/bg';

erp.upload = bg + '/upload';

erp.login = bg + '/login';

erp.adminList = bg + '/admin/list';
erp.adminAdd = bg + '/admin/add';
erp.adminMod = bg + '/admin/modify';
erp.adminDel = bg + '/admin/remove';

erp.userList = bg + '/user/list';


export default erp;
