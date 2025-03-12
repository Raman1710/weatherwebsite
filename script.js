const apiKey = "d1826f3b0470f274b764cbe6448a57ee";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherCondition = document.querySelector(".weather-image")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status === 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data =  await response.json();

        const cityName = document.querySelector(".city");
        cityName.innerHTML = data.name;
        const temp = document.querySelector(".temp");
        temp.innerHTML = Math.round(data.main.temp) + "&degC";
        const humidity = document.querySelector(".humidity");
        humidity.innerHTML = data.main.humidity + "%";
        const wind = document.querySelector(".wind");
        wind.innerHTML = data.wind.speed + "km/hr";

    
        if(data.weather[0].main=="Clouds"){
            weatherCondition.src = "Images/clouds.png";
        }
        else if(data.weather[0].main=="Clear"){
            weatherCondition.src = "Images/clear.png";
        }
        else if(data.weather[0].main=="Rain"){
            weatherCondition.src = "Images/rain.png";
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherCondition.src = "Images/drizzle.png";
        }
        else if(data.weather[0].main=="Mist"){
            weatherCondition.src = "Images/mist.png";
        }
        else if(data.weather[0].main=="Snow"){
            weatherCondition.src = "Images/snow.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

function validateInput() {
    if (searchBox.value.trim() === "") {
        alert("Please enter a city name.");
        return false;
    }
    return true;
}
searchBtn.addEventListener("click",()=>{
    if(validateInput()){
        checkWeather(searchBox.value);
    }
 
})

searchBox.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        if(validateInput()){
            checkWeather(searchBox.value);
        }
    }

})
