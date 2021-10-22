const weatherIcon = document.querySelector('.weather-icon'),
      weatherTemperature = document.querySelector('.temperature'),
      weatherDescription = document.querySelector('.weather-description'),
      weatherWind = document.querySelector('.wind'),
      weatherHumidity = document.querySelector('.humidity'),
      weatherError = document.querySelector('.weather-error'),
      city = document.querySelector('.city');

async function getWeather() {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = '';

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&units=metric&appid=09f196dc14a3214797ed991a6529ec12`;
    let request = await fetch(url);
    if (!request.ok) {
        weatherError.textContent = `Error! city not found for '${city.value}'!`;
        weatherTemperature.textContent = weatherDescription.textContent = weatherWind.textContent = weatherHumidity.textContent = '';
    } else {
        let data = await request.json();

        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherTemperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = `${ data.weather[0].description}`;
        weatherWind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
        weatherHumidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
    }
}

city.addEventListener('change', function() {
    getWeather()
});

getWeather()