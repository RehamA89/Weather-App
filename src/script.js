let now = new Date();
let todayDate = document.querySelector("#current-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes().toString().padStart(2, "0");

todayDate.innerHTML = `${day} ${hour}:${minute}`;

function convertToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = 19;
}

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", convertToCel);

function showCity(event) {
  event.preventDefault();

  let cityName = document.querySelector("#city-name");
  let searchInput = document.querySelector("#search-input");
  cityName.innerHTML = searchInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=a710bd8bd76400c9658ef649d9e81728&units=metric`;

  axios.get(apiURL).then(showTemperature);
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response.data);

  let currentTemp = document.querySelector("#temperature-value");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentwind = document.querySelector("#wind");
  let roundedWindSpeed = response.data.wind.speed.toFixed(0);
  currentwind.innerHTML = `Wind: ${roundedWindSpeed * 3.6} km/hr`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = "Guelph";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a710bd8bd76400c9658ef649d9e81728&units=metric`;

  axios.get(apiGeoUrl).then(showTemperature);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", showCurrentPosition);
