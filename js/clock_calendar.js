const clock = document.querySelector('.time');
const calendar = document.querySelector('.date');

function showTime() {
    let currentDatetime = new Date();
    let currentTime = currentDatetime.toLocaleTimeString();
    clock.textContent = currentTime;
    showDate();

    setTimeout(showTime, 1000)
};

function showDate() {
    let currentDatetime = new Date();
    let options = {weekday: 'long', month: 'long', day: 'numeric'};
    let currentDate = currentDatetime.toLocaleDateString(['ru-RU', 'en-US', 'en-Br'], options);
    calendar.textContent = currentDate;
};

showTime();
