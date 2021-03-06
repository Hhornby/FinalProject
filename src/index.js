// OpenWeather API Key
let apiKey = "22be847f5a151995f32f39ccf3e64818";
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.src =
    "http://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    "@2x.png";
}

function searchCity(city, unit) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city, "metric");
}

function searchLocation(position) {
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function setUnit(unit) {
  let currentCity = document.querySelector("#city").innerHTML;
  searchCity(currentCity, unit);
}

function setUnitCel() {
  setUnit("metric");
  let units = document.querySelector("#units");
  units.innerHTML = "°C";
}

function setUnitFah() {
  setUnit("imperial");
  let units = document.querySelector("#units");
  units.innerHTML = "°F";
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let setCel = document.querySelector("#setCel");
setCel.addEventListener("click", setUnitCel);

let setFah = document.querySelector("#setFah");
setFah.addEventListener("click", setUnitFah);

searchCity("Edinburgh", "metric");
