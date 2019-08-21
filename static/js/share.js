// var course_frame = window.parent.course_frame;
// var uAction = course_frame.document.getElementsByClassName('active');
// var uNext = document.getElementsByClassName('next');


$(document).ready(function() {
    $('#course ul li').click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass();
    })

    // $('.next').click(function() {
    //     console.log('hello');
    //     course_frame.$('#course .active').removeClass().next().addclass("active");
    // })
})

// uNext.onclick = function() {
//     uAction.removeAttribute('acitve');
// }