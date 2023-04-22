const fetchBtn = document.getElementById('btn');
const landingPage = document.getElementById('landingPage');
const mainPage = document.getElementById('mainPage');
const dataContainer = document.getElementById('dataContainer');

let latitude;
let longitude;
let key = '82345ed3efa4d8ee2346cb0da8e628b4';
let weatherData = {};
fetchBtn.addEventListener('click', () => {
    getLocation();
    landingPage.style.display = "none";
    mainPage.style.display = "block";
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        let info = document.getElementById("info");
        info.innerHTML = "Geolocation is not supported by this browser.";
        info.style = 'block';
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);

    document.getElementById('lat').innerHTML = "Latitude: " + latitude;
    document.getElementById('lon').innerHTML = "Longitude: " + longitude;
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            weatherData = { ...data };
            console.log(weatherData);
            displayData(weatherData);
        })
        .catch((error) => {
            console.log(error);
        })


}

function displayData(weatherData){
    console.log(weatherData.sys.country)

   document.getElementById('locate').innerHTML += `${weatherData.sys.country}`;
   document.getElementById('timezone').innerHTML += `${weatherData.timezone}`;
   document.getElementById('latitude').innerHTML += `${weatherData.coord.lat}`;
   document.getElementById('longitude').innerHTML += `${weatherData.coord.lon}`;
   document.getElementById('windSpeed').innerHTML += `${weatherData.wind.speed}`;
   document.getElementById('pressure').innerHTML += `${weatherData.main.pressure}`;
   document.getElementById('humidity').innerHTML += `${weatherData.main.humidity}`;
   document.getElementById('windDirection').innerHTML += `${weatherData.wind.deg}`;
   document.getElementById('feels').innerHTML += `${weatherData.main.feels_like}`;
   document.getElementById('data').style.display = 'block';
}

let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 0,
  });
}

initMap();

// function myMap() {  
//     var mapOptions = {  
//         center: new google.maps.LatLng(51.5, -0.12),  
//         zoom: 10,  
//         mapTypeId: google.maps.MapTypeId.HYBRID  
//     }  
//     var map = new google.maps.Map(document.getElementById("map"), mapOptions);  
// }  