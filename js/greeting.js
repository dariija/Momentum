const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');

function getTimeOfDay() {
    let time = new Date().getHours();
    return ( time < 5.59)? 'night' : 
           ( time < 11.59)? 'morning' :
           ( time < 17.59)? 'afternoon' : 'evening'
}

function showGreeting() {
    let timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay}, `;

    setTimeout(showGreeting, 1000);
}

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('city', city.value)
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    };

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
    };
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

showGreeting();
