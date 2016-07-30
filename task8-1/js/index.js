
$(function() {
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
            // console.log(1)
        } else {
            curIndex = 0;
            // console.log(2)
        }
        changeTo(curIndex);
    }, 2500);



    function changeTo(num) {
        var imgWidth = document.documentElement.clientWidth - 20;
        var goLeft = "-" + num * imgWidth + "px";
        // console.log(goLeft)
        // $(".topic-gallery .wrapper").animate("left",goLeft);s
        $(".topic-gallery .wrapper").css({
                "transform": "translateX(" + goLeft + ")",
                "-webkit-transition-property": "transform",
                "-webkit-transition-duration": "1s"
            })
            // console.log(3)
        $(".slidder-icons i").removeClass("blue").eq(num).addClass("blue");
    }
    // ends


    // 热点轮播


    var hotIndex = 0;
    var topicNum = $(".hot-content li").length;
    console.log(topicNum)

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



})
