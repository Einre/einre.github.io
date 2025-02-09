document.addEventListener("DOMContentLoaded", function () {
    // Call Open-Meteo API
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=43.9276&longitude=-69.9759&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&models=gfs_seamless"; 

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("weatherTable");

        // Extract data from API response
        const dates = data.daily.time;
        const maxTemps = data.daily.temperature_2m_max;
        const minTemps = data.daily.temperature_2m_min;
        const sunrises = data.daily.sunrise;
        const sunsets = data.daily.sunset;
        const precipitation = data.daily.precipitation_probability_max;

        // Loop through the 7-day forecast
        for (let i = 0; i < dates.length; i++) {
            const row = `
                <tr>
                    <td>${dates[i]}</td>
                    <td>${minTemps[i]}°F</td>
                    <td>${maxTemps[i]}°F</td>
                    <td>${sunrises[i].split("T")[1]}</td>
                    <td>${sunsets[i].split("T")[1]}</td>
                    <td>${precipitation[i]}%</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    })
    .catch(error => console.error("Error fetching weather data:", error));
});
