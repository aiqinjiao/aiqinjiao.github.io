$(document).ready(function() {
    $('#course ul li').click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass();
    })

    $('.next').click(function() {
        var t = $('.next li').html();
        // alert(t);
        // var a = window.parent.document.getElementById('course_frame');
        // alert(a);
        var a = $(window.parent.document);

    })

})