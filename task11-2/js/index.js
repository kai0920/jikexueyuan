$(function() {

	$('.bus-station').each(function(){
        var total_width = $(this).width();
        //console.log($(this).find('.station-item'));
        var num = $(this).find('.station-item').length;
        var one_width = total_width/num;

        console.log(total_width,num,one_width);
        $(this).find('.station-item').width(one_width);



    });


});
