require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-1.9.1.min'
    }
});

require(['jquery'], function($) {


    //从后台加载新闻分类数据
    $(".menu-item").each(function() {
        var news_type = $(this).attr('data-type');
        $(this).click(function() {
            $.ajax({
                url: '/api/news/list',
                data: 'type=' + news_type,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    if (data.errno != 1) {
                        alert(data.errmsg);
                    }

                    var news_list = data.news_list;

                    var html = '';
                    for (var i = 0; i < news_list.length; i++) {
                        html += '<div class="list-item">';
                        if (news_list[i]['image']) {
                            html += '<div class="list-image">';
                            html += '<i class="video-play"></i>';
                            html += '<img src="' + news_list[i]['image'] + '">';
                            html += '</div>';
                        }
                        html += '<div class="list-text">';
                        html += '<div class="text-title">';
                        html += '<span>' + news_list[i]['title'] + '</span>';
                        html += '</div>';
                        html += '<div class="text-abs">' + news_list[i]['content'] + '</div>';
                        html += '</div>';
                        html += '<div class="list-btm">';
                        html += '<div class="btm-box">';
                        if (news_list[i]['source']) {
                            html += '<span class="btm-btn">' + news_list[i]['source'] + '</span>';
                        }
                        html += '<span>' + news_list[i]['publish_time'] + '</span>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                    }

                    $('.index-list').html(html);
                }
            });
        });
    });
    //end


    // 导航部分
    $(".menu li").each(function() {
        $(this).click(function() {
            $(".first").removeClass("first");
            $(this).find(".cur").addClass("first");
        })
    })
    // ends


    // 轮播图
    var curIndex = 0;
    var imageNum = 2;

    var autoChange = setInterval(function() {
        if (curIndex < imageNum) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        changeTo(curIndex);
    }, 2500);

    function changeTo(num) {
        var imgWidth = document.documentElement.clientWidth - 20;
        var goLeft = "-" + num * imgWidth + "px";
        $(".topic-gallery .wrapper").css({
            "transform": "translateX(" + goLeft + ")",
            "-webkit-transition-property": "transform",
            "-webkit-transition-duration": "1s"
        })
        $(".slidder-icons i").removeClass("blue").eq(num).addClass("blue");
    }
    // ends


    // 热点轮播
    var hotIndex = 0;
    var topicNum = $(".hot-content li").length;

    var autoChangeB = setInterval(function() {
        if (hotIndex < topicNum - 1) {
            hotIndex++;
        } else {
            hotIndex = 0;
        }
        changeToB(hotIndex);
    }, 2500);


    function changeToB(num) {
        var goTop = "-" + num * 28 + "px";
        $(".hot-content").css({
            "transform": "translateY(" + goTop + ")",
            "-webkit-transition-property": "transform",
            "-webkit-transition-duration": "1s"
        })
    }
    // ends

});
