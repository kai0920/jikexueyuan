$(function() {
    $(window).on("load", function() {
        imgPosition();
        var dataImg = {
            "data": [
                { "src": "1.jpg" },
                { "src": "2.jpg" },
                { "src": "3.jpg" },
                { "src": "4.jpg" }, 
                { "src": "5.jpg" }, 
                { "src": "6.jpg" }, 
                { "src": "7.jpg" }, 
                { "src": "8.jpg" }
            ]
        };
        //加载新图片
        window.onscroll = function() {
               if(scroll()){
                 $.each(dataImg.data, function(index,value){
                    var box = $("<div>").addClass("box").appendTo($(".main"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    console.log("./img/"+$(value).attr("src"));
                   $("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(content);
                 });
                 imgPosition();
               }
        }
        window.onresize= function(){
            imgPosition();
        }
    });
});
 //加载函数 判断何时加载
function scroll() {
    var box = $('.box');
    var lastBoxHeight = box.last().offset().top + Math.floor(box.last().height() / 2); //最后一张图片离浏览器顶端的高度
    var documentHeight = $(document).height();  
    var scrollHeight = $(window).scrollTop();
    return (scrollHeight + documentHeight > lastBoxHeight) ? true : false;
}

//图片位置函数
function imgPosition() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var imgNum = Math.floor($(window).width() / boxWidth); //每行图片的张数
    var boxArray = [];
    box.each(function(index, value) {
        value.style.cssText="";
        // console.log(index+"--"+value);
        var boxHeight = box.eq(index).height();
        if (index < imgNum) {
            boxArray[index] = boxHeight;   //第一行图片的高度数组
            // console.log(boxHeight);
        } else {
            var minBoxHeight = Math.min.apply(null, boxArray);  //获取图片的最小高度
            // console.log(minBoxHeight);
            var minBoxIndex = $.inArray(minBoxHeight, boxArray); //获取最小高度图片的索引/位置
            // console.log(minBoxIndex);
            // console.log(value);
            $(value).css({                                  //设置第二行第一张图片的位置
                "position": "absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left              
            });
            boxArray[minBoxIndex] += box.eq(index).height();  //重置高度最小图片的高度
        }
    });
}
