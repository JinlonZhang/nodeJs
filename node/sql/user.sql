-- Created by xiaogang on 2017/4/7.

-- DROP TABLE userinfo;
CREATE TABLE `userinfo` (
      `id` int(16) NOT NULL AUTO_INCREMENT,  -- 自增
      `name` varchar(32) NOT NULL  unique ,  -- 唯一性约束
      `password` varchar(32) NOT NULL,
			`phone` VARCHAR(16) NOT NULL DEFAULT '',
			`date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
);
show TABLES;