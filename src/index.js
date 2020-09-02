// display current date and time
function updateCurrentDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${hour}`;
  }
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
  return `${day}, ${hour}:${minutes}`;
}

// search and update to city searched

function displayLocationWeather(response) {
  document.querySelector("#city-displayed").innerHTML = response.data.name;
  document.querySelector(
    "#country-displayed"
  ).innerHTML = `(${response.data.sys.country})`;
  document.querySelector("#degrees-today").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "2df0d1984775f56e3531a89069fbd3fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayLocationWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2df0d1984775f56e3531a89069fbd3fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayLocationWeather);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// change temp units from °C to °F
function changeToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees-today");
  temperatureElement.innerHTML = 27;
}
function changeToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees-today");
  temperatureElement.innerHTML = 80;
}

// VARIABLES | display current date and time
let todayLine = document.querySelector("#right-now");
let currentDay = new Date();
todayLine.innerHTML = updateCurrentDate(currentDay);

// VARIABLES | search and update to city searched

let currentLocationButton = document.querySelector("#current-search-button");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

let citySearchForm = document.querySelector("#submit-navbar");
citySearchForm.addEventListener("submit", handleSubmit);
let citySearchButton = document.querySelector("#search-button");
citySearchButton.addEventListener("click", handleSubmit);

// VARIABLES | change temp units from °C to °F
let tempCelcius = document.querySelector("#celcius");
tempCelcius.addEventListener("click", changeToCelcius);
let tempFarenheit = document.querySelector("#farenheit");
tempFarenheit.addEventListener("click", changeToFarenheit);

searchCity("Miami");
