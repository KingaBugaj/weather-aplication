let currentTime = new Date();

function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let today = `${currentDay} ${currentHour}:${currentMinutes}`;
  return today;
}

let todayDate = document.querySelector("#current-day");
todayDate.innerHTML = currentDate(currentTime);

//format hours

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  console.log(forecast);

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    console.log(forecast);
    forecastElement.innerHTML += `<span class = "row"><div class = "col-3"></div><div class ="col=7" id = "weather-data"><u>${formatHours(
      forecast.dt * 1000
    )}</u> <strong>${Math.round(
      forecast.main.temp_max
    )}° </strong> ${Math.round(
      forecast.main.temp_min
    )}°</div><img class = "col-2" id = "forecast-icon" src ="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"></span>`;
  }
}

//getting temperature from api
function search(city) {
  let apiKey = "62adc1ac7dfc036aa7bc43938cb7257f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);

  let apiUrl1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl1).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity, showTemperature);

//getting geolocation

function showLocationTemperature(response) {
  let locationTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let locationTemperatureElement = document.querySelector("#today-temperature");
  locationTemperatureElement.innerHTML = `Temperature:  ${locationTemperature}`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey1 = "62adc1ac7dfc036aa7bc43938cb7257f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl1 = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey1}`;

  axios.get(apiUrl1).then(showLocationTemperature);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);

  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = `Temperature:  ${temperature}`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");

  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
  event.preventDefault;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
search("Lisbon");
