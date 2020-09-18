function updateCurrentDate(timestamp) {
  let date = new Date(timestamp);
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

function displayLocationWeather(response) {
  let iconElement = document.querySelector("#weather-icon");
  let iconApi = `${response.data.weather[0].icon}`;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city-displayed").innerHTML = response.data.name;
  document.querySelector(
    "#country-displayed"
  ).innerHTML = `(${response.data.sys.country})`;
  document.querySelector("#degrees-today").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute("class", getIcon(iconApi));
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-per-three-hours");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
      <div class="time">
        ${formatHours(forecast.dt * 1000)}
        </br class="week-icons">
        <i id="forecast-weather-icon" class="${getIcon(
          forecast.weather[0].icon
        )}"></i>
        <p class="num">
         ${Math.round(forecast.main.temp_max)}°
        </p>
      </div>
    </div>
    `;
  }
}

function getIcon(iconApi) {
  let classIcon = "fas fa-cloud";
  if (iconApi === "01d") {
    classIcon = `fas fa-sun`;
  } else if (iconApi === "02d") {
    classIcon = `fas fa-cloud-sun`;
  } else if (iconApi === "01n") {
    classIcon = `fas fa-moon`;
  } else if (iconApi === " 02n") {
    classIcon = `fas fa-cloud-moon`;
  } else if (iconApi === "11d") {
    classIcon = `fas fa-bolt`;
  } else if (
    iconApi === "03d" ||
    iconApi === "03n" ||
    iconApi === "04d" ||
    iconApi === "04n"
  ) {
    classIcon = `fas fa-cloud`;
  } else if (iconApi === "09d") {
    classIcon = `fas fa-cloud-rain`;
  } else if (iconApi === "10d") {
    classIcon = `fas fa-cloud-showers-heavy`;
  } else if (iconApi === "50d") {
    classIcon = `fas fa-stream`;
  } else if (iconApi === "13d") {
    classIcon = `far fa-snowflake`;
  }
  return classIcon;
}

function searchCity(city) {
  let apiKey = "2df0d1984775f56e3531a89069fbd3fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayLocationWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "2df0d1984775f56e3531a89069fbd3fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayLocationWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function changeToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees-today");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function changeToFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#degrees-today");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

let todayLine = document.querySelector("#right-now");
let currentDay = new Date();
todayLine.innerHTML = `Last updated: ${updateCurrentDate(currentDay)}`;

let currentLocationButton = document.querySelector("#current-search-button");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

let citySearchForm = document.querySelector("#submit-navbar");
citySearchForm.addEventListener("submit", handleSubmit);

let citySearchButton = document.querySelector("#search-button");
citySearchButton.addEventListener("click", handleSubmit);

let celsiusTemperature = null;

let tempCelcius = document.querySelector("#celcius");
tempCelcius.addEventListener("click", changeToCelcius);

let tempFarenheit = document.querySelector("#farenheit");
tempFarenheit.addEventListener("click", changeToFarenheit);

searchCity("Miami");
