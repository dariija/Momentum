const weatherIcon = document.querySelector('.weather-icon'),
      weatherTemperature = document.querySelector('.temperature'),
      weatherDescription = document.querySelector('.weather-description'),
      weatherWind = document.querySelector('.wind'),
      weatherHumidity = document.querySelector('.humidity'),
      weatherError = document.querySelector('.weather-error'),
      city = document.querySelector('.city');

let weatherTranslation = {
    ru : ['Скорость ветра', 'Влажность'],
    en : ['Wind speed', 'Humidity'],
};

city.addEventListener('change', function() {
    getWeather(state.language)
});

getWeather(state.language);

async function getWeather(lang) {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = '';
    city.value = city.value || localStorage.getItem('city') || 'Minsk';

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&units=metric&appid=09f196dc14a3214797ed991a6529ec12`;
    let request = await fetch(url);
    if (!request.ok) {
        weatherError.textContent = `Error! city not found for '${city.value}'!`;
        weatherTemperature.textContent = weatherDescription.textContent = weatherWind.textContent = weatherHumidity.textContent = '';
    } else {
        let data = await request.json();

        // city.value = `${data.name}`;
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherTemperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = `${ data.weather[0].description}`;
        weatherWind.textContent = `${weatherTranslation[lang][0]}: ${Math.floor(data.wind.speed)} m/s`;
        weatherHumidity.textContent = `${weatherTranslation[lang][1]}: ${Math.floor(data.main.humidity)}%`;
    }
}

// ?????? ------------------------------------
// function translateWeather(lang) {
//     let weatherTranslation = {
//         ru : ['Скорость ветра', 'Влажность'],
//         en : ['Wind speed', 'Humidity'],
//     };

//     getWeather(lang);
// }
