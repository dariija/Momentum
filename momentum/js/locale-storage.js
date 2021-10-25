function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('tasks',  JSON.stringify(tasks));
    localStorage.setItem('states', JSON.stringify(states));
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    };

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
    };

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);



