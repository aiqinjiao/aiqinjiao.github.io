/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var iCity = document.querySelector('#aqi-city-input');
    var iValue = document.querySelector('#aqi-value-input');
    aqiData[iCity.value] = iValue.value;
    return aqiData;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.querySelector('#aqi-table');
    var tr = document.createElement('tr');
    for (var city in aqiData) {
        tr.innerHTML = '<td>' + city + '</td><td>' + city.value + '</td>';
        table.appendChild(tr);
    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}


/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var add_btn = document.querySelector('#add-btn');
    add_btn.addEventListener('click', addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();