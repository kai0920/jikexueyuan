var body = {

    /**
     * 设置body背景图片
     * @param img_index 图片索引
     */
    set_background : function(img_index) {
        var background_image = "./images/skin-bg-" + img_index + ".jpg"; //背景图片url
        var background = { "background-image": "url(" + background_image + ")", "background-size": "100%", "background-attachment": "fixed" };
        $('body').css(background); //给body设置背景图片
    },

    /**
     * 设置body背景透明度
     * @param img_index 图片索引
     */
    set_opacity : function(opacity) {
        $('body').css('opacity',opacity); //给body设置背景图片
    },

    //移除body背景颜色
    remove_background : function() {
        $('body').css({ "background-image": "" });
    },

}

var skin_choose = {

    /**
     * 皮肤选中状态
     * @param  {[type]} img_index [description]
     * @return {[type]}           [description]
     */
    set : function(img_index) {
        var me = this;
        $('.skin-img-item').each(function() {
            if ($(this).attr('data-index') == img_index) {
                $(this).find('.skin-bg-png24-icon').addClass('skin-img-item-choose'); //添加选中状态
                var img_src = $(this).find('.skin-img-item-img').attr('src'); //图片的url
                baidu.skin_preview_value = img_src;
            } else {
                $(this).find('.skin-bg-png24-icon').removeClass('skin-img-item-choose'); //移除所有选中状态
            }
        });
    },

    /**
     * 移除皮肤选中状态
     * @return {[type]} [description]
     */
    remove : function() {
        $('.skin-bg-png24-icon').removeClass('skin-img-item-choose'); //移除所有选中状态
        baidu.skin_preview_value = '';
    },
}

var skin_preview = {

    /**
     * 设置预览区图片
     * @param {[type]} img_index [description]
     */
    set : function(img_index) {
        var img_src = "./images/skin-pos-" + img_index + ".jpg"; //图片url
        baidu.s_skin_preview_skin.attr('src', img_src);
    },

    /**
     * 移除预览区图片
     * @return {[type]} [description]
     */
    remove : function() {
        baidu.s_skin_preview_skin.removeAttr('src');
    },
}


/**
 * 使用单例模式：模块间通信，系统中某个类的对象只能存在一个，保护自己的属性和方法
 * @type {Object}
 */
var baidu = {

    init : function(){
        var me = this;
        me.render();
        me.bind();

        if (window.localStorage && window.localStorage.getItem(me.storage_bgimg_key)) {
            var img_index = window.localStorage.getItem(me.storage_bgimg_key);
            body.set_background(img_index);
            skin_choose.set(img_index);
            skin_preview.set(img_index);

            me.s_skin_set.show();
            $('.bg-hideOrShowAjax').css('visibility', 'visible');
            $('#s_lg_img').attr('src', "./images/logo_white.png"); //更换百度背景图片
            $('#header').css('background-color', "transparent") //更换导航栏背景为透明
            $('#header').css('border-bottom-color', "transparent"); //更换导航栏下边框为透明
        }

        if (window.localStorage && window.localStorage.getItem(me.storage_menu_key)) {
            var s_menu_index = window.localStorage.getItem(me.storage_menu_key);
        } else {
            var s_menu_index = 1;
        }

        me.s_menu_item.eq(s_menu_index).click();

        me.get_weather();
    },
    render : function(){
        var me = this;
        me.storage_menu_key = 's_menu_index'; //标签切换索引
        me.storage_bgimg_key = "bg_img_index"; //背景图片索引
        me.s_skin = $('.s-skin');
        me.product = $('#product');
        me.product_list = $('#product-list');
        me.s_skin_preview_skin = $('#s_skin_preview_skin');
        me.skin_img_item = $('.skin-img-item');
        me.s_skin_layer = $('#s_skin_layer');
        me.skin_preview_value = ''; //皮肤预览值
        me.s_skin_set = $('.s-skin-set');
        me.s_menu_item = $('.s-menu-item');
    },
    bind : function(){
        var me = this;

        //皮肤展开操作
        me.s_skin.click(function(event) {
            me.s_skin_layer.show();
            event.stopPropagation();
        });

        //更多产品鼠标hover事件
        me.product.mouseover(function() {
            $(this).hide();
            me.product_list.css({ 'height': $(window).height(), "overflow": 'auto' }).show();
        });

        //更多产品鼠标离开时间
        me.product_list.mouseleave(function() {
            $(this).hide();
            me.product.show();
        });

        /**
         * 换肤 皮肤列表点击 hover事件
         */
        me.skin_img_item.hover(function() {
            var img_index = $(this).attr('data-index'); //图片的索引
            skin_preview.set(img_index);
        }, function() {
            if (me.skin_preview_value) {
                me.s_skin_preview_skin.attr('src', me.skin_preview_value);
            } else {
                me.s_skin_preview_skin.removeAttr('src');
            }
        }).click(function() { //点击操作
            $(this).unbind('mouseenter').unbind('mouseleave'); //解除绑定hover事件

            var img_index = $(this).attr('data-index'); //图片的索引

            me.s_skin_set.show();
            $('.bg-hideOrShowAjax').css('visibility', 'visible');
            $('#s_lg_img').attr('src', "./images/logo_white.png"); //更换百度背景图片
            $('#header').css('background-color', "transparent") //更换导航栏背景为透明
            $('#header').css('border-bottom-color', "transparent"); //更换导航栏下边框为透明

            skin_preview.set(img_index);
            skin_choose.set(img_index);
            body.set_background(img_index);
            if (window.localStorage) {
                window.localStorage.setItem(me.storage_bgimg_key, img_index);
            }
        });

        //皮肤展开操作
        $(".s-skin").bind('click',function(event) {
            me.s_skin_layer.show();
            event.stopPropagation();    //  阻止事件冒泡
        });

        //皮肤收起操作
        $('.s-skin-up').on('click',function(){
            me.s_skin_layer.hide();
            event.stopPropagation();
        });

        //皮肤展开操作
        me.s_skin_layer.bind('click',function(event) {
            me.s_skin_layer.show();
            event.stopPropagation();    //  阻止事件冒泡
        });

        //皮肤收起操作
        $('body').on('click',function(){
            me.s_skin_layer.hide();
        });

        //设置背景透明度
        $('.bg-alphaBar').mousedown(function(event){
            var width = $(this).width();
            var offsetX = event.offsetX;
            $('.bg-alphaBarMoveBtn').css("left",offsetX+"px");
            var opacity = offsetX/width;
            body.set_opacity(opacity);
            var percent = Math.round(opacity*100)+"%";
            $('.bg-alphaBarOpacity').text(percent);
        });

        $('.bg-alphaBar .bg-alphaBarMoveBtn').mousedown(function(event){
            event.stopPropagation();    //  阻止事件冒泡
        });

        //不使用换肤
        me.s_skin_set.click(function() {
            body.remove_background();
            skin_choose.remove();
            skin_preview.remove();

            $(this).hide();
            $('.bg-hideOrShowAjax').css('visibility', 'hidden');
            $('#s_lg_img').attr('src', "./images/bd_logo.png");
            $('#header').css('background-color', "#FFFFFF");
            $('#header').css('border-bottom-color', "#EBEBEB");

            if (window.localStorage) {
                window.localStorage.removeItem(me.storage_bgimg_key);
            }
        });

        /**
         * 标签切换事件
         */
        me.s_menu_item.hover(function() {
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
                window.localStorage.setItem(me.storage_menu_key, index);
            }
        });


    },

    get_weather : function() {
        var url = 'https://www.baidu.com/home/other/data/weatherInfo?city=%E9%95%BF%E6%B2%99&indextype=manht&_req_seqid=0xff94198c0001beb9&asyn=1&t=1467692616476&sid=19638_1420_20516_20537_20538_19860_17001_15625_12271_20254';
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(resp) {
                var img = resp.data.weather.content.today.img[0];
                var temp = resp.data.weather.content.today.temp;
                var pm = resp.data.weather.content.today.pm25;

                $('.icon-weather').css('background_image', "url(" + img + ")");
                $('.show-icon-temp').text(temp);
                $('.show-polution-num').text(pm);
            }
        });
    },


};


baidu.init();
