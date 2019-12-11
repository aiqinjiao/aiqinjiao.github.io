/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'
];

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "",
    nowGraTime: "day"
}

function commenEvent(node, event, callback) {
    if (window.addEventListener) {
        node.addEventListener(event, callback, false);
    } else if (window.attachEvent) {
        node.attachEvent("on" + event, callback);
    } else {
        node["on" + event] = callback;
    }
}

/**
 * 渲染图表
 */
function renderChart() {
    var chart = document.getElementById("aqi-chart-wrap");
    var html = '';
    var unit = pageState.nowGraTime === "day" ? "日" : pageState.nowGraTime === "week" ? "周" : "月";
    html += '<div class="title">' + pageState.nowSelectCity + "市 第1" + unit + "~" + "第" + (chartData[pageState.nowGraTime][pageState.nowSelectCity].length) + unit + ' 平均空气质量报告</div>';
    var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
    var temWidth = (90) / chartData[pageState.nowGraTime][pageState.nowSelectCity].length;
    var temSpace = (10) / (chartData[pageState.nowGraTime][pageState.nowSelectCity].length - 1);
    var nowLeft = 0;
    for (var key in selectedData) {
        if (key !== "length") {
            var temHeight = Math.floor(pageState.nowGraTime === "day" ? selectedData[key] : selectedData[key].Sum / selectedData[key].DayNum) / 2;
            html += "<div class='aqi-list' style='left:" + nowLeft + "%;height:" + temHeight + "px;width:" + temWidth + "%;background-color:" + colors[Math.floor(Math.random() * 11)] + "'></div>";
            var infoLeft = nowLeft < 50 ? "left:" + nowLeft : "right:" + (100 - nowLeft - temWidth);
            html += "<div class='aqi-info' style='position:absolute;" + infoLeft + "%;bottom:" + (temHeight + 20) + "px;'>日期：" + (pageState.nowGraTime === "day" ? key + "<br />空气质量：" + (temHeight * 2) : (selectedData[key].Start + "~" + selectedData[key].End) + "<br />平均空气质量：" + (temHeight * 2)) + "</div>";
            nowLeft += (temWidth + temSpace);
        }
    }
    chart.innerHTML = html;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var radio = document.getElementsByName("gra-time");
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked && radio[i].value !== pageState.nowGraTime) {
            pageState.nowGraTime = radio[i].value;
            renderChart();
        }
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    if (document.getElementById("city-select").value !== pageState.nowSelectCity) {
        pageState.nowSelectCity = document.getElementById("city-select").value;
        renderChart();
    }
}

function initGraTimeForm() {
    var radio = document.getElementsByName("gra-time");
    for (var i = 0; i < radio.length; i++) {
        commenEvent(radio[i], "click", function() {

            graTimeChange();
        });
    }
    commenEvent(document.getElementById("aqi-chart-wrap"), "mouseover", function(event) {
        event = event || window.event;
        var e = event.target || event.srcElemebt;
        if (/aqi-list/.test(e.className)) {
            e.nextSibling.style.display = "block";
        }
    });
    commenEvent(document.getElementById("aqi-chart-wrap"), "mouseout", function(event) {
        event = event || window.event;
        var e = event.target || event.srcElemebt;
        if (/aqi-list/.test(e.className)) {
            e.nextSibling.style.display = "none";
        }
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var select = document.getElementById("city-select");
    var cityArr = Object.getOwnPropertyNames(aqiSourceData);
    var htmlArr = cityArr.map(function(item) {
        return "<option>" + item + "</option>";
    });
    pageState.nowSelectCity = cityArr[0];
    select.innerHTML = htmlArr.join("");
    commenEvent(select, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    var week = {},
        month = {};
    for (city in aqiSourceData) {
        week[city] = [];
        month[city] = [];
        var weekNum = { Num: 0, Sum: 0, DayNum: 0, Start: "", End: "" };
        var monthNum = { Num: -1, Sum: 0, DayNum: 0, Start: "", End: "" };
        var temLength = 0;
        for (day in aqiSourceData[city]) {
            temLength++;
            var dat = new Date(day);
            var nowMonth = dat.getMonth();
            var nowWeekDay = dat.getDay();
            if (weekNum.DayNum === 0) {
                weekNum.Start = day;
            }
            if (monthNum.Num !== nowMonth) {
                if (monthNum.Num !== -1) {
                    month[city].push({ Num: monthNum.Num, Sum: monthNum.Sum, DayNum: monthNum.DayNum, Start: monthNum.Start, End: monthNum.End });
                }
                monthNum.Num = nowMonth;
                monthNum.Sum = 0;
                monthNum.DayNum = 0;
                monthNum.Start = day;
            }
            monthNum.DayNum++;
            monthNum.Sum += aqiSourceData[city][day];
            monthNum.End = day;

            weekNum.DayNum++;
            weekNum.Sum += aqiSourceData[city][day];
            if (nowWeekDay === 6) {
                weekNum.End = day;
                week[city].push({ Num: weekNum.Num, Sum: weekNum.Sum, DayNum: weekNum.DayNum, Start: weekNum.Start, End: weekNum.End });
                weekNum.Num++;
                weekNum.Sum = 0;
                weekNum.DayNum = 0;
            }
        }
        aqiSourceData[city].length = temLength;
        if ((new Date(day)).getDay() !== 6) {
            weekNum.End = day;
            week[city].push({ Num: weekNum.Num, Sum: weekNum.Sum, DayNum: weekNum.DayNum, Start: weekNum.Start, End: weekNum.End });
        }
        if (monthNum.DayNum !== 0) {
            month[city].push({ Num: monthNum.Num, Sum: monthNum.Sum, DayNum: monthNum.DayNum, Start: monthNum.Start, End: monthNum.End });
        }
    }

    chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();