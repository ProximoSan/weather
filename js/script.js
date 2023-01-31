const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "d5495714d2296c8e43f91473c42f6f78"
}
const city = document.querySelector('.search-city');
const today = new Date();
const now  = today.toLocaleDateString('en-US');

function getWeatherData(city) {
    fetch(`${param.url}weather?q=${city}&appid=${param.appid}&units=metric&lang=ru`)
    .then(res => res.json())
    .then(
        showWeather
    );
    
}
getWeatherData('Кременчуг')

document.querySelector('.city__location').onclick = function getWeatherLacotion () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude} = success.coords;

        fetch(`${param.url}weather?lat=${latitude}&lon=${longitude}&appid=${param.appid}&units=metric&lang=ru`)
        .then(res => res.json())
        .then(data => {
            getWeatherData(data.name);
        })

    })
}

document.querySelector('.search__btn').onclick = function getWeatherInput () {
	const input = document.querySelector('.search__input');
	getWeatherData(input.value);
	input.value = '';
}

function showWeather(data) {
	console.log(data)
    document.querySelector('.city__name').innerHTML = data.name;
    document.querySelector('.date').innerHTML = now;
	document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
	document.querySelector('.weather__temperature').innerHTML = `${Math.round(data.main.temp)}&deg`;
	document.querySelector('.weather__description').textContent = data.weather[0].description;
	document.querySelector('#wind').textContent = `${data.wind.speed} м/с, ${directionOfWind(data.wind.deg)}`;
	document.querySelector('#pressure').textContent = `${data.main.pressure} мм рт. ст.`;
	document.querySelector('#humidity').textContent = `${data.main.humidity} %`;
	document.querySelector('#cloudiness').textContent = `${data.clouds.all} %`;
}

const directionOfWind = (degree) => {
	if (degree > 337.5) {return 'северный'};
	if (degree > 292.5) {return 'северно-западный'};
	if (degree > 247.5) {return 'западный'};
	if (degree > 202.5) {return 'юго-западный'};
	if (degree > 157.5) {return 'южный'};
	if (degree > 122.5) {return 'юго-восточный'};
	if (degree > 67.5) {return 'восточный'};
	if (degree > 22.5) {return 'северо-восточный'};
	return 'северный';
}