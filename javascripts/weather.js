const apiKey = "786df8f7d03205d017d3894185a2aca6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiGeoUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=";



const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}` ||apiGeoUrl + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "/images/cloud_basic.png";    
        }
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "/images/clear_sun.png"; 
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "/images/rain1.png"; 
        }
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "/images/mist.png"; 
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "/images/dris.png"; 
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        
    }
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(searchBox.value);
    }
});

// this for the audio autoplay
window.addEventListener('click', function () {
    
    var audio = document.getElementById("background-music");
    audio.play();
});