/**
 * 更多产品鼠标hover事件
 */
$("#product").mouseover(function() {
    var _height = $(window).height();
    $("#product-list").css({ 'height': _height, "overflow": 'auto' });
    $("#product-list").show();
    $(this).hide();
});

//更多产品鼠标离开时间
$("#product-list").mouseleave(function() {
    $(this).hide();
    $("#product").show();
});

var storage_menu_key = 's_menu_index'; //标签切换索引

/**
 * 标签切换事件
 */
$('.s-menu-item').hover(function() {
    $(this).css({ 'background-color': '#B3B6BB', 'color': '#fff' });
}, function() {
    $(this).css({ 'background': '', 'color': '' });
}).click(function() {
    $(this).unbind('mouseenter').unbind('mouseleave'); //解除绑定hover事件

    var index = $(this).index();
    $('.s-content-item').hide();
    $(".s-content-" + index).show();
    $(this).css({ 'background-color': '#9A9DA2', 'color': '#fff' });
    $(this).siblings().css({ 'background-color': '', 'color': '' });
    $(this).find('.mine-icon').css('background-position', '-144px 0');
    $(this).siblings().find('.mine-icon').css('background-position', '-15px 0');

    if (window.localStorage) {
        window.localStorage.setItem(storage_menu_key, index);
    }
});

var skin_preview_value = ''; //皮肤预览值
var $skin_preview = $("#s_skin_preview_skin"); //皮肤预览DOM
var storage_bgimg_key = "bg_img_index"; //背景图片索引

var background_image_arr = {
    "0":__uri("../images/skin-bg-0.jpg"),
    "1":__uri("../images/skin-bg-1.jpg"),
    "2":__uri("../images/skin-bg-2.jpg"),
    "3":__uri("../images/skin-bg-3.jpg"),
    "4":__uri("../images/skin-bg-4.jpg"),
    "5":__uri("../images/skin-bg-5.jpg"),
    "6":__uri("../images/skin-bg-6.jpg"),
    "7":__uri("../images/skin-bg-7.jpg"),
    "8":__uri("../images/skin-bg-8.jpg"),
    "9":__uri("../images/skin-bg-9.jpg"),
    "10":__uri("../images/skin-bg-10.jpg"),
    "11":__uri("../images/skin-bg-11.jpg"),
};

/**
 * 设置body背景图片
 * @param img_index 图片索引
 */
function set_body_background(img_index) {
    var background_image = background_image_arr[parseInt(img_index)];
    var background = { "background-image": "url(" + background_image + ")", "background-size": "100%", "background-attachment": "fixed" };
    $('body').css(background); //给body设置背景图片
}

/**
 * 设置body背景透明度
 * @param img_index 图片索引
 */
function set_body_opacity(opacity) {
    $('body').css('opacity',opacity); //给body设置背景图片
}

//移除body背景颜色
function remove_body_background() {
    $('body').css({ "background-image": "" });
}

/**
 * 皮肤选中状态
 * @param  {[type]} img_index [description]
 * @return {[type]}           [description]
 */
function set_choose_skin_img(img_index) {
    $('.skin-img-item').each(function() {
        if ($(this).attr('data-index') == img_index) {
            $(this).find('.skin-bg-png24-icon').addClass('skin-img-item-choose'); //添加选中状态
            var img_src = $(this).find('.skin-img-item-img').attr('src'); //图片的url
            skin_preview_value = img_src;
        } else {
            $(this).find('.skin-bg-png24-icon').removeClass('skin-img-item-choose'); //移除所有选中状态
        }
    });
}

/**
 * 移除皮肤选中状态
 * @return {[type]} [description]
 */
function remove_choose_skin_img() {
    $('.skin-bg-png24-icon').removeClass('skin-img-item-choose'); //移除所有选中状态
}

/**
 * 设置预览区图片
 * @param {[type]} img_index [description]
 */
function set_skin_preview(img_index) {
    var img_src = $('.skin-img-item-img').eq(img_index).attr('src');
    $skin_preview.attr('src', img_src);
}

/**
 * 移除预览区图片
 * @return {[type]} [description]
 */
function remove_skin_preview() {
    $skin_preview.removeAttr('src');
}


/**
 * 换肤 皮肤列表点击 hover事件
 */
$('.skin-img-item').hover(function() {
    var img_index = $(this).attr('data-index'); //图片的索引
    set_skin_preview(img_index);
}, function() {
    if (skin_preview_value) {
        $skin_preview.attr('src', skin_preview_value);
    } else {
        $skin_preview.removeAttr('src');
    }
}).click(function() { //点击操作
    $(this).unbind('mouseenter').unbind('mouseleave'); //解除绑定hover事件

    var img_index = $(this).attr('data-index'); //图片的索引

    $('.s-skin-set').show();
    $('.bg-hideOrShowAjax').css('visibility', 'visible');
    $('#s_lg_img').attr('src', __uri("../images/logo_white.png")); //更换百度背景图片
    $('#header').css('background-color', "transparent") //更换导航栏背景为透明
    $('#header').css('border-bottom-color', "transparent"); //更换导航栏下边框为透明

    set_skin_preview(img_index);
    set_choose_skin_img(img_index);
    set_body_background(img_index);
    if (window.localStorage) {
        window.localStorage.setItem(storage_bgimg_key, img_index);
    }
});

//皮肤展开操作
$(".s-skin").bind('click',function(event) {
    $('#s_skin_layer').show();
    event.stopPropagation();    //  阻止事件冒泡
});

//皮肤收起操作
$('.s-skin-up').on('click',function(){
    $('#s_skin_layer').hide();
    event.stopPropagation();
});

//皮肤展开操作
$("#s_skin_layer").bind('click',function(event) {
    $('#s_skin_layer').show();
     event.stopPropagation();    //  阻止事件冒泡
});

//皮肤收起操作
$('body').on('click',function(){
    $('#s_skin_layer').hide();
});


//
$('.bg-alphaBar').mousedown(function(event){
    //console.log(event.offsetX);
    var width = $(this).width();
    var offsetX = event.offsetX;
    $('.bg-alphaBarMoveBtn').css("left",offsetX+"px");
    var opacity = offsetX/width;
    set_body_opacity(opacity);
    var percent = Math.round(opacity*100)+"%";
    $('.bg-alphaBarOpacity').text(percent);
});

$('.bg-alphaBar .bg-alphaBarMoveBtn').mousedown(function(event){
    event.stopPropagation();    //  阻止事件冒泡
});

//不使用换肤
$(".s-skin-set").click(function() {
    remove_body_background();
    remove_choose_skin_img();
    remove_skin_preview();

    $(this).hide();
    $('.bg-hideOrShowAjax').css('visibility', 'hidden');
    $('#s_lg_img').attr('src', __uri("../images/bd_logo.png"));
    $('#header').css('background-color', "#FFFFFF");
    $('#header').css('border-bottom-color', "#EBEBEB");

    if (window.localStorage) {
        window.localStorage.removeItem(storage_bgimg_key);
    }
});

function get_weather() {
    var url = 'https://www.baidu.com/home/other/data/weatherInfo?city=%E9%95%BF%E6%B2%99&indextype=manht&_req_seqid=0xff94198c0001beb9&asyn=1&t=1467692616476&sid=19638_1420_20516_20537_20538_19860_17001_15625_12271_20254';
    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(resp) {
            //console.log(resp);
            var img = resp.data.weather.content.today.img[0];
            var temp = resp.data.weather.content.today.temp;
            var pm = resp.data.weather.content.today.pm25;

            //console.log(img,temp,pm);
            $('.icon-weather').css('background_image', "url(" + img + ")");
            $('.show-icon-temp').text(temp);
            $('.show-polution-num').text(pm);
        }
    });


}

//页面加载完成事件
$(document).ready(function() {

    if (window.localStorage && window.localStorage.getItem(storage_bgimg_key)) {
        var img_index = window.localStorage.getItem(storage_bgimg_key);
        set_body_background(img_index);
        set_choose_skin_img(img_index);
        set_skin_preview(img_index);

        $('.s-skin-set').show();
        $('.bg-hideOrShowAjax').css('visibility', 'visible');
        $('#s_lg_img').attr('src', __uri("../images/logo_white.png")); //更换百度背景图片
        $('#header').css('background-color', "transparent") //更换导航栏背景为透明
        $('#header').css('border-bottom-color', "transparent"); //更换导航栏下边框为透明
    }

    if (window.localStorage && window.localStorage.getItem(storage_menu_key)) {
        var s_menu_index = window.localStorage.getItem(storage_menu_key);
    } else {
        var s_menu_index = 1;
    }

    $('.s-menu-item').eq(s_menu_index).click();

    get_weather();
});
