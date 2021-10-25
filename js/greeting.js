const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');

function getTimeOfDay() {
    let time = new Date().getHours();
    return ( time < 5.59)? 'night' : 
           ( time < 11.59)? 'morning' :
           ( time < 17.59)? 'afternoon' : 'evening'
}

function showGreeting(lang) {
    let timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay}, `;

    // setTimeout(() => showGreeting(lang), 1000);
}

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('city', city.value)
    localStorage.setItem('state', JSON.stringify(state))
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    };

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
    };

    if (localStorage.getItem('state')) {
        state = JSON.parse(localStorage.getItem('state'));
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

showGreeting(state.language);


// --------------------------------------------------------------------



function greetingTranslate(lang) {
    let greetingTranslation = {
        ru : ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'],
        en : ['Good night,', 'Good morning,', 'Good afternoon,', 'Good evening,'],
    };
    let placeholderTranslation = {
        ru : ['[Введите имя]'],
        en : ['[Enter name]'],
    };
    let time = getTimeOfDay();
    // let greetingText;

    // if (time === 'night') greetingText = greetingTranslation[`${lang}`][0]
    // else if (time === 'morning') greetingText = greetingTranslation[`${lang}`][1]
    // else if (time === 'afternoon') greetingText = greetingTranslation[`${lang}`][2]
    // else greetingText = greetingTranslation[`${lang}`][3];

    // greeting.textContent = greetingText;
    // userName.placeholder = placeholderTranslation[`${lang}`][0];

    let greetingTextIndex = (time === 'night')? 0 : 
                            (time === 'morning')? 1 :
                            (time === 'afternoon')? 2 : 3;

    greeting.textContent = greetingTranslation[`${lang}`][greetingTextIndex];
    userName.placeholder = placeholderTranslation[`${lang}`][0];
}

// greetingTranslate();



// -------.addEventListener('click', greetingTranslate) 