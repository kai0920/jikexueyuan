<?php

date_default_timezone_set('Asia/Shanghai');
error_reporting(0);
ini_set( 'display_errors', 'Off' );
header("Content-type:application/json;charset=utf-8");

$start_time = microtime(true);

$output = array(//输出数据
	'errno' => 1,
	'errmsg' => 'success',
);

try {
	$mysqli = new mysqli("127.0.0.1", "root", "root", "test");// 创建连接
	if ($mysqli->connect_error) {// 检测连接
	    throw new Exception('数据库连接失败',-100);
	}

	$mysqli->query("set names utf8");

	$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';//操作

	$action_list = array('news_save','news_delete','get_news_list');

	if(empty($action) || !in_array($action,$action_list)){
		throw new Exception('action参数错误',-101);	
	}

	$cur_time = time();//当前时间戳

	if($action == 'news_save'){//添加或者修改新闻

		$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;//新闻id
		$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : 0;//新闻分类
		$title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';//新闻标题
		$content = isset($_REQUEST['content']) ? htmlspecialchars($_REQUEST['content']) : '';//新闻内容
		$image = isset($_REQUEST['image']) ? $_REQUEST['image'] : '';//新闻图片
		$source = isset($_REQUEST['source']) ? $_REQUEST['source'] : '';//新闻来源
		$publish_time = !empty($_REQUEST['publish_time']) ? strtotime($_REQUEST['publish_time']) : time();//新闻发布时间

		if(empty($type)){
			throw new Exception('新闻分类不能为空',-101);
		}

		if(empty($title)){
			throw new Exception('新闻标题不能为空',-102);
		}

		$title = $mysqli->real_escape_string($title);
		$content = $mysqli->real_escape_string($content);
		$image = $mysqli->real_escape_string($image);
		$source = $mysqli->real_escape_string($source);

		if($id){
			$sql = "update news set type={$type},title='{$title}',content='{$content}',image='{$image}',source='{$source}',publish_time={$publish_time},update_time={$cur_time} where id = {$id} limit 1";
		}else{
			$sql = "insert into news (type,title,content,image,source,publish_time,update_time) values ({$type},'{$title}','{$content}','{$image}','{$source}',{$publish_time},{$cur_time})";
		}

		$result = $mysqli->query($sql);
		$affected_rows = $mysqli->affected_rows;//受影响行数
		if(!$affected_rows){
			throw new Exception("保存失败",-111);
		}

	}elseif($action == 'news_delete'){//删除新闻

		$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;//新闻id
		if(empty($id)){
			throw new Exception('参数错误',-102);
		}

		$sql = "delete from news where id = {$id}";
		$mysqli->query($sql);
		$affected_rows = $mysqli->affected_rows;//受影响行数
		if($affected_rows <= 0){
			throw new Exception("删除失败",-112);
		}
		
	}elseif($action == 'get_news_list'){

		$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : 0;//新闻分类
		if(empty($type)){
			throw new Exception("参数错误", -102);
		}

		$sql = "select * from news where type = {$type} order by publish_time desc";
		$result = $mysqli->query($sql);
		$rows = array();
		while($row = $result->fetch_assoc()){
			$row['content'] = htmlspecialchars_decode($row['content']);
			$row['publish_time'] = date("Y/m/d H:i",$row['publish_time']);
			if(strlen($row['image']) > 50 ){
				$row['image'] = substr($row['image'], 0,50).'...';
			}
			$rows[] = $row;
		}
		$output['news_list'] = $rows;

	}
	
} catch (Exception $e) {
	$output['errno'] = $e->getCode();
	$output['errmsg'] = $e->getMessage();
}

$end_time = microtime(true);
$cost_time = $end_time - $start_time;
$output['cost_time'] = $cost_time;

echo json_encode($output);