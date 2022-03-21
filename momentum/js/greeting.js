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
    if (!(lang === 'en')) greetingTranslate(lang)
}

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
    let greetingTextIndex = (time === 'night')? 0 : 
                            (time === 'morning')? 1 :
                            (time === 'afternoon')? 2 : 3;

    greeting.textContent = greetingTranslation[`${lang}`][greetingTextIndex];
    userName.placeholder = placeholderTranslation[`${lang}`][0];
}

showGreeting(state.language);