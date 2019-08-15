$(document).ready(function() {
    $('#course ul li').click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass();
    })


})