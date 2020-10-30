// 1 part

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

// 2 part

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity, showTemperature);

//change city by searching

function changeCity(event) {
  event.preventDefault;
  let inputChangeCity = document.querySelector("#city-input");
  let apiKeyChangeCity = "f2036d03d84454a7a988926035afa0db";
  let apiUrlChangeCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputChangeCity.value}&units=metric&appid=${apiKeyChangeCity}`;
  let searchCity = document.querySelector("h1");
  searchCity.innerHTML = `${inputChangeCity.value}`;

  axios.get(apiUrlChangeCity).then(showTemperature);
}

let newCity = document.querySelector("#city-form");
newCity.addEventListener("submit", changeCity);

//getting geolocation

function showLocationTemperature(response) {
  console.log(response.data.name);
  let locationTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let locationTemperatureElement = document.querySelector("#today-temperature");
  locationTemperatureElement.innerHTML = `${locationTemperature}°`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey1 = "f2036d03d84454a7a988926035afa0db";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl1 = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey1}`;
  console.log(apiUrl);
  axios.get(apiUrl1).then(showLocationTemperature);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

//getting temperature from api
let city = "city";

let apiKey = "f2036d03d84454a7a988926035afa0db";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

/*
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  return `${day}, ${hours}:${minutes}`;
}
*/

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = `${temperature}°`;
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
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
  //let dateElement = document.querySelector("#current-day");
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);

  axios.get(apiUrl).then(showTemperature);
}
