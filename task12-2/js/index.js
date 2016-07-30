 /**
 * 标签切换事件
 */
$('.menu-item').click(function() {
    $(this).unbind('mouseenter').unbind('mouseleave'); //解除绑定hover事件
    var box = $(this).attr('data-article');
    $('article').hide();
    $('article.'+box).show();

    $(this).siblings().removeClass('menu-item-active');
    $(this).addClass('menu-item-active');
});