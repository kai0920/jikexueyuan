require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-1.7.2.min'
    }
});

require(['jquery'], function($) {

	function isIE(){
		if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
    		return true;
		}else{
			return false;
		}
	}

    //搜索文本框获取焦点，失去焦点事件
    $('.search-text').focus(function() {
        $('.search-btn').addClass("search-btn2");
        $('.hot-words').css('display', 'none');
    }).blur(function() {
        $('.search-btn').removeClass("search-btn2");
        $('.hot-words').css('display', 'block');
    });

    //轮播图
    $('.index-banner .swiper-wrapper').css({ 'width': '3920px', 'height': '260px'});
    $('.index-banner .swiper-slide').each(function(index){
    	$(this).css({
    		"width": "560px",
    		"height": "260px",
    		"background": "url(./images/swiper-"+(index+1)+".jpg) center center no-repeat rgb(53, 181, 88)"
    	});
    });

    var curIndex = 0,
        imgLen = $(".index-banner .swiper-slide").length;

    var autoChange = setInterval(function() {
        if (curIndex < imgLen - 1) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        changeTo(curIndex);
    }, 2500);

    function changeTo(num) {
    	var goLeft = "-"+num*560+'px';
    	$('.index-banner .swiper-wrapper').animate({'left': goLeft});
        $('.index-banner .swiper-pagination-switch').removeClass('swiper-active-switch').eq(num).addClass('swiper-active-switch');
    }

    function autoChangeAgain() {
        autoChange = setInterval(function() {
            if (curIndex < imgLen - 1) {
                curIndex++;
            } else {
                curIndex = 0;
            }
            //调用变换处理函数
            changeTo(curIndex);
        }, 2500);
    }

    $('.index-banner .swiper-container').hover(function() {
        clearInterval(autoChange);
    }, function() {
        autoChangeAgain();
    });

    $("#banner-left").click(function() {
        curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
        changeTo(curIndex);
    });

    $("#banner-right").click(function() {
        curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
        changeTo(curIndex);
    });

    $('.swiper-pagination-switch').each(function(item) {
        $(this).click(function() {
            clearInterval(autoChange);
            changeTo(item);
            curIndex = item;
        });
    });

    var lessonIndex = 0;
    var lessonLen = 5;

    $('.focuswork-wrap .swiper-wrapper').css({ 'width': '2053.33px', 'height': '100px'});
    function lessonChangeTo(num) {
    	var goLeft = "-"+num*186.5+'px';
    	$('.focuswork-wrap .swiper-wrapper').animate({'left': goLeft });
    }

    $(".focuswork-wrap .arrow-left").click(function() {
        lessonIndex = (lessonIndex > 0) ? (--lessonIndex) : (lessonLen - 1);
        lessonChangeTo(lessonIndex);
    });

    $(".focuswork-wrap .arrow-right").click(function() {
        lessonIndex = (lessonIndex < lessonLen - 1) ? (++lessonIndex) : 0;
        lessonChangeTo(lessonIndex);
    });

    $(".menu li").each(function(index) {
        var liNode = $(this);
        $(this).mouseover(function() {
            $(".tabin").removeClass("tabin");
            $(".displayCon").removeClass("displayCon");
            $(".hot-lessonbox > div").eq(index).addClass("displayCon");
            liNode.addClass("tabin");
        }); //mouseover ends
    }); //each ends

    $(".lessonList > li").each(function(index) {
        var boxNode = $(this);
        $(this).mouseover(function() {
            $(".lessonPlay").eq(index).css("opacity", "1");
            $(".lesson-info p").eq(index).css({ "height": "52px", "display": "block" });
            $(".lesson-info").eq(index).css({ "height": "175px" });
            $(".zhongji").eq(index).show();
            $(".leanerNum").eq(index).show();
            $(".lesson-box .user-action").eq(index).css("display", "block");
        }); //mouseover ends
        $(this).mouseout(function() {
            $(".lessonPlay").eq(index).css("opacity", "0");
            $(".lesson-info p").eq(index).css({ "height": "0px", "display": "none" });
            $(".lesson-info").eq(index).css({ "height": "88px" });
            $(".zhongji").eq(index).hide();
            $(".leanerNum").eq(index).hide();
            $(".user-action").eq(index).hide();
        }); //mouseout ends
    }); //each ends


    // 职业路劲图hover事件
    $(".learnCard a").each(function() {
    	$(this).hover(function(){
    		$(this).css("border", "1px solid #35b558");
    		$(this).find('.greenbtn').css({"background": "#35b558","color": "#fff"});
    	},function(){
    		$(this).css({"border":"1px solid rgb(228, 228, 228)","border-right":"0"});
    		$(this).find('.greenbtn').css({"background": "#f3fff6","color": "#35b558"});
    	});
    });


    //知识体系图旋转事件
    $('.card-transform').each(function(index) {
        $(this).hover(function() {
        	if(isIE()){
	            $('.front').eq(index).hide();
	            $('.back').eq(index).show();
        	}else{
        		$('.front').eq(index).css('transform', 'rotateY(-180deg)');
            	$('.back').eq(index).css('transform', 'rotateY(0deg)');
        	}
        }, function() {
        	if(isIE()){
	            $('.front').eq(index).show();
	            $('.back').eq(index).hide();
        	}else{
        		$('.front').eq(index).css('transform', 'rotateY(0deg)');
            	$('.back').eq(index).css('transform', 'rotateY(-180deg)');
        	}
        });
    });

    $(".stra-partners-box").hover(function(){
    	 	$(this).find(".slider").show();
    },function(){
    		$(this).find(".slider").hide();
    });

    var enterpriseIndex = 0;
    var enterpriseLen = 5;
    function enterpriseChangeTo(num) {
    	var goLeft = "-"+num*155+'px';
    	$('.enterprise .partners-content').animate({'left': goLeft });
    }

    $(".enterprise .leftTri").click(function() {
        enterpriseIndex = (enterpriseIndex > 0) ? (--enterpriseIndex) : (enterpriseLen - 1);
        enterpriseChangeTo(enterpriseIndex);
    });

    $(".enterprise .rightTri").click(function() {
        enterpriseIndex = (enterpriseIndex < enterpriseLen - 1) ? (++enterpriseIndex) : 0;
        enterpriseChangeTo(enterpriseIndex);
    });


    var mediaIndex = 0;
    var mediaLen = 5;
    function mediaChangeTo(num) {
    	var goLeft = "-"+num*155+'px';
    	$('.media .partners-content').animate({'left': goLeft });
    }

    $(".media .leftTri").click(function() {
        mediaIndex = (mediaIndex > 0) ? (--mediaIndex) : (mediaLen - 1);
        mediaChangeTo(mediaIndex);
    });

    $(".media .rightTri").click(function() {
        mediaIndex = (mediaIndex < mediaLen - 1) ? (++mediaIndex) : 0;
        mediaChangeTo(mediaIndex);
    });


});
