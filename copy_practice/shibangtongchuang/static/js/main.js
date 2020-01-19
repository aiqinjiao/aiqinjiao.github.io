// banner
var banner = document.querySelector('.banner');

// 默认显示第一张图片
var banner_slides_li = banner.querySelectorAll('.slides li');
banner_slides_li[0].style.display = 'block';

// 3秒钟切换图片
var timer = setInterval(banner_carousel, 3000);

banner.addEventListener('mouseover', function() {
    clearInterval(timer);
    /**
     * Google浏览器在执行banner_carousel()方法删除sytle后，
     * 会留下空的style属性，所以在进入banner后要删除空的style
     */
    for (let i = 0; i < banner_slides_li.length; i++) {
        if (banner_slides_li[i].getAttribute('style') === "") {
            banner_slides_li[i].removeAttribute('style');
        }
    }
})

banner.addEventListener('mouseout', function() {
    timer = setInterval(banner_carousel, 3000);
})

// 图片切换方法，切换圆点跟随图片高亮
function banner_carousel() {
    for (let i = 0; i < banner_slides_li.length; i++) {
        if (banner_slides_li[i].style.display === 'block') {
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
var banner_flexslider = banner.querySelector('.flexslider');
var banner_flexslider_ol = document.createElement('ol');
for (let i = 0; i < banner_slides_li.length; i++) {
    let ol_li = document.createElement('li');
    ol_li.innerHTML = '<a></a>';
    banner_flexslider_ol.appendChild(ol_li);
}
banner_flexslider.appendChild(banner_flexslider_ol);

// 默认高亮第一个圆点
var banner_flexslider_ol_a = banner_flexslider_ol.querySelectorAll('li a');
banner_flexslider_ol_a[0].setAttribute('class', 'flex-active');

// 点击圆点切换图片
/**
 * 1.点击图片圆点，切换到对应图片
 * 2.当前图片对应圆点高亮
 */
for (let i = 0; i < banner_flexslider_ol_a.length; i++) {
    banner_flexslider_ol_a[i].addEventListener('click', function() {
        banner_flexslider_ol.querySelector('a[class]').removeAttribute('class');
        banner_flexslider_ol_a[i].setAttribute('class', 'flex-active');
        banner_flexslider.querySelector('.slides li[style]').removeAttribute('style');
        banner_slides_li[i].style.display = 'block';
    })
}

// .mainPhoto 图片切换
/**
 * 1. 自动切换
 * 2. 手动切换
 */
var photos = document.querySelectorAll('.i_mac .photo li');
photos[0].style.display = 'block';

setInterval(photo_list, 5000);

function photo_list() {
    for (let i = 0; i < photos.length; i++) {
        if (photos[i].style.display === 'block') {
            photos[i].removeAttribute('style');
            if (i === photos.length - 1) {
                i = -1;
            }
            photos[i + 1].style.display = 'block';
            break;
        }
    }
}

var goLeft = document.querySelector('.i_mac .goLeft');
var goRight = document.querySelector('.i_mac .goRight');

goLeft.addEventListener('click', function() {
    for (let i = 0; i < photos.length; i++) {
        if (photos[i].style.display === 'block') {
            photos[i].removeAttribute('style');
            if (i === 0) {
                i = photos.length;
            }
            photos[i - 1].style.display = 'block';
        }
    }
});
goRight.addEventListener('click', photo_list);