const select = document.querySelector('select'),
    ul = document.querySelector('ul'),
    h1 = document.querySelector('h1');

function createCalendar(month) {
    let days = 31;
    if (month === 'February') {
        days = 28;
    } else if (month === 'April' ||
        month === 'June' ||
        month === 'September' ||
        month == 'November') {
        days = 30;
    }
    ul.innerHTML = '';
    for (let i = 1; i <= days; i++) {
        let li = document.createElement('li');
        li.textContent = i;
        ul.appendChild(li);
    }
}

// 默认展示1月
createCalendar('January');
h1.textContent = 'January';

select.addEventListener('change', function() {
    let month = select.value;
    h1.textContent = month;
    createCalendar(month);
})