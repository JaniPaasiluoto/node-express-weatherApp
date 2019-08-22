const request = require('request');

exports.getCurrentWeather = (req, res, next) => {
    res.render('current-weather', {
        pageTitle: 'Current Weather',
        weather: null,
        error: null,
        path: '/'
    });
};

exports.postCurrentWeather = (req, res, next) => {
    let city = req.body.city;
    let apiKey = '****************';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('error', {
                pageTitle: 'Error',
                weather: null, 
                error: 'Error, please try again!',
                path: '/error'
            });
        } else {
            let weather = JSON.parse(body);
            if (weather.main === undefined) {
                res.render('error', {
                    pageTitle: 'Error',
                    weather: null,
                    error: 'Error, please try again!',
                    path: '/error'
                });
            } else {
                let temp = weather.main.temp;
                let weatherText;
                if (temp < 10) {
                    weatherText = "It's quite chilly today";
                } else if (temp >= 10 && temp <= 18){
                    weatherText = "Temperature is ok, you can go outside";
                } else if (temp > 18 && temp <= 25) {
                    weatherText = "Oh, it's getting hot!";
                } else {
                    weatherText = "I'm melting!";
                }

                let wind = weather.wind.speed;
                let windText;
                if (wind > 20) {
                    windText = 'It is storming, stay inside!'
                } else if (wind > 13 && wind <= 20) {
                    windText = 'Wind is blowing pretty bad, be careful!'
                } else if (wind == 0) {
                    windText = 'There is no wind at the moment'
                } else {
                    windText = 'Wind is normal'
                }


                let timezone = weather.timezone;
                let options = {
                    hour: '2-digit',
                    minute: '2-digit'
                };
                
                let sunriseTime = new Date(weather.sys.sunrise * 1000).toGMTString('en-US', options);
                let sunsetTime = new Date(weather.sys.sunset * 1000).toGMTString('en-US', options);
                
                res.render('current-weather', { 
                    weather: weatherText,
                    image: weather.weather,
                    windText: windText,
                    temperature: weather.main.temp.toFixed(1),
                    city: weather.name,
                    windspeed: weather.wind.speed,
                    windDeg: weather.wind.deg,
                    sunrise: sunriseTime,
                    sunset: sunsetTime,
                    description: weather.weather[0].description,
                    error: null,
                    pageTitle: 'Current Weather',
                    path: '/'
                 });
            }
        }
    });
};

exports.getForecast = (req, res, next) => {
    res.render('five-day-weather', {
        pageTitle: 'Five-day weather forecast',
        forecast: null,
        error: null,
        path: '/five-day-weather'
    });
};

exports.postForecast = (req, res, next) => {
    let city = req.body.city;
    let apiKey = '****************';
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    

    request(url, function (err, response, body) {
         if (err) {
            res.render('error', {
                pageTitle: 'Error',
                forecast: null,
                error: 'Error, please try again!',
                path: '/error'
            });
        } else {
            let forecast = JSON.parse(body);
            if (forecast.list === undefined) {
                res.render('error', {
                    pageTitle: 'Error',
                    forecast: null,
                    error: 'Error, please try again!',
                    path: '/error'
                });
            } else {
                
                res.render('five-day-weather', {    
                    forecast: forecast.list,
                    city: forecast.city.name,
                    error: null,
                    pageTitle: 'Five-day weather forecast',
                    path: '/five-day-weather'
                });
            }
        }
    });
};
