let today;
let currentDate;
let currentCity;
let temperature;
let weather;
let percipation;
let windSpeed;
let windDirection;
let object;
let some;
let i;
let mainFrame
let hiddenFrame

window.onload = function() {
    today = document.querySelector(".forecast-header > .day");
    currentDate = document.querySelector(".forecast-header > .date");
    currentCity = document.querySelector(".forecast-content > .location");
    temperature = document.querySelector(".forecast-content > .degree > .num");
    weather = document.querySelector(".forecast-icon > img");
    percipation = document.getElementById('percipation');
    windSpeed = document.getElementById('wind');
    windDirection = document.getElementById('compass');
    dailyForecast = document.querySelectorAll('div.forecast-container > div:not(.today)');
    additionalData = document.querySelectorAll('.forecast-container-2 > div > div > div');
    getWeather();
};

function getWeather() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            showWeather(lat, long)
        })
    }
    else {
        return window.alert("Could not get location");
    }
}

function showWeather(lat, long) {
    const url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?callback=displayWeather&lang=uk`;
    
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object);
    displayDailyWeather(object);
}

//ne rabotat
function displayDailyWeather(object) {
    console.log('test');
    for (i=0; i< dailyForecast.length; i++){
        dailyForecast[i].querySelector('.day').innerText = 'not tue';
        dailyForecast[i].querySelector('.forecast-icon > img').setAttribute('src','images/icons/icon-4.svg');
        dailyForecast[i].querySelector('.degree').innerHTML = i+'<sup>o</sup>C';
        dailyForecast[i].querySelector('small').innerHTML = i + '<sup>o</sup>';
    }
}

function displayWeather(object) {
    //main stuff
    let datestuff = getDayName(object.currently.time);
    some = object;
    console.log(some);
    currentCity.innerText = object.timezone;
    today.innerText = datestuff[0];
    currentDate.innerText = datestuff[1] + ' ' + datestuff[2];
    weather.setAttribute('src', setImage(object.currently.icon));
    temperature.innerHTML = farenheitToCelsius(object.currently.apparentTemperature)+"<sup>o</sup>C"
    percipation.innerHTML = '<img src="images/icon-umberella.png" alt="">' + object.currently.precipProbability + '%'
    windSpeed.innerHTML = '<img src="images/icon-wind.png" alt="">' + knotsToKilometres(object.currently.windSpeed) + ' km/h';
    //additional data
    additionalData[0].querySelector('.num').innerText = object.currently.uvIndex;
    additionalData[1].querySelector('.num').innerText = object.currently.cloudCover;
    additionalData[2].querySelector('.num').innerText = object.currently.humidity;
    additionalData[3].querySelector('.num').innerText = object.currently.ozone;
    additionalData[4].querySelector('.num').innerText = object.currently.pressure;
    openClose()
    detailedDialy(object)


    //dialy forecast
    for (i=0; i< dailyForecast.length; i++){
        dailyForecast[i].querySelector('.day').innerText = getDayName(some.daily.data[i].time)[0];
        dailyForecast[i].querySelector('.forecast-icon > img').setAttribute('src',setImage(some.daily.data[i].icon));
        dailyForecast[i].querySelector('.degree').innerHTML = farenheitToCelsius(some.daily.data[i].apparentTemperatureMax)+'<sup>o</sup>C';
        dailyForecast[i].querySelector('small').innerHTML = farenheitToCelsius(some.daily.data[i].apparentTemperatureMin) + '<sup>o</sup>';
    }

}

function openClose() {
    mainFrame = document.querySelector('.today.forecast')
    hiddenFrame = document.querySelector('.forecast-table-2')

    mainFrame.onclick = function () {
        if(hiddenFrame.style.visibility == ''){
            hiddenFrame.style.visibility = 'hidden'
        }else {
            hiddenFrame.style.visibility = ''
        }
    }
}

function detailedDialy(object) {
    mainFrame = document.querySelectorAll('div.forecast-container > div:not(.today)')
    hiddenFrame = document.querySelector('.forecast-table-2')
    console.log('object'+object)

    function showAdditional(i) {
        if(hiddenFrame.style.visibility == 'hidden'){
            hiddenFrame.style.visibility = ''
        }
        additionalData[0].querySelector('.num').innerText = object.daily.data[i].uvIndex;
        additionalData[1].querySelector('.num').innerText = object.daily.data[i].cloudCover;
        additionalData[2].querySelector('.num').innerText = object.daily.data[i].humidity;
        additionalData[3].querySelector('.num').innerText = object.daily.data[i].ozone;
        additionalData[4].querySelector('.num').innerText = object.daily.data[i].pressure;
    }

    mainFrame[0].onclick = function () {
        showAdditional(0)
    }
    mainFrame[1].onclick = function () {
        showAdditional(1)
    }
    mainFrame[2].onclick = function () {
        showAdditional(2)
    }
    mainFrame[3].onclick = function () {
        showAdditional(3)
    }
    mainFrame[4].onclick = function () {
        showAdditional(4)
    }
    mainFrame[5].onclick = function () {
        showAdditional(5)
    }

}

function getDayName(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let d = new Date(date*1000);
    let dayname = days[d.getDay()];
    let daynum = d.getDate()
    let month = monthNames[d.getMonth()]
    return [dayname, daynum, month];
}

function setImage(imageName) {
    let images = {
        'clear-day': 'images/icons/icon-2.svg',
        'partly-cloudy-night': 'images/icons/icon-1.svg',
        'partly-cloudy-day': 'images/icons/icon-4.svg',

    }
    return images[imageName]

}

function farenheitToCelsius(k) {
    return Math.round((k - 32) * 0.5556 );
}

function knotsToKilometres(knot) {
    return Math.round(knot * 1.852);
}
function f() {
    
}