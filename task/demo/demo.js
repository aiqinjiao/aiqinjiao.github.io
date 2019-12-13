var sData = {
    '北京': { 'a': '1', 'b': '2', 'c': '3' },
    '天津': { 'a': '4', 'b': '5', 'c': '6' },
    '上海': { 'a': '7', 'b': '8', 'c': '9' }
};

function getData() {
    var aData = {};
    var city;
    for (city in sData) {
        var aCity = sData[city];
        var sum = 0;
        var s;
        for (s in aCity) {
            sum += Number(aCity[s]);
        }
        aData[city] = sum;
    }
    return aData;
}