/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var table = document.querySelector('#aqi-table');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var iCity = document.querySelector('#aqi-city-input').value.trim();
    var iValue = document.querySelector('#aqi-value-input').value.trim();
    var message = '';
    if (!/^[\u4e00-\u9fa5]+$/.test(iCity)) {
        message += '城市名必须是汉字。 ';
    }
    if (!/^[0-9]+$/.test(iValue)) {
        message += '空气质量指数必须是整数。';
    }
    if (!message) {
        aqiData[iCity] = iValue;
    } else {
        alert(message);
    }

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var str = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    var tr = document.createElement('tr');
    for (var city in aqiData) {
        str += '<tr><td>' + city + '</td><td>' + aqiData[city] +
            '</td><td><button class="del-btn">删除</button></td></tr> ';
    }
    table.innerHTML = str;

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
function delBtnHandle(e) {
    // do sth.
    var city = e.target.parentNode.parentNode.firstChild.innerText;
    delete aqiData[city];

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var add_btn = document.querySelector('#add-btn');
    add_btn.onclick = function() {
        addBtnHandle();
    }


    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener('click', delBtnHandle);
}

init();