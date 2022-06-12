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
                                //console.log(uvLevels)

                                // check UV LEVEL TO REMOVE
                                var uviContainerEl = document.getElementById("uviContainer")

                                if (uviContainerEl.classList.contains("bg-success")) {
                                    uviContainerEl.classList.remove("bg-success")
                                } else if (uviContainerEl.classList.contains("bg-warning")) {
                                    uviContainerEl.classList.remove("bg-warnging")
                                } else if (uviContainerEl.classList.contains("bg-danger")) {
                                    uviContainerEl.classList.remove("bg-danger")
                                }

                                // check UV LEVEL TO ASIGN
                                if (uvLevels <= 2.9) {
                                    // console.log("uv levels are low")
                                    uviContainerEl.classList.add("bg-success")
                                } else if (3 <= uvLevels && uvLevels <= 5.9) {
                                    // console.log("uv levels are moderate")
                                    uviContainerEl.classList.add("bg-warning")
                                } else {
                                    // console.log("uv levels are high")
                                    uviContainerEl.classList.add("bg-danger")
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
                        document.getElementById("day" + [i+1] + "Date").textContent = data.list[i].dt_txt
                        document.getElementById("day" + [i+1] + "Icon").setAttribute("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                        document.getElementById("day" + [i+1] + "Temp").textContent = "Temperature: " + data.list[i].main.temp + " °F"
                        document.getElementById("day" + [i+1] + "Wind").textContent = "Wind: " + data.list[i].wind.speed + "MPH"
                        document.getElementById("day" + [i+1] + "Humidity").textContent = "Humidity: " + data.list[i].main.humidity + "%"
                    }
                })
        })
}

currentDay()
searchCityEl.addEventListener("submit", whatsTheWeather);