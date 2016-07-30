-- MySQL dump 10.13  Distrib 5.5.40, for Win32 (x86)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.5.40

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) DEFAULT NULL COMMENT '新闻类型',
  `title` varchar(255) DEFAULT NULL COMMENT '新闻标题',
  `content` text COMMENT '新闻类容',
  `image` varchar(255) DEFAULT NULL COMMENT '新闻图片',
  `source` varchar(255) DEFAULT NULL COMMENT '新闻来源',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '新闻更新时间',
  `publish_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COMMENT='新闻表';

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
INSERT INTO `news` VALUES (31,3,'北京市养老金上调9月底前落实到位 从今年1月起补发','北京市将于9月底前把今年增加的养老金发放到位，并从今年1月起补发。','','',1468329522,1468329522),(32,3,'北京一乡书记受贿近6000万 澳门赌博输1500万','他三次与纪海义前往澳门赌博，3次为纪海义支付赌资共计1800万元港币。','','',1468329544,1468329544),(68,1,'《快手枪手快枪手》沈阳路演 林更新回家','动作喜剧电影《快手枪手快枪手》已于7月15日全国上映。上映当日，《快手枪手快枪手》路演来到沈阳...','http://t11.baidu.com/it/u=http://p2.cri.cn/M00/61/39/CqgNOleJ13eAVohKAAAAAAAAAAA964.800x534.jpg&fm=36','',1468659665,1468659665),(69,1,'经习近平和中央军委批准 中国军队工作组赶赴南苏丹','工作组将传达习主席和军委领导指示，看望慰问中国维和部队官兵，现地指导部队加强安全防卫，协调处理...','http://c.hiphotos.baidu.com/news/q=100/sign=0f539469183853438acf8321a312b01f/f2deb48f8c5494eeca66681c25f5e0fe99257e6a.jpg','置顶',1468664492,1468659900),(64,2,'逆天的腾讯音乐集团出世了，这几点八卦你看懂了吗？','不出意外，今天，腾讯发公告了，于是乎，像八姐昨天所说的，逆天的腾讯音乐托拉斯诞生了，前一段时间...','http://t11.baidu.com/it/u=http://h.hiphotos.baidu.com/news/crop%3D17%2C1%2C564%2C338%3Bw%3D638/sign=71aec8b798529822117c6383eafb4ce7/b64543a98226cffc299a4bc2b1014a90f603ea0a.jpg&fm=36','',1468658022,1468658022),(12,8,'习近平2016年上半年调研凸显改革创新两大主线1234','习近平2016年上半年调研凸显改革创新两大主线1234','','',1468667500,1468668600),(13,9,'习近平2016年上半年调研凸显改革创新两大主线','习近平2016年上半年调研凸显改革创新两大主线','','',1468286732,0),(14,10,'习近平2016年上半年调研凸显改革创新两大主线','习近平2016年上半年调研凸显改革创新两大主线','','',1468286735,0),(67,1,'专题：土耳其政变60人丧生 754人被捕','土耳其总统埃尔多安通过手机和CNN当地的电视台进行了视频通话。','http://g.hiphotos.baidu.com/news/q%3D100/sign=4cbaa34d43fbfbedda59327f48f0f78e/03087bf40ad162d9e4c6506e19dfa9ec8a13cd93.jpg','热点',1468659631,1468659600),(65,2,'是谁害了快播？或是服务器标准！','写在前面：不论是正面看，还是反面看，快播恐怕都会留下浓重一笔。一家快播公司，被刑事案件和行政处...','http://t11.baidu.com/it/u=http://a.hiphotos.baidu.com/news/crop%3D0%2C1%2C438%2C263%3Bw%3D638/sign=87fee0af7ec6a7efad69f266c0ca8360/1ad5ad6eddc451dae124499bbefd5266d11632eb.jpg&fm=36','',1468659500,1468659500),(66,2,'杠上了！百余名硅谷人士联名反对特朗普竞选总统','硅谷科技人士从未隐藏过他们对唐纳德·特朗普的厌恶。本周四，他们的厌恶升级了。145 位技术企业...','http://t11.baidu.com/it/u=http://d.hiphotos.baidu.com/news/crop%3D23%2C1%2C446%2C268%3Bw%3D638/sign=236fdfac5ce736d14c5cd648a6627cee/f31fbe096b63f624f001a8738f44ebf81a4ca366.jpg&fm=36','',1468659538,1468659538),(70,5,'《三时三餐》小鸭子出生 收视亦小幅上升','今日（7月16日），据尼尔森韩国的收视率调查结果，tvN综艺节目《三时三餐》“高敞篇”昨晚播出...','http://t12.baidu.com/it/u=http://img.y3600.com/d/file/p/2016/07/16/ffb67ed79a0f323baef2c02e193a384c.jpg&fm=36','',1468659879,1468659840),(71,5,'曹格又来秀恩爱，不过娇妻这话说的有点狠','曹格分享的字条上写着，妈妈说：你结婚后流的汗和泪都是当年选老公时脑子进的水。','http://t12.baidu.com/it/u=http://img1.gtimg.com/ent/pics/hv1/21/175/2099/136532121.jpg&fm=36','',1468659909,1468659909),(72,4,'土耳其军变 新总统府被战机轰炸画面','当地时间15日晚，土耳其部分军官发动军事政变，坦克飞机均出动，总统府附近发生交火。','http://timg01.baidu-img.cn/timg?tc&size=b613_345&sec=0&quality=100&cut_x=13&cut_y=0&cut_h=0&cut_w=613&di=01f8a16593313e315740e6d7f02a45af&src=http://t10.baidu.com/it/u=http://img3.cache.netease.com/photo/0001/2016-07-16/BS3KCVDJ00AO0001.jpg&fm=94','',1468661859,1468660200);
UNLOCK TABLES;


-- Dump completed on 2016-07-16 20:29:28
