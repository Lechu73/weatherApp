let weatherForm = document.querySelector('.weather__form')
let weatherCity = document.querySelector('.weather__city')
let weatherApi = document.querySelector('.weather__api')
let APIURL = 'http://api.weatherapi.com/v1/forecast.json?key=caafa1cfcdfc455983374341220907&aqi=no&days=4&q='
let weatherLoader = document.querySelector(".weather__loader")
let showLoaderTime = 1000
let map;

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let city = weatherCity.value

    if (city === "") {
        weatherCity.style.border = "2px  solid red"
        return false
    }
    showLoader();
    weatherCity.style.border = "none"
    let fullAPIURL = APIURL + city

    fetch(fullAPIURL)
        .then(response => {
            if (!response.ok) {
                throw Error(response.json())
            }
            return response.json()
        })
        .then(data => {
            hideLoader()
            let view = ''
            view += `<div class="weather__mainInfo">`
            view += `<div class="weather__temp">
                <span class="degree">${data.current.temp_c}</span>
                <span class="unit">&deg; C</span>
            </div>`

            view += `<div class="weather__icon">
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
            </div>`
            view += `<div class = "weather__data">
         <p>The amount of rainfall:<b> ${data.current.precip_mm} mm</b> </p>
         <p>Humidity:<b> ${data.current.humidity} %</b> </p>
         <p>Wind:<b> ${data.current.wind_kph} km/h</b> </p>
         </div>`
            view += `</div>`

            // next days
            view += `<h2 class="weather__next">Next days weather:</h2>`
            view += `<div class = "weather__days">`
            // single day
            data.forecast.forecastday.forEach(day => {
                view += `<div class = "weather__day">`
                view += `<div class = "weather__date">${day.date}</div>`
                view += `<div class = "weather__icon">
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                    </div>`
                view += `<div class = "weather__avg">${day.day.avgtemp_c}
                    &deg; C</div>`
                view += `</div>`
                // console.log(day)
            })
            view += `</div>`

            view += '<div id="weather__map" class="weather__map"></div>'



            setTimeout(() => {
                weatherApi.innerHTML = view;
                showMap(data.location.lat, data.location.lon)
            }, showLoaderTime)



        }).catch(error => {
            hideLoader()
            setTimeout(() => {

                weatherApi.innerHTML = `<div class="weather__error">City not found or try again leter</div>`
            }, showLoaderTime)
        })
})



let showLoader = () => {
    weatherLoader.style.display = 'block'
    weatherApi.innerHTML = "";
}

let hideLoader = () => {

    setTimeout(() => {
        weatherLoader.style.display = 'none'
        showMap(data.location.lat, data.location.lon)
    }, showLoaderTime)

}

let clearApiData = () => {
    weatherApi.innerHTML = ''
}

let showMap = (lat, lng) => {
    map = new google.maps.Map(document.getElementById("weather__map"), {
        center: { lat, lng },
        zoom: 8,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7b7b7b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c8d7d4"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#070707"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]
    });

    let marker = new google.maps.Marker({
        position: { lat, lng },
        map: map
    });
}



weatherCity.addEventListener('keyup', () => {
    if (weatherCity.value === '') {
    }
})