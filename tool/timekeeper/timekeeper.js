window.onload = function() {

    initNumXY(200, 160, 40, 40);
    setTime();
    setInterval(setTime, 100);

    // 设置初始时间
    function setTime() {
        var hour_line = window.document.getElementById("hour_line");
        var minute_line = window.document.getElementById("minute_line");
        var second_line = window.document.getElementById("second_line");
        var date = new Date();
        var ms = date.getMilliseconds();
        var s = date.getSeconds() + ms / 1000;
        var m = date.getMinutes() + s / 60; //分钟跟着秒针旋转，下同
        var h = date.getHours() + m / 60;

        // *6 秒针每秒走6度 =360/60 ，-90 是指针初始水平放置
        second_line.style.transform = "rotate(" + (s * 6 - 90) + "deg)";
        minute_line.style.transform = "rotate(" + (m * 6 - 90) + "deg)";
        // 时针一小时走30度
        hour_line.style.transform = "rotate(" + (h * 30 - 90) + "deg)";
    }

    // 定位数字的位置，R：大圆的半径，r：数字所在位置小圆的半径，w: 数字的宽， h:数字的高
    function initNumXY(R, r, w, h) {
        var numXY = [
            // 依次为1~12点
            {
                "top": R - Math.sqrt(0.75) * r - 0.5 * h,
                "left": R + 0.5 * r - 0.5 * w
            },
            {
                "top": R - 0.5 * r - 0.5 * h,
                "left": R + Math.sqrt(0.75) * r - 0.5 * w
            },
            {
                "top": R - 0.5 * h,
                "left": R + r - 0.5 * w
            },
            {
                "top": R + 0.5 * r - 0.5 * h,
                "left": R + Math.sqrt(0.75) * r - 0.5 * w
            },
            {
                "top": R + Math.sqrt(0.75) * r - 0.5 * h,
                "left": R + 0.5 * r - 0.5 * w
            },
            {
                "top": R + r - 0.5 * h,
                "left": R - 0.5 * w
            },
            {
                "top": R + Math.sqrt(0.75) * r - 0.5 * h,
                "left": R - 0.5 * r - 0.5 * w
            },
            {
                "top": R + 0.5 * r - 0.5 * h,
                "left": R - Math.sqrt(0.75) * r - 0.5 * w
            },
            {
                "top": R - 0.5 * h,
                "left": R - r - 0.5 * w
            },
            {
                "top": R - 0.5 * r - 0.5 * h,
                "left": R - Math.sqrt(0.75) * r - 0.5 * w
            },
            {
                "top": R - Math.sqrt(0.75) * r - 0.5 * h,
                "left": R - 0.5 * r - 0.5 * w
            },
            {
                "top": R - r - 0.5 * h,
                "left": R - 0.5 * w
            }
        ];

        var clock = document.getElementById("clock");
        // 钟上添加数字
        for (var i = 1; i <= 12; i++) {
            if (i % 3 == 0) {
                clock.innerHTML += "<div class='clock_num em_num'>" + i + "</div>";
            } else {
                clock.innerHTML += "<div class='clock_num'>" + i + "</div>";
            }
        }

        var clock_num = document.getElementsByClassName("clock_num");
        // 定位数字
        for (var i = 0; i < clock_num.length; i++) {
            clock_num[i].style.top = numXY[i].top + "px";
            clock_num[i].style.left = numXY[i].left + "px";
        }

        // 钟添加刻度
        var ul = document.createElement("ul");
        ul.setAttribute("id", "list");
        clock.appendChild(ul);
        for (var i = 0; i < 60; i++) {
            var li = document.createElement("li");
            li.style.transform = "rotate(" + i * 6 + "deg)"
            ul.appendChild(li);
        }
    }
}