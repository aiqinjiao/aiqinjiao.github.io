// banner
let banner = document.querySelector('.banner');

// 默认显示第一张图片
let banner_slides_li = banner.querySelectorAll('.slides li');
banner_slides_li[0].style.display = 'block';

// 3秒钟切换图片
setInterval(banner_slides, 3000);

// 图片切换方法，切换圆点跟随图片高亮
function banner_slides() {
    for (let i = 0; i < banner_slides_li.length; i++) {
        if (banner_slides_li[i].style.display === 'block') {
            // banner_slides_li[i].style.display = 'none';
            banner_slides_li[i].removeAttribute('style');
            banner_flexslider_ol_a[i].removeAttribute('class');
            if (i === banner_slides_li.length - 1) {
                i = -1;
            }
            banner_slides_li[i + 1].style.display = 'block';
            banner_flexslider_ol_a[i + 1].setAttribute('class', 'flex-active');
            break;
        }
    }
}

// 添加图片切换圆点
let banner_flexslider = banner.querySelector('.flexslider');
let banner_flexslider_ol = document.createElement('ol');
for (let i = 0; i < banner_slides_li.length; i++) {
    let ol_li = document.createElement('li');
    ol_li.innerHTML = '<a></a>';
    banner_flexslider_ol.appendChild(ol_li);
}
banner_flexslider.appendChild(banner_flexslider_ol);

// 默认高亮第一个圆点
let banner_flexslider_ol_a = banner_flexslider_ol.querySelectorAll('li a');
banner_flexslider_ol_a[0].setAttribute('class', 'flex-active');

// 点击圆点切换图片
/**
 * 1.点击图片圆点，切换到对应图片
 * 2.当前图片对应圆点高亮
 */
for (let i = 0; i < banner_flexslider_ol_a.length; i++) {
    banner_flexslider_ol_a[i].addEventListener('click', function() {
        banner_flexslider_ol_a[i].parentNode.parentNode.querySelector('.flex-active').removeAttribute('class');
        banner_flexslider_ol_a[i].setAttribute('class', 'flex-active');
        banner_slides_li[i].parentNode.querySelector('[style]').removeAttribute('style');
        banner_slides_li[i].style.display = 'block';
    })
}