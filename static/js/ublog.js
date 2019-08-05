$(document).ready(function() {

    $('#load').height(screen.height);

    // var ctx = $('#cv').getContext("2d");
    var r = 100;
    var f = "#FDFDFD";
    var o = 0;
    var d = 0.5 * Math.PI;
    // 偏移弧度
    var radian = 3 * Math.PI / 180;
    var oc = 0;
    var dc = radian;

    setInterval(function() {
        for (i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                f = "#FDFDFD";
            } else {
                f = "#A5BDBD";
            }
            dCircle("cv", r, f, o, d);
            // r -= 10;
            if (i % 2 == 0) {
                r -= 10;
            } else {
                r -= 5;
            }
        }
        // dCircle("cv", r, f, o, d);
        dCircle("cv", 100, "#A5BDBD", oc, dc);
        oc += radian;
        dc = oc + radian;
        o += radian;
        d += radian;
        r = 100;
    }, 10)

    // 1s后显示首页
    setTimeout(function() {
        $('#load').css("display", 'none');
        $('#home').css("display", "block");
    }, 1000);

})


// 画圆弧
function dCircle(id, r, f, o, d) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    var x = c.scrollWidth / 2;
    var y = c.scrollHeight / 2;
    // var o = 0 * Math.PI;
    // var d = 0.5 * Math.PI;
    ctx.beginPath();
    ctx.arc(x, y, r, o, d);
    // ctx.lineTo(x, y);
    // ctx.strokeStyle = f;
    // ctx.stroke();
    ctx.fillStyle = f;
    ctx.fill();
}