
const url = 'http://api.openweathermap.org/data/2.5/weather?'
const icon_url = 'http://openweathermap.org/img/wn'
const api_key = 'APi'

const getLocation = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.querySelector('#lat').textContent = position.coords.latitude.toFixed(3) + ', '
            document.querySelector('#lng').textContent = position.coords.longitude.toFixed(3)
        }, (error) => {
            alert(error)
        })
    } else {
        alert("Your browser does not support geolocation");
    }
}

const getWeather = (lat, lng) => {
    const address = url + 
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' +
    '&appid='+api_key
    axios.get(address)
    .then(response => {
        const json = response.data
        temp_span.innerHTML = json.main.temp + '&#8451;'
        speed_span.innerHTML = json.wind.speed + ' m/s'
        direction_span.innerHTML = json.wind.deg + '&#176;'
        description_span.innerHTML = json.weather[0].description
        const image = icon_url + json.weather[0].icon + '"2x.png'
        icon_img.src = image
    }) .catch(error => {
        alert(error)
    })
}

getLocation();
