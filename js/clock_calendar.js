const clock = document.querySelector('.time');
const calendar = document.querySelector('.date');

function showTime() {
    let currentDatetime = new Date();
    let currentTime = currentDatetime.toLocaleTimeString();
    clock.textContent = currentTime;

    setTimeout(showTime, 1000)
};

function showDate(lang) {
    let currentDatetime = new Date();
    let options;
    let locale;

    if (lang === 'en') {
        locale = 'en-US';
        options = {weekday: 'long', month: 'long', day: 'numeric'};
    } else {
        locale = 'ru-RU';
        options = {weekday: 'long', day: 'numeric', month: 'long'};
    }

    let currentDate = currentDatetime.toLocaleDateString(locale, options);
    calendar.textContent = currentDate;
};

showTime();
showDate(state.language);
