module.exports = function(app){

	var mysql = require('mysql');

	var connection = mysql.createConnection({
	  host     : '127.0.0.1',
	  user     : 'root',             
	  password : 'root',      
	  port: '3306',                  
	  database: 'test',
	});
	connection.connect();//连接mysql


	var news_type_list = {"1":"推荐","2":"百家","3":"本地","4":"图片","5":"娱乐","6":"社会","7":"军事","8":"女人","9":"搞笑","10":"科技"};//新闻分类list

	app.get('/',function(req,res){//首页
		res.render("index");
	});


	app.get('/admin',function(req,res){//后台首页
		var news_type = req.query.type || 1;
		var sql = "select * from news where type = "+news_type+" order by update_time desc";
		connection.query(sql,function (err, rows) {
	        if(err) throw err;
	 		for(var i = 0;i<rows.length;i++){
	 			//{处理发布时间
	 			var publish_time = (rows[i]['publish_time'])*1000;
	 			var date = new Date(publish_time);
				Y = date.getFullYear() + '-';
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				D = date.getDate() + ' ';
				h = date.getHours() + ':';
				m = date.getMinutes();
				publish_time = Y+M+D+h+m;
				rows[i]['publish_time'] = publish_time;
				//
				if(rows[i]['image'].length > 50){
					rows[i]['image'] = rows[i]['image'].substr(0,50) + "...";
				}
	 		}

	 		res.render("admin",{"news_type_list":news_type_list,"news_type":news_type,"news_list":rows});
		});
	});


	app.get('/admin/news/add',function(req,res){//后台新闻添加页面
		var type = req.query.type || 0;
		res.render("news_add",{"news_type_list":news_type_list,"news_type":type});
	});


	app.get('/admin/news/edit',function(req,res){//后台新闻修改页面
		var news_id = req.query.id || 0;
		var sql = "select * from news where id = "+news_id+" limit 1";
		connection.query(sql,function (err, rows) {
	        if(err) throw err;
	        news = rows[0];
	     	var publish_time = (news['publish_time'])*1000;
			var date = new Date(publish_time);
			Y = date.getFullYear() + '-';
			M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			D = date.getDate() + ' ';
			h = date.getHours() + ':';
			m = date.getMinutes();
			publish_time = Y+M+D+h+m;
			news['publish_time'] = publish_time;
	 		res.render("news_edit",{"news_type_list":news_type_list,"news_id":news_id,"news":news});
		});
	});


	app.post('/api/news/save',function(req,res){//保存新闻
		var output = {"errno":1,"errmsg":"success"};
		timestamp = Date.parse(new Date())/1000;
		var id = req.body.id || 0;
		var type = req.body.type || 0;
		var title = req.body.title || "";
		var content = req.body.content || "";
		var image = decodeURIComponent(req.body.image) || "";
		var source = req.body.source || "";
		var publish_time = (Date.parse(new Date(req.body.publish_time))/1000) || timestamp;

		console.log(req.body,id,type,title,content,image,source,publish_time);

		if(!type){
		 	output.errno = -101;
			output.errmsg = "新闻分类不能为空";
			res.json(output);
			return;
		}

		if(!title){
		 	output.errno = -102;
			output.errmsg = "新闻标题不能为空";
			res.json(output);
			return;
		}

		if(id > 0){
			var sql = "update news set type="+type+",title='"+title+"',content='"+content+"',image='"+image+"',source='"+source+"',publish_time="+publish_time+",update_time="+timestamp+" where id = "+id+" limit 1";
		}else{
			var sql = "insert into news (type,title,content,image,source,publish_time,update_time) values ("+type+",'"+title+"','"+content+"','"+image+"','"+source+"',"+publish_time+","+timestamp+")";
		}
		console.log(sql);
		connection.query(sql,function (err, result) {
	        if(err) throw err;
	        var affectedRows = result.affectedRows;
	 		if(affectedRows <= 0){
	 			output.errno = -111;
	 			output.errmsg = "保存失败";
	 		}
	 		res.json(output);
		});
	});


	app.get('/api/news/remove',function(req,res){//删除新闻
		var output = {"errno":1,"errmsg":"success"};
		var id = req.query.id || 0;
		if(id == 0){
			output.errno = -101;
			output.errmsg = "id不能为空";
			res.json(output);
			return;
		}

		var sql = "delete from news where id = "+id;
		connection.query(sql,function (err, result) {
	        if(err) throw err;
	 		var affectedRows = result.affectedRows;
	 		if(affectedRows <= 0){
	 			output.errno = -111;
	 			output.errmsg = "删除失败";
	 		}
	 		res.json(output);
		});
	});


	app.get('/api/news/list',function(req,res){//获取新闻列表
		var output = {"errno":1,"errmsg":"success"};
		var type = req.query.type || 1;
		var sql = "select * from news where type = "+type+" order by update_time desc";
		connection.query(sql,function (err, rows) {
	        if(err) throw err;
	        for(var i = 0;i<rows.length;i++){
	 			var publish_time = (rows[i]['publish_time'])*1000;
	 			var date = new Date(publish_time);
				Y = date.getFullYear() + '-';
				M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				D = date.getDate() + ' ';
				h = date.getHours() + ':';
				m = date.getMinutes();
				publish_time = Y+M+D+h+m;
				rows[i]['publish_time'] = publish_time;
	 		}
	        output.news_list = rows;
	 		res.json(output);
		});
	});

};