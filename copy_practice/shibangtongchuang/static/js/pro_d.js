// 产品图片切换
var view_img = document.querySelector('.pro-view .view .view-img');
var main_img = view_img.querySelector('div img');
var ul_img = view_img.querySelectorAll('ul li img');
var detail = document.querySelector('.detailed');
var detail_img = detail.querySelector('.detailed img');

for (let i = 0; i < ul_img.length; i++) {
    ul_img[i].addEventListener('mouseover', function(){
        let img_url = ul_img[i].getAttribute('src');
        main_img.setAttribute('src', img_url);
        // 同步修改放大的图片
        detail_img.setAttribute('src', img_url);
    });
}

// 产品图片细节展示
var canvas = document.querySelector('#canv');
var ctx = canvas.getContext('2d');
// 蒙层原点
var x = 0;
var y = 0;
// 蒙层宽和高 缩小5倍 向下取整数，去掉蒙层移动留下的边框 
const width = Math.floor(canvas.offsetWidth / 5);
const height = Math.floor(canvas.offsetHeight / 5);

canvas.addEventListener('mouseover', function(e){
    // 屏幕滚动到图片位置
    window.scroll(0, view_img.offsetTop);
    detail.style.display = 'block';
    detail.style.overflow = 'hidden';
    // 详细图放大5倍
    detail_img.style.width = (detail.offsetWidth * 5) + 'px';
    detail_img.style.height = (detail.offsetHeight * 5) + 'px';
    detail_img.style.position = 'absolute';
    
});

canvas.addEventListener('mouseout', function(){
    ctx.clearRect(x, y, width, height);
    detail.style.display = 'none';
});

canvas.addEventListener('mousemove', function(e){
    window.scroll(0, view_img.offsetTop);
    ctx.clearRect(x, y, width, height);
    // 蒙层移动到边界的情况
    if (e.clientX < view_img.offsetLeft + width / 2) {
        x = 0;
    } else if (e.clientX > view_img.offsetLeft + view_img.offsetWidth - width / 2) {
        x = view_img.offsetWidth - width;
    } else {
        // 将鼠标放在蒙层中间
        x = e.clientX - view_img.offsetLeft - width / 2;
    }
    // 蒙层移动到边界的情况
    if (e.clientY < height / 2) {
        y = 0;
    } else if (e.clientY > canvas.offsetHeight - height / 2) {
        y = canvas.offsetHeight - height;
    } else {
        // 将鼠标放在蒙层中间
        y = e.clientY - height / 2;
    }
    // 绘制蒙层
    ctx.fillStyle = '#dddddd';
    ctx.fillRect(x, y, width, height);

    // 放大图反向偏移left、top放大5倍
    let l = x * 5;
    let t = y * 5;
    detail_img.style.left = -l + 'px';
    detail_img.style.top = -t + 'px';
});

// 页面滚动时功能描述菜单在固定在页面顶部
var partic = document.querySelector('.particular');
var partic_menu = partic.querySelector('.menu');
var partic_menu_span = partic_menu.querySelectorAll('span');
var partic_capt = partic.querySelectorAll('.caption');

// 窗口滚动条事件
window.addEventListener('scroll', function(){
    if (window.scrollY > partic.offsetTop) {
        // 当滚动距离超过功能描述菜单时固定菜单
        partic_menu.style.position = 'fixed';
        partic_menu.style.top = '0px';
        if (window.scrollY >= partic_capt[1].offsetTop && window.scrollY < partic_capt[2].offsetTop) {
            // 规格参数菜单高亮
            partic_menu.querySelector('.current').removeAttribute('class');
            partic_menu_span[1].setAttribute('class', 'current');
        } else if (window.scrollY >= partic_capt[2].offsetTop && window.scrollY < partic_capt[3].offsetTop) {
            // 产品图集菜单高亮
            partic_menu.querySelector('.current').removeAttribute('class');
            partic_menu_span[2].setAttribute('class', 'current');
        } else if (window.scrollY >= partic_capt[3].offsetTop) {
            // 更多产品菜单高亮
            partic_menu.querySelector('.current').removeAttribute('class');
            partic_menu_span[3].setAttribute('class', 'current');
        } else {
            // 功能描述菜单高亮
            partic_menu.querySelector('.current').removeAttribute('class');
            partic_menu_span[0].setAttribute('class', 'current');
        }
    } else {
        partic_menu.style.position = 'static';
    }
});

// 点击功能描述菜单跳转到对应的位置1·   
for (let i = 0; i < partic_menu_span.length; i++) {
    partic_menu_span[i].addEventListener('click', function(){
        // 滚动条定位到对应的菜单内容
        if (i === 0) {
            window.scroll(0, partic.offsetTop);
        } else {    
            window.scroll(0, partic_capt[i].offsetTop);
        }
        // 菜单高亮切换
        partic_menu.querySelector('.current').removeAttribute('class');
        partic_menu_span[i].setAttribute('class', 'current');
    });
}