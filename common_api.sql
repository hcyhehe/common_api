/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : common_api

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2020-07-06 00:10:19
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
INSERT INTO `admin` VALUES ('1', 'admin', '4297f44b13955235245b2497399d7a93', '2', null, '2020-05-23 01:03:47', '2020-07-05 21:36:07', '127.0.0.1');
INSERT INTO `admin` VALUES ('8', 'admin2', 'c4ca4238a0b923820dcc509a6f75849b', '1', null, '2020-05-24 00:41:26', null, null);
INSERT INTO `admin` VALUES ('9', 'admin3', '4297f44b13955235245b2497399d7a93', '1', null, '2020-06-27 17:26:52', '2020-06-27 22:24:16', '127.0.0.1');

-- ----------------------------
-- Table structure for `base`
-- ----------------------------
DROP TABLE IF EXISTS `base`;
CREATE TABLE `base` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COMMENT '项目名',
  `port` text COMMENT '端口',
  `akey` text COMMENT 'Admin密钥',
  `hkey` text COMMENT 'H5密钥',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of base
-- ----------------------------

-- ----------------------------
-- Table structure for `genecode`
-- ----------------------------
DROP TABLE IF EXISTS `genecode`;
CREATE TABLE `genecode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COMMENT '数据表名',
  `icon` text COMMENT '模块图标',
  `sort` smallint(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of genecode
-- ----------------------------
INSERT INTO `genecode` VALUES ('2', 'aaa2', 'people', '1', '2020-07-05 22:43:13');
INSERT INTO `genecode` VALUES ('3', 'ccc', 'wechat', '3', '2020-07-05 22:49:08');

-- ----------------------------
-- Table structure for `genecode_detail`
-- ----------------------------
DROP TABLE IF EXISTS `genecode_detail`;
CREATE TABLE `genecode_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `g_id` int(11) NOT NULL,
  `name` text COMMENT '字段名',
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of genecode_detail
-- ----------------------------
INSERT INTO `genecode_detail` VALUES ('4', '3', 'asd11', 'decimal', '2', '2', '2', '22', '2', '2', 'qeweeddd11', '2', '4', '2', 'asc');
INSERT INTO `genecode_detail` VALUES ('5', '3', 'wrwer11', 'varchar', '12', '0', '2', '333', '1', '1', 'hhh11', '2', '5', '1', 'desc');
INSERT INTO `genecode_detail` VALUES ('6', '3', 'eeewww', 'text', '5', '0', '2', '333', '1', '1', '34314', '1', '1', '1', 'desc');
INSERT INTO `genecode_detail` VALUES ('7', '2', 'bbb2', 'varchar', '12', '0', '2', '1', '1', '1', 'qweqwe2', '2', '2', '2', 'desc');

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
