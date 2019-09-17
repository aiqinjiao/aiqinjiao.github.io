const customName = document.querySelector('#customname'),
    randomize = document.querySelector('.randomize'),
    story = document.querySelector('.story');

// 返回数组里的随机一个项
function randomValueFromArrry(array) {
    return array[Math.floor(Math.random() * array.length)];
}

let storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk.\
 When they got to :inserty:, they stared in horror for a few moments, then :insertz:. \
 Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, \
 and it was a hot day.';

let insertX = ['Willy the Goblin',
        'Big Daddy',
        'Father Christmas'
    ],
    insertY = ['the soup kitchen',
        'Disneyland',
        'the White House'
    ],
    insertZ = ['spontaneously combusted',
        'melted into a puddle on the sidewalk',
        'turned into a slug and crawled away'
    ];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArrry(insertX),
        yItem = randomValueFromArrry(insertY),
        zItem = randomValueFromArrry(insertZ);

    newStory = newStory.replace(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);

    if (customName.value !== '') {
        var name = customName.value;
        newStory = newStory.replace('Bob', name);
    }


    if (document.getElementById("uk").checked) {
        // F=C×1.8+32 C=(F-32)÷1.8    centigrade:摄氏度    fahrenheit：华氏度
        // 1stone=14pound    1英石 = 14磅
        var weight = Math.round(300 / 14) + ' stones';
        var temperature = Math.round((94 - 32) / 1.8) + ' centigrade';
        newStory = newStory.replace('94 fahrenheit', weight);
        newStory = newStory.replace('300 pounds', temperature);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}