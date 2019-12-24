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
    var datStr = '';
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
var checkDate = document.querySelector('#form-gra-time [checked="checked"]').value;

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    console.log(chartData);
    console.log(checkDate);

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数
    var graTime = document.querySelector('#form-gra-time');
    var oRadio = document.querySelectorAll('[name="gra-time"]');
    graTime.addEventListener('change', function() {
        for (var i = 0; i < oRadio.length; i++) {
            if (oRadio[i].checked) {
                checkDate = oRadio[i].value;
                break;
            }

        }
        return checkDate;
        renderChart();
    })

    renderChart();

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数

    var oCity = document.querySelector('#city-select');
    // 获取默认城市数据
    chartData = aqiSourceData[oCity.value];
    // 当切换城市后，重新返回数据
    oCity.addEventListener('change', function() {
        chartData = aqiSourceData[oCity.value];
        return chartData;
        renderChart();
    })

    renderChart();

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    graTimeChange()
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city_select = document.querySelector('#city-select');
    for (var city in aqiSourceData) {
        var option = document.createElement('option');
        var oCity = document.createTextNode(city);
        option.appendChild(oCity);
        city_select.appendChild(option);
    }

    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    citySelectChange();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();