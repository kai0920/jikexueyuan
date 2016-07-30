

$(function(){



	var news_type = 1;

	function get_news_type_option(){
		var news_type_list = {"1":"推荐","2":"百家","3":"本地","4":"图片","5":"娱乐","6":"社会","7":"军事","8":"女人","9":"搞笑","10":"科技"};//新闻分类list
		var $news_type_list = '';
		$.each(news_type_list,function(key,value){
			if(key == news_type){
				$news_type_list += '<option value="'+key+'" selected>'+value+'</option>';
			}else{
				$news_type_list += '<option value="'+key+'">'+value+'</option>';	
			}
			
		});
	
		return $news_type_list;
	}


	function get_news_list(){
		var news_type = $('#news_type').val();
		$.ajax({
			url:'api.php',
			data:'action=get_news_list&type='+news_type,
			dataType:'json',
			success:function(data){
				var html = '';
				html += '<thead>';
				var thead_list = {"id":"编号","type":"分类","title":"标题","content":"内容","image":"图片","source":"来源","publish_time":"发布时间"};
				for(var key in thead_list){
					html += '<th style="min-width:100px;">'+thead_list[key]+'</th>';
				}
				html += '<th>操作</th>';
				html += '</thead>';
				var news_list = data.news_list;
				html += '<tbody>';
				for(var i =0;i<news_list.length;i++){
					html += '<tr>';
					for(var key in news_list[i]){
						//console.log(key+':'+news_list[i][key]);
						if(key == 'update_time'){
							continue;
						}
						html += '<td>'+news_list[i][key]+'</td>';
					}
					html += '<td><input type="button" class="btn btn-primary news_update" value="修改">&nbsp;&nbsp;<input type="button" class="btn btn-primary news_del" value="删除"></td>';
					html += '</tr>';
				}
				html += '</tbody>';
				$('#news_list').html(html);
			}
		});
	}

	$('#news_type').on('change',function(){
		news_type = $(this).val();
		console.log(news_type);
		get_news_list();
	});


	$('.news_add').on('click',function(){//添加新闻

		$('.modal-title').html('添加新闻');

		var html = '<form action="api.php" id="news_form" method="post" class="form-horizontal">';
		html += '<div class="form-group"><label for="type" class="col-sm-2 control-label">分类</label><div class="col-sm-10"><select class="form-control" name="type" id="type">'+get_news_type_option()+'</select></div></div>';
		html += '<div class="form-group"><label for="title" class="col-sm-2 control-label">标题</label><div class="col-sm-10"><input type="text" class="form-control" name="title" id="title"></div></div>';
		html += '<div class="form-group"><label for="content" class="col-sm-2 control-label">内容</label><div class="col-sm-10"><textarea class="form-control" rows="3" name="content" id="content"></textarea></div></div>';
		html += '<div class="form-group"><label for="image" class="col-sm-2 control-label">图片</label><div class="col-sm-10"><input type="text" class="form-control" name="image" id="image"></div></div>';
		html += '<div class="form-group"><label for="source" class="col-sm-2 control-label">来源</label><div class="col-sm-10"><input type="text" class="form-control" name="source" id="source"></div></div>';
		html += '</form>';

		$('.modal-body .container-fluid').html(html);

		$('#myModal').modal('show');
	});

	$('.news_save').on('click',function(){//保存新闻
		
		var params = 'action=news_save&type='+$('#type').val()+'&title='+$('#title').val()+'&content='+$('#content').val()+'&image='+$('#image').val()+'&source='+$('#source').val();
		if($('#id').val()){
			params += "&id="+$('#id').val();
		}
		if($('#publish_time').val()){
			params += "&publish_time="+$('#publish_time').val();
		}
		
		$.ajax({
			url:'api.php',
			data:params,
			dataType:'json',
			success:function(data){
				if(data.errno == 1){
					alert('保存成功');
					//window.location.reload();
					$('#myModal').modal('hide');
					get_news_list();
				}else{
					alert(data.errmsg);
				}
			}
		});

	});



	$("#news_list").delegate(".news_update","click",function(){//修改新闻

		var id = $(this).parent().siblings().eq(0).text();
		var type = $(this).parent().siblings().eq(1).text();
		var title = $(this).parent().siblings().eq(2).text();
		var content = $(this).parent().siblings().eq(3).text();
		var image = $(this).parent().siblings().eq(4).text();
		var source = $(this).parent().siblings().eq(5).text();
		var publish_time = $(this).parent().siblings().eq(6).text();

		news_type = type;

		$('.modal-title').html('修改新闻');

		var html = '<form action="api.php" id="news_form" method="post" class="form-horizontal">';
		html += '<div class="form-group"><label for="type" class="col-sm-2 control-label">分类</label><div class="col-sm-10"><select class="form-control" name="type" id="type">'+get_news_type_option()+'</select></div></div>';
		html += '<div class="form-group"><label for="title" class="col-sm-2 control-label">标题</label><div class="col-sm-10"><input type="text" class="form-control" name="title" id="title" value="'+title+'"></div></div>';
		html += '<div class="form-group"><label for="content" class="col-sm-2 control-label">内容</label><div class="col-sm-10"><textarea class="form-control" rows="3" name="content" id="content">'+content+'</textarea></div></div>';
		html += '<div class="form-group"><label for="image" class="col-sm-2 control-label">图片</label><div class="col-sm-10"><input type="text" class="form-control" name="image" id="image" value="'+image+'"></div></div>';
		html += '<div class="form-group"><label for="source" class="col-sm-2 control-label">来源</label><div class="col-sm-10"><input type="text" class="form-control" name="source" id="source" value="'+source+'"></div></div>';
		html += '<div class="form-group"><label for="publish_time" class="col-sm-2 control-label">发布时间</label><div class="col-sm-10"><input type="datetime" class="form-control" name="publish_time" id="publish_time" value="'+publish_time+'"></div></div>';
		html += '<input type="hidden" id="id" value="'+id+'">';
		html += '</form>';

		$('.modal-body .container-fluid').html(html);

		$('#myModal').modal('show');

	}).delegate(".news_del","click",function(){//删除新闻

		if(confirm("确定要删除吗？")){
			var id = $(this).parent().siblings().eq(0).text();

			$.ajax({
				url:'api.php',
				data:"action=news_delete&id="+id,
				dataType:'json',
				success:function(data){
					if(data.errno == 1){
						alert('删除成功');
						//window.location.reload();
						get_news_list();
					}else{
						alert(data.errmsg);
					}
				}
			});
		}

	});

	$('#news_type').html(get_news_type_option());

	get_news_list();

});