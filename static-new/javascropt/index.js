let projects = [{
        name: 'guessgame',
        url: 'project/number-guessing-game.html'
    },
    {
        name: 'timekeeper',
        url: 'project/timekeeper.html'
    },
    {
        name: 'timepiece',
        url: 'project/timepiece.html'
    },
    {
        name: 'more...',
        url: '#'
    }
]

let proCount = projects.length;

const proUl = document.querySelector('.project ul');

for (let i = 0; i <= proCount; i++) {
    let proUlLi = document.createElement('li');
    proUlLi.innerHTML = '<a href="' + projects[i]["url"] + '" target="_blank">' + projects[i]['name'] + '</a>';
    proUl.appendChild(proUlLi);
}