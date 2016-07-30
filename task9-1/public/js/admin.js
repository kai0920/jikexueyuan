$(function() {

    //新闻分类框change事件
    $('#news_type').on('change', function() {
        news_type = $(this).val();
        window.location.href = "/admin?type=" + news_type;
    });


    //添加新闻
    $(".news_add").on("click", function() {
        var news_type = $("#news_type").val();
        window.location.href = "/admin/news/add?type=" + news_type;
    });


    //修改和删除新闻
    $("#news_list").delegate(".news_edit", "click", function() { //修改新闻

        var id = $(this).parent().siblings().eq(0).text();
        window.location.href = "/admin/news/edit?id=" + id;

    }).delegate(".news_del", "click", function() { //删除新闻

        if (confirm("确定要删除吗？")) {
            var id = $(this).parent().siblings().eq(0).text();
            var news_type = $(this).parent().siblings().eq(1).text();

            $.ajax({
                url: '/api/news/remove',
                data: "id=" + id,
                dataType: 'json',
                success: function(data) {
                    if (data.errno == 1) {
                        alert('删除成功');
                        window.location.href = "/admin?type=" + news_type;
                    } else {
                        alert(data.errmsg);
                    }
                }
            });
        }

    });


    //保存新闻
    $(".news_save").on('click', function() {
        var news_type = $("#type").val();
        $.ajax({
            url: '/api/news/save',
            type: 'post',
            data: $("#news_form").serialize(),
            dataType: 'json',
            success: function(data) {
                if (data.errno == 1) {
                    alert('保存成功');
                    window.location.href = "/admin?type=" + news_type;
                } else {
                    alert(data.errmsg);
                }
            }
        });
    });

    //取消 返回主界面
    $(".news_cancel").on('click', function() {
        var news_type = $("#type").val();
        window.location.href = "/admin?type=" + news_type;
    });

});
