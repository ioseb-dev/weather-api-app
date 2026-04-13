const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-bar-icon-container");
const weatherIcon = document.querySelector(".clear-image");
const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity-percentage");
const windSpeed = document.querySelector(".wind-speed");
const errorMessage = document.querySelector(".error-message");
const apiKey = "e5c6950718b5f0c0a69ca208b909c5da";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
async function checkWeather(cityName) {
    temperature.innerHTML = `Loading...`;
    city.textContent = "";
    humidity.textContent = "--%";
    windSpeed.textContent = "-- km/h";
    errorMessage.textContent = "";
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    if (response.status === 404) {
        errorMessage.textContent = "City not found. Please try again.";
        errorMessage.style.color = "#ffd6d6";
        temperature.innerHTML = `--°<span>C</span>`;
        city.textContent = "";
        humidity.textContent = "--%";
        windSpeed.textContent = "-- km/h";
        weatherIcon.src = "images/clear.png";
        document.body.style.background = "linear-gradient(135deg, #141e30, #243b55)";
        return;
    }
    const data = await response.json();
    errorMessage.textContent = "";
    temperature.innerHTML = `${Math.round(data.main.temp)}°<span>C</span>`;
    city.textContent = data.name;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
        document.body.style.background = "linear-gradient(135deg, #485563, #29323c)";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
        document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
        document.body.style.background = "linear-gradient(135deg, #4b6cb7, #182848)";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
        document.body.style.background = "linear-gradient(135deg, #4b6cb7, #355c7d)";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
        document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "images/snow.png";
        document.body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
    } else {
        weatherIcon.src = "images/clear.png";
        document.body.style.background = "linear-gradient(135deg, #141e30, #243b55)";
    }
}
searchBtn.addEventListener("click", () => {
    const cityName = searchBar.value.trim();
    if (cityName !== "") {
        checkWeather(cityName);
    }
});
searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const cityName = searchBar.value.trim();
        if (cityName !== "") {
            checkWeather(cityName);
        }
    }
});
window.addEventListener("load", () => {
    checkWeather("Kutaisi");
});