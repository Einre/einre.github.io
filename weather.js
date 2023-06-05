async function getWeather(location) {
    const response = await fetch(`https://api.weather.gov/gridpoints/${location}`);
    const data = await response.json();
    const forecastUrl = data.properties.forecast;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    return forecastData;
  }
  
  async function displayWeather() {
    const locationSelectElement = document.getElementById('locationSelect');
    const location = locationSelectElement.value;
    const data = await getWeather(location);
    const currentWeatherElement = document.getElementById('currentWeather');
    const detailedForecastElement = document.getElementById('detailedForecast');
    currentWeatherElement.textContent = data.properties.periods[0].shortForecast;
    detailedForecastElement.textContent = data.properties.periods[0].detailedForecast;
  }

  const refreshButtonElement = document.getElementById('refreshButton');
refreshButtonElement.addEventListener('click', displayWeather);

  displayWeather();
