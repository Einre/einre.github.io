document.addEventListener("DOMContentLoaded", function () {
    //Define the latitude and longitude variables
    const lat = 43.92716;
    const long = -69.992355;

    // Call Open-Meteo API
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&models=gfs_seamless'; 

    console.log(apiUrl); //Debugging: Check if the URL is correct

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); //Debugging: Check if the response is correct

        const tableBody = document.getElementById("weatherTable");

        // Extract data from API response
        const dates = data.daily.time;
        const maxTemps = data.daily.temperature_2m_max;
        const minTemps = data.daily.temperature_2m_min;
        const sunrises = data.daily.sunrise;
        const sunsets = data.daily.sunset;
        const precipitation = data.daily.precipitation_probability_max;
        const rain = data.daily.rain_sum;
        const showers = data.daily.showers_sum;
        const snow = data.daily.snowfall_sum

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
                    <td>${rain[i]}</td>
                    <td>${showers[i]}</td>
                    <td>${snow[i]}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    })
    .catch(error => console.error("Error fetching weather data:", error));
});
