-- Created by xiaogang on 2017/4/18.

DROP TABLE userlogo;
CREATE TABLE `userlogo` (
                  `id` int(16) NOT NULL AUTO_INCREMENT,  -- 自增
                  `username` varchar(32) NOT NULL,  -- 唯一性约束
                  `path` varchar(128) NOT NULL,
                    `type` varchar(16) NOT NULL,
                    `filename` VARCHAR(64) NOT NULL,
                  `originalname` VARCHAR(64) NOT NULL DEFAULT '',
                  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   PRIMARY KEY (`id`)
            );
            show TABLES;