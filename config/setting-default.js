module.exports = {
    /* 后台配置 */
    port: '',
    project_name: '',
    
    /* 数据库配置 */
    mysql:{
		connectionLimit: 20,
		connectTimeout: 5*1000,
        host: '127.0.0.1',
		port : '3306',
        database: '',
        user: '',
        password: '',
    },
    
    /* api安全配置 */
    API_SECRET_KEY: '',
    H5_SECRET_KEY: '',
    
    /* 微信开发配置 */
    appid: '',
    appsecret: '',
    body: '',
    mch_id: '',
    mch_key: '',

    /* 阿里短信配置 */
    sms: '',
    accessKeyId: '',
    accessKeySecret: '',
    SignName: '',
    TemplateCode1: '',
    TemplateCode2: '',
    apiVersion: '',
    
    /* 静态文件域名 */
    domain: '',
}