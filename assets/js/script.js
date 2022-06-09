// Finds form element
var searchCityEl = document.querySelector("#citySearch");
var cityNameEl = document.querySelector("#cityName");
var uvIndexEl = document.querySelector("#uvindex");
const apiKey = "90c4e338221393ad783b079f0bee983d"

function currentDay() {
    var currentDate = moment().format("MMM Do YYYY, h:mm:ss a")
    document.getElementById("currentDay").innerText = currentDate
}

function whatsTheWeather() {
    event.preventDefault();
    // console.log("button works");

    var cityName = cityNameEl.value.trim();

    var coordinates = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
    fetch(coordinates)
        .then(function(response){
            return response.json()
                .then(function (data){
                    // console.log(data)
                    var latitude = data[0].lat
                    var longitude = data[0].lon

                    var asd = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
                    fetch(asd)
                        .then(function (response) {
                            return response.json().then(function (data){
                                // console.log(data)
                                var uvLevels = data.daily[0].uvi
                                if (uvLevels <= 2.9) {
                                    // console.log("uv levels are low")
                                } else if (3 <= uvLevels || uvLevels <= 5.9) {
                                    // console.log("uv levels are moderate")
                                } else {
                                    // console.log("uv levels are high")
                                }
                                document.getElementById("uvindex").textContent = "UV Index: " + uvLevels;
                            })
                            
                        })
                })


        })

    var weatherCondition = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + apiKey + "&units=imperial"
    fetch(weatherCondition)
        .then(function (response) {
            return response.json()
                .then(function (data) {
                    console.log(data)
                    document.getElementById("cityname").textContent = cityName
                    document.getElementById("temperature").textContent = "Temperature: " + data.main.temp + " °F";
                    document.getElementById("windspeed").textContent = "Windspeed: " + data.wind.speed + "MPH";
                    document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
        })
    })

    var weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial"
    fetch(weatherForecast)
        .then(function (response) {
            return response.json()
                .then(function (data) {
                    for (let i=0; i < 5; i++) {
                        document.getElementById("day" + [i+1] + "Date").textContent = data.list[i+1].dt_txt
                        document.getElementById("day" + [i+1] + "Temp").textContent = "Temperature: " + data.list[i].main.temp + " °F"
                        document.getElementById("day" + [i+1] + "Wind").textContent = "Wind: " + data.list[i].wind.speed + "MPH"
                        document.getElementById("day" + [i+1] + "Humidity").textContent = "Humidity: " + data.list[i].main.humidity + "%"
                    }
                })
        })
}

currentDay()
searchCityEl.addEventListener("submit", whatsTheWeather);