/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : common_api

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2020-08-03 23:15:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` smallint(4) DEFAULT '0' COMMENT '0未认证的商家，1正常商家，2平台管理员',
  `token` varchar(40) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `last_login_ip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '4297f44b13955235245b2497399d7a93', '2', null, '2020-05-23 01:03:47', '2020-08-03 20:56:52', '127.0.0.1');
INSERT INTO `admin` VALUES ('8', 'admin2', 'c4ca4238a0b923820dcc509a6f75849b', '1', null, '2020-05-24 00:41:26', null, null);
INSERT INTO `admin` VALUES ('9', 'admin3', '4297f44b13955235245b2497399d7a93', '1', null, '2020-06-27 17:26:52', '2020-06-27 22:24:16', '127.0.0.1');

-- ----------------------------
-- Table structure for `base`
-- ----------------------------
DROP TABLE IF EXISTS `base`;
CREATE TABLE `base` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` text COMMENT '项目名',
  `cname` text COMMENT '项目中文名',
  `port` text COMMENT '端口',
  `bg_remark` text COMMENT '后端说明',
  `ft_remark` text COMMENT '前端说明',
  `akey` text COMMENT 'Admin密钥',
  `hkey` text COMMENT 'H5密钥',
  `db_name` text COMMENT '数据库名',
  `db_user` text COMMENT '数据库账号',
  `db_pass` text COMMENT '数据库密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of base
-- ----------------------------
INSERT INTO `base` VALUES ('2', 'carfans', '掌上车友宝二期', '8089', 'carfans掌上车友宝二期，nodejs编写', 'carfans掌上车友宝二期，vue编写', 'carfansAdmin.889', 'carfansH5.667', 'carfans', 'root', 'root');

-- ----------------------------
-- Table structure for `genecode`
-- ----------------------------
DROP TABLE IF EXISTS `genecode`;
CREATE TABLE `genecode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COMMENT '数据表名',
  `cname` text COMMENT '中文名',
  `icon` text COMMENT '模块图标',
  `sort` smallint(4) DEFAULT NULL,
  `is_deleted` smallint(4) DEFAULT '1' COMMENT '1真，2假',
  `is_order` smallint(4) DEFAULT '1' COMMENT '前端类型：1常规类，2订单类，3基础信息类',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of genecode
-- ----------------------------
INSERT INTO `genecode` VALUES ('1', 'company_reg', '企业注册', 'list', '1', '1', '1', '2020-08-02 20:16:31');
INSERT INTO `genecode` VALUES ('2', 'car_auth', '车辆认证', 'tree', '2', '1', '1', '2020-08-02 20:18:55');
INSERT INTO `genecode` VALUES ('3', 'sign_log', '签到表', 'people', '3', '1', '2', '2020-08-02 20:36:39');
INSERT INTO `genecode` VALUES ('4', 'coupon', '卡券', 'chart', '4', '1', '1', '2020-08-02 20:43:55');
INSERT INTO `genecode` VALUES ('5', 'coupon_log', '卡券日志', 'theme', '5', '1', '2', '2020-08-02 21:03:31');
INSERT INTO `genecode` VALUES ('6', 'location_log', '定位历史', 'example', '6', '1', '2', '2020-08-02 21:22:59');
INSERT INTO `genecode` VALUES ('7', 'locus_log', '轨迹历史', 'tab', '7', '1', '2', '2020-08-02 21:31:14');
INSERT INTO `genecode` VALUES ('8', 'locus_log_detail', '轨迹详情', 'tab', '8', '1', '2', '2020-08-02 21:41:13');
INSERT INTO `genecode` VALUES ('9', 'remind_task', '定制任务', 'peoples', '9', '1', '1', '2020-08-02 22:31:35');
INSERT INTO `genecode` VALUES ('10', 'plate_log', '车牌搜索历史', 'table', '10', '1', '2', '2020-08-02 22:42:14');
INSERT INTO `genecode` VALUES ('11', 'manual_check', '人工查询', 'excel', '11', '2', '2', '2020-08-02 23:34:03');
INSERT INTO `genecode` VALUES ('12', 'advert', '广告', 'shopping', '12', '1', '1', '2020-08-02 23:58:47');
INSERT INTO `genecode` VALUES ('13', 'check_shop', '商家入驻', 'documentation', '13', '2', '1', '2020-08-03 00:54:01');
INSERT INTO `genecode` VALUES ('14', 'check_shop_baddr', '商家经营驻地', 'list', '14', '1', '1', '2020-08-03 00:59:06');
INSERT INTO `genecode` VALUES ('15', 'check_shop_barea', '业务地区', 'list', '15', '1', '1', '2020-08-03 01:02:26');
INSERT INTO `genecode` VALUES ('16', 'check_shop_wx', '业务微信', 'list', '16', '1', '1', '2020-08-03 01:04:33');
INSERT INTO `genecode` VALUES ('17', 'shop_tag', '商家标签', 'list', '17', '1', '1', '2020-08-03 01:08:39');
INSERT INTO `genecode` VALUES ('18', 'shop_good', '点赞与浏览', 'list', '18', '1', '2', '2020-08-03 01:12:26');
INSERT INTO `genecode` VALUES ('19', 'complain', '投诉', 'example', '19', '1', '2', '2020-08-03 01:17:02');
INSERT INTO `genecode` VALUES ('20', 'check_order', '检测需求', 'excel', '20', '2', '2', '2020-08-03 21:28:41');
INSERT INTO `genecode` VALUES ('21', 'check_comment', '检测评论', 'tree', '21', '1', '1', '2020-08-03 21:51:04');
INSERT INTO `genecode` VALUES ('22', 'driver_order', '司机调度', 'chart', '22', '2', '2', '2020-08-03 22:23:48');
INSERT INTO `genecode` VALUES ('23', 'recharge_log', '充值记录', 'list', '23', '1', '2', '2020-08-03 22:29:42');
INSERT INTO `genecode` VALUES ('24', 'withdraw_log', '提现记录', 'list', '24', '1', '2', '2020-08-03 22:40:16');

-- ----------------------------
-- Table structure for `genecode_detail`
-- ----------------------------
DROP TABLE IF EXISTS `genecode_detail`;
CREATE TABLE `genecode_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `g_id` int(11) NOT NULL,
  `name` text COMMENT '字段名',
  `cname` text COMMENT '前端中文名',
  `type` text COMMENT '字段类型',
  `leng` smallint(4) DEFAULT '1' COMMENT '字段长度',
  `deci` smallint(4) DEFAULT '0' COMMENT '小数点位数',
  `is_null` smallint(4) DEFAULT '1' COMMENT '是否允许为空：1否，2是',
  `default_val` text COMMENT '默认值',
  `is_mkey` smallint(4) DEFAULT '1' COMMENT '是否为主键：1否，2是',
  `is_autoincre` smallint(4) DEFAULT '1' COMMENT '是否自增：1否，2是',
  `remark` text COMMENT '备注',
  `is_search` smallint(4) DEFAULT '1' COMMENT '是否为搜索项：1否，2是',
  `ft_type` smallint(4) DEFAULT '1' COMMENT '前端字段类型',
  `is_sort` smallint(4) DEFAULT '1' COMMENT '是否为排序项：1否，2是',
  `up_down` varchar(4) DEFAULT 'desc' COMMENT '升或降：1升，2降',
  `list_show` smallint(4) DEFAULT '2' COMMENT '前端列表显示：1否，2是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=577 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of genecode_detail
-- ----------------------------
INSERT INTO `genecode_detail` VALUES ('45', '4', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('46', '4', 'type', '类型', 'smallint', '4', '0', '1', '', '1', '1', '1普通充值卡，2月卡', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('47', '4', 'price', '金额', 'decimal', '11', '2', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('48', '4', 'spec_num', '规格数量', 'int', '11', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('49', '4', 'sort', '排序', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '1', '2', 'asc', '2');
INSERT INTO `genecode_detail` VALUES ('50', '4', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('106', '9', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('107', '9', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('108', '9', 'type', '类型', 'smallint', '4', '0', '1', '', '1', '1', '1到达，2跨市，3离线', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('109', '9', 'plate', '车牌号', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('110', '9', 'p_type', '车牌类型', 'smallint', '4', '0', '1', '', '1', '1', '1黄，2蓝', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('111', '9', 'addr', '地址', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('112', '9', 'lng', '经度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('113', '9', 'lat', '纬度', 'int', '11', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('114', '9', 'minutes_in', '任务截止时间', 'int', '11', '0', '1', '', '1', '1', '10分钟间隔', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('115', '9', 'remind_time', '提醒时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '6', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('116', '9', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('135', '12', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('136', '12', 'img', '图片', 'text', '0', '0', '1', '', '1', '1', '', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('137', '12', 'name', '广告名', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('138', '12', 'type', '类型', 'smallint', '4', '0', '1', '1', '1', '1', '1内，2外', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('139', '12', 'href', '链接地址', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('140', '12', 'sort', '排序', 'smallint', '4', '0', '1', '1', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('141', '12', 'status', '上架', 'smallint', '4', '0', '1', '1', '1', '1', '1是，2否', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('182', '14', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('183', '14', 'shop_id', '商家id', 'int', '11', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('184', '14', 'addr', '地址', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('185', '14', 'img', '图片', 'text', '0', '0', '1', '', '1', '1', '', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('186', '14', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('227', '15', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('228', '15', 'shop_id', '商家id', 'int', '11', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('229', '15', 'prov', '省', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('230', '15', 'city', '市', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('231', '15', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('232', '16', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('233', '16', 'shop_id', '商家id', 'int', '11', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('234', '16', 'wx_num', '微信号', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('235', '16', 'name', '真实姓名', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('236', '16', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('237', '17', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('238', '17', 'name', '标签名', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('239', '17', 'sort', '排序', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '1', '2', 'asc', '2');
INSERT INTO `genecode_detail` VALUES ('251', '1', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('252', '1', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('253', '1', 'company_img', '营业执照', 'text', '0', '0', '1', '', '1', '1', '', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('254', '1', 'company_name', '企业名称', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('255', '1', 'company_code', '统一信用代码', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('256', '1', 'company_entity', '企业法人', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('257', '1', 'reg_addr', '注册地址', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('258', '1', 'phone', '联系人手机号', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('259', '1', 'fact_addr', '实际经营地址', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('260', '1', 'status', '审核状态', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('261', '1', 'create_time', '创建时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('262', '1', 'verify_time', '审核时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('263', '2', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('264', '2', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('265', '2', 'cert_img', '证件图片', 'text', '0', '0', '1', '', '1', '1', '', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('266', '2', 'plate', '车牌号', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('267', '2', 'engine_num', '发动机号', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('268', '2', 'identity_num', '车辆识别代码', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('269', '2', 'brand_num', '品牌型号', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('270', '2', 'reg_time', '注册日期', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '6', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('271', '2', 'cert_time', '发证日期', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '6', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('272', '2', 'owner', '行驶证所有人', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('273', '2', 'car_type', '车辆类型', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('274', '2', 'relation', '车辆从属关系', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('275', '2', 'status', '审核状态', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('276', '2', 'create_time', '创建时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('277', '2', 'verify_time', '审核时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('399', '11', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('400', '11', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('401', '11', 'id_num', '身份证号', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('402', '11', 'name', '姓名', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('403', '11', 'id_prov', '省1', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('404', '11', 'id_city', '市1', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('405', '11', 'cert_prov', '省2', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('406', '11', 'cert_city', '市2', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('407', '11', 'cert_imgs', '资格证照片', 'text', '0', '0', '1', '', '1', '1', '', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('408', '11', 'phone', '手机号', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('409', '11', 'status', '状态', 'smallint', '4', '0', '1', '', '1', '1', '1已预约，2核查中，3真实无误，4不存在', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('410', '11', 'create_time', '提交时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('411', '11', 'verify_time', '审核时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('412', '20', 'order_id', '订单id', 'varchar', '30', '0', '1', '', '2', '1', '', '2', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('413', '20', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('414', '20', 'shop_id', '商家id', 'int', '11', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('415', '20', 'prov', '省', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('416', '20', 'city', '市', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('417', '20', 'addr', '详细地址', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('418', '20', 'up_plate', '上牌', 'smallint', '4', '0', '1', '', '1', '1', '上牌', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('419', '20', 'year_verify', '年审', 'smallint', '4', '0', '1', '', '1', '1', '年审', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('420', '20', 'transfer', '过户', 'smallint', '4', '0', '1', '', '1', '1', '过户', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('421', '20', 'car_type', '车辆类型', 'smallint', '4', '0', '1', '', '1', '1', '车辆类型', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('422', '20', 'car_quality', '车辆性质', 'smallint', '4', '0', '1', '', '1', '1', '车辆性质', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('423', '20', 'car_num', '车辆型号', 'text', '0', '0', '1', '', '1', '1', '车辆型号', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('424', '20', 'car_name', '车辆名称', 'text', '0', '0', '1', '', '1', '1', '车辆名称', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('425', '20', 'car_last', '车架号后8位', 'text', '0', '0', '1', '', '1', '1', '车架号后8位', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('426', '20', 'car_img', '车辆图片', 'text', '0', '0', '1', '', '1', '1', '车辆图片', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('427', '20', 'phone', '手机号', 'text', '0', '0', '1', '', '1', '1', '手机号', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('428', '20', 'status', '状态', 'smallint', '4', '0', '1', '1', '1', '1', '状态', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('429', '20', 'create_time', '创建时间', 'datetime', '0', '0', '2', '', '1', '1', '创建时间', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('430', '20', 'appoint_time', '预约时间', 'datetime', '0', '0', '2', '', '1', '1', '预约时间', '1', '9', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('431', '20', 'call_time1', '拨打时间1', 'datetime', '0', '0', '2', '', '1', '1', '拨打时间1', '1', '7', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('432', '20', 'call_time2', '拨打时间2', 'datetime', '0', '0', '2', '', '1', '1', '拨打时间2', '1', '7', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('433', '20', 'finish_time', '完成时间', 'datetime', '0', '0', '2', '', '1', '1', '完成时间', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('434', '13', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('435', '13', 'in_cate1', '入驻类型1', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('436', '13', 'in_cate2', '入驻类型2', 'smallint', '4', '0', '1', '', '1', '1', '1商家，2个人', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('437', '13', 'shop_name', '商家名', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('438', '13', 'bus_img', '营业执照', 'text', '0', '0', '1', '', '1', '1', '营业执照', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('439', '13', 'company_name', '公司名', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('440', '13', 'company_code', '统一信用码', 'text', '0', '0', '1', '', '1', '1', '统一信用码', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('441', '13', 'reg_addr', '注册地址', 'text', '0', '0', '1', '', '1', '1', '注册地址', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('442', '13', 'id_img1', '身份证正面', 'text', '0', '0', '1', '', '1', '1', '身份证正面', '1', '5', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('443', '13', 'id_img2', '身份证反面', 'text', '0', '0', '1', '', '1', '1', '身份证反面', '1', '5', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('444', '13', 'username', '姓名', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('445', '13', 'id_num', '身份证号', 'text', '0', '0', '1', '', '1', '1', '身份证号', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('446', '13', 'id_addr', '身份证所在地', 'text', '0', '0', '1', '', '1', '1', '身份证所在地', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('447', '13', 'up_plate', '上牌', 'text', '0', '0', '1', '', '1', '1', '上牌', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('448', '13', 'year_check', '年审', 'text', '0', '0', '1', '', '1', '1', '年审', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('449', '13', 'driver_school', '驾校', 'text', '0', '0', '1', '', '1', '1', '驾校', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('450', '13', 'cert', '从业资格证', 'text', '0', '0', '1', '', '1', '1', '从业资格证', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('451', '13', 'work_year', '从业年限', 'int', '11', '0', '1', '', '1', '1', '从业年限', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('452', '13', 'bustime_type', '经营时间类型', 'smallint', '4', '0', '1', '', '1', '1', '1全年无休，2周一到周日', '1', '2', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('453', '13', 'wd1_time', '周时间1', 'datetime', '0', '0', '1', '', '1', '1', '周时间1', '1', '7', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('454', '13', 'wd2_time', '周时间2', 'datetime', '0', '0', '1', '', '1', '1', '周时间2', '1', '7', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('455', '13', 'f1_time', '工作日时间1', 'datetime', '0', '0', '1', '', '1', '1', '工作日时间1', '1', '7', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('456', '13', 'f2_time', '工作日时间2', 'datetime', '0', '0', '1', '', '1', '1', '工作日时间2', '1', '7', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('457', '13', 'bus_phone', '业务电话', 'text', '0', '0', '1', '', '1', '1', '业务电话', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('458', '13', 'bus_imgs', '场景图片', 'text', '0', '0', '1', '', '1', '1', '场景图片', '1', '5', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('459', '13', 'deposit', '保证金', 'int', '11', '0', '1', '', '1', '1', '保证金', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('460', '13', 'achievement', '业绩', 'text', '0', '0', '1', '', '1', '1', '业绩', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('461', '13', 'bank_user', '开户名', 'text', '0', '0', '1', '', '1', '1', '开户名', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('462', '13', 'bank_prov', '开户省', 'text', '0', '0', '1', '', '1', '1', '开户省', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('463', '13', 'bank_city', '开户市', 'text', '0', '0', '1', '', '1', '1', '开户市', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('464', '13', 'bank_branch', '支行', 'text', '0', '0', '1', '', '1', '1', '支行', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('465', '13', 'bank_num', '开户账号', 'text', '0', '0', '1', '', '1', '1', '开户账号', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('466', '13', 'bank_amount', '验证金额', 'int', '11', '0', '1', '0', '1', '1', '验证金额', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('467', '13', 'purpose', '宗旨', 'text', '0', '0', '1', '', '1', '1', '宗旨', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('468', '13', 'bank_area', '开户区', 'text', '0', '0', '1', '', '1', '1', '开户区', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('469', '13', 'lng', '经度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('470', '13', 'lat', '纬度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('471', '13', 'status', '审核状态', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('472', '13', 'create_time', '创建时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('473', '13', 'verify_time', '审核时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('474', '21', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('475', '21', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('476', '21', 'order_id', '订单id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('477', '21', 'shop_id', '商家id', 'int', '11', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('478', '21', 'if_good', '好差评', 'smallint', '4', '0', '1', '1', '1', '1', '1好，2差', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('479', '21', 'content', '评论', 'text', '0', '0', '1', '', '1', '1', '评论', '1', '3', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('480', '21', 'imgs', '评论图片', 'text', '0', '0', '1', '', '1', '1', '评论图片', '1', '5', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('481', '21', 'point', '评分', 'smallint', '4', '0', '1', '', '1', '1', '评分', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('482', '21', 'tags', '标签', 'text', '0', '0', '1', '', '1', '1', '标签', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('483', '21', 'create_time', '创建时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('484', '22', 'order_id', '订单id', 'varchar', '30', '0', '1', '', '2', '1', '', '2', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('485', '22', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('486', '22', 'type', '类型', 'smallint', '4', '0', '1', '1', '1', '1', '1找，2做', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('487', '22', 'start_time', '开始时间', 'datetime', '0', '0', '1', '', '1', '1', '开始时间', '1', '8', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('488', '22', 'end_time', '截止时间', 'datetime', '0', '0', '1', '', '1', '1', '截止时间', '1', '8', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('489', '22', 'start_addr', '出发地', 'text', '0', '0', '1', '', '1', '1', '出发地', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('490', '22', 'end_addr', '目的地', 'text', '0', '0', '1', '', '1', '1', '目的地', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('491', '22', 'price', '价格', 'decimal', '11', '2', '1', '0', '1', '1', '价格', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('492', '22', 'car_type', '车型', 'smallint', '4', '0', '1', '', '1', '1', '车型', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('493', '22', 'brand', '品牌', 'smallint', '4', '0', '1', '', '1', '1', '品牌', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('494', '22', 'car_spec', '类型规格', 'smallint', '4', '0', '1', '', '1', '1', '类型规格', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('495', '22', 'car_status', '车状态', 'smallint', '4', '0', '1', '', '1', '1', '车状态', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('496', '22', 'lisence_type', '驾照类型', 'smallint', '4', '0', '1', '', '1', '1', '驾照类型', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('497', '22', 'status', '状态', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('498', '22', 'remark', '备注', 'text', '0', '0', '1', '', '1', '1', '备注', '1', '3', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('499', '22', 'create_time', '创建时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('505', '24', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('506', '24', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('507', '24', 'amount', '提现金额', 'decimal', '11', '2', '1', '', '1', '1', '提现金额', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('508', '24', 'type', '提现到', 'smallint', '4', '0', '1', '', '1', '1', '1微信', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('509', '24', 'status', '状态', 'smallint', '4', '0', '1', '1', '1', '1', '1申请中，2通过，3不通过', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('510', '24', 'create_time', '提现时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('511', '3', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('512', '3', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('513', '3', 'create_time', '签到时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('514', '5', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('515', '5', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('516', '5', 'coupon_id', '卡券id', 'int', '11', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('517', '5', 'type', '类型', 'smallint', '4', '0', '1', '', '1', '1', '1购买，2使用，3赠送', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('518', '5', 'create_time', '购买/获赠时间', 'datetime', '0', '0', '2', '', '1', '1', '购买/获赠时间', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('519', '5', 'use_time', '使用时间', 'datetime', '0', '0', '2', '', '1', '1', '使用时间', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('520', '5', 'use_num', '使用数量', 'int', '11', '0', '1', '1', '1', '1', '使用数量', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('521', '5', 'use_for', '用途', 'smallint', '4', '0', '1', '', '1', '1', '', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('522', '5', 'plate', '车牌号', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('523', '5', 'month_start', '月卡开始日', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '6', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('524', '5', 'month_end', '月卡结束日', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '6', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('525', '6', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('526', '6', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('527', '6', 'type', '类型', 'smallint', '4', '0', '1', '1', '1', '1', '1黄2蓝', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('528', '6', 'plate', '车牌号', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('529', '6', 'utc', '定位时间', 'text', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('530', '6', 'lng', '经度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('531', '6', 'lat', '纬度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('532', '6', 'addr', '详细地址', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('533', '6', 'spd', '速度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('534', '6', 'drc', '方向', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('535', '6', 'province', '省', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('536', '6', 'city', '市', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('537', '6', 'country', '区', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('538', '7', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('539', '7', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('540', '7', 'type', '类型', 'smallint', '4', '0', '1', '', '1', '1', '1有G无轨，2有G有轨，3无G无轨', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('541', '7', 'plate', '车牌号', 'text', '0', '0', '1', '', '1', '1', '', '2', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('542', '7', 'p_type', '车牌类型', 'smallint', '4', '0', '1', '', '1', '1', '1黄，2蓝', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('543', '7', 'start_time', '开始时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '6', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('544', '7', 'end_time', '结束时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '6', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('545', '7', 'create_time', '查询时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('546', '8', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('547', '8', 'lh_id', '轨迹id', 'int', '11', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('548', '8', 'lng', '经度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('549', '8', 'lat', '纬度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('550', '8', 'spd', 'GPS速度', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('551', '8', 'gtm', 'GPS时间', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('552', '8', 'mlg', '里程', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('553', '8', 'hgt', '海拔', 'int', '11', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('554', '8', 'agl', '正北方向夹角', 'int', '11', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('555', '8', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('556', '10', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('557', '10', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('558', '10', 'plate', '车牌号', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('559', '10', 'type', '类型', 'smallint', '4', '0', '1', '1', '1', '1', '1黄，2红', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('560', '10', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('561', '18', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '1', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('562', '18', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('563', '18', 'shop_id', '商家id', 'int', '11', '0', '1', '', '1', '1', '', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('564', '18', 'type', '类型', 'smallint', '4', '0', '1', '', '1', '1', '1点赞，2浏览', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('565', '18', 'create_time', '创建时间', 'datetime', '0', '0', '1', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('566', '19', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('567', '19', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('568', '19', 'content', '内容', 'text', '0', '0', '1', '', '1', '1', '', '1', '3', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('569', '19', 'status', '状态', 'smallint', '4', '0', '1', '1', '1', '1', '1待处理，2处理中，3已完成', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('570', '19', 'create_time', '创建时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '2', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('571', '19', 'verify_time', '处理时间', 'datetime', '0', '0', '2', '', '1', '1', '', '1', '9', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('572', '23', 'id', 'id', 'int', '11', '0', '1', '', '2', '2', '', '1', '10', '1', 'desc', '1');
INSERT INTO `genecode_detail` VALUES ('573', '23', 'openid', '用户id', 'text', '0', '0', '1', '', '1', '1', '', '1', '10', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('574', '23', 'amount', '金额', 'decimal', '11', '2', '1', '', '1', '1', '金额', '1', '1', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('575', '23', 'type', '类型', 'smallint', '4', '0', '1', '', '1', '1', '1微信', '1', '2', '1', 'desc', '2');
INSERT INTO `genecode_detail` VALUES ('576', '23', 'create_time', '充值时间', 'datetime', '0', '0', '1', '', '1', '1', '充值时间', '1', '9', '2', 'desc', '2');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` varchar(22) NOT NULL,
  `openid` varchar(30) NOT NULL,
  `amount` decimal(11,2) DEFAULT '0.00' COMMENT '订单总额',
  `status` smallint(4) DEFAULT '1' COMMENT '1已锁定/待处理，2已失效，3成功办理/已审批，4已完成，5已取消',
  `create_time` datetime DEFAULT NULL COMMENT '锁定时间',
  `is_deleted` smallint(4) DEFAULT '1' COMMENT '1未删除，2已删除',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` text NOT NULL,
  `nickname` text NOT NULL,
  `username` text COMMENT '姓名',
  `avatar` text,
  `phone` text COMMENT '联系号码',
  `gender` smallint(4) DEFAULT '1' COMMENT '1男，2女',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'oHngi1KZ_EYPrR6E6XHyv58Oh7Cs', 'William口口口', '王大魏', 'http://thirdwx.qlogo.cn/mmopen/vi_32/MOJA35HuZlF7rLwoglv7AicDhuXjay5O8TX3rAeA9paDVYiaR9RqJ1Ndul8KyLIzDKSKjO8sicoPX0KaA0OHyYP5w/132', '13922078713', '1', '2020-05-29 23:53:29');
