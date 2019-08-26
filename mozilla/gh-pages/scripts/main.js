// 切换图片
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/firefox-icon.png') {
        myImage.setAttribute('src', 'images/firefox2.png');
    } else {
        myImage.setAttribute('src', 'images/firefox-icon.png');
    }
}

/**动态欢迎信息
 * 1.进入页面获取localStorage，判断username是否存在
 * 2.用户名存在，修改主页欢迎信息（h1标签textContent）
 * 3.用户不存在，弹出对话框填写username，保存localStorage，并修改主页欢迎信息
 * 4.点击切换按钮填写username
 */
function setHeading(name) {
    let myHeading = document.querySelector('h1');
    myHeading.textContent = 'Mozilla 酷毙了，' + name + '!';
}

function setUsername() {
    let username = prompt('输入你的名字');
    localStorage.setItem('name', username);
    setHeading(username);
}

let storedName = localStorage.getItem('name');
if (!storedName) {
    setUsername();
} else {
    setHeading(storedName);
}

let myButton = document.querySelector('button');
myButton.onclick = setUsername;


let list = document.createElement('ul');
let html = document.querySelector('html');
let info = document.createElement('p');
let btn = document.createElement('button');

info.textContent = 'Below is a dynamic list.'
btn.textContent = '添加';


document.body.appendChild(info);
document.body.appendChild(btn);
document.body.appendChild(list);


btn.onclick = function() {
    let listItem = document.createElement('li');
    let listContent = prompt('What content do you want the list item to have?');
    listItem.textContent = listContent;
    list.appendChild(listItem);

    listItem.onclick = function() {
        let listContent = prompt('Enter new content for you list item.')
        this.textContent = listContent;
    }
}