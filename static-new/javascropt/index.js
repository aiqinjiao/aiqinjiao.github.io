let projects = [{
        name: 'balls',
        url: 'project/bouncing-balls/index.html'
    },
    {
        name: 'gallery',
        url: 'project/gallery-start/gallery-start/index.html'
    },
    {
        name: 'telephon',
        url: 'project/telephone.html'
    },
    {
        name: 'calendar',
        url: 'project/calendar.html'
    },
    {
        name: 'sillyStory',
        url: 'project/silly-story.html'
    },
    {
        name: 'guessGame',
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

// 创建项目列表
for (let i = 0; i <= proCount; i++) {
    let proUlLi = document.createElement('li');
    proUlLi.innerHTML = '<a href="' + projects[i]["url"] + '" target="_blank">' + projects[i]['name'] + '</a>';
    proUl.appendChild(proUlLi);
}