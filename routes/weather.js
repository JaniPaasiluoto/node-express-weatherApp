const path = require('path');

const express = require('express');

const weatherController = require('../controllers/weather');

const router = express.Router();

router.get('/', weatherController.getCurrentWeather);

router.post('/', weatherController.postCurrentWeather);

router.get('/five-day-weather', weatherController.getForecast);

router.post('/five-day-weather', weatherController.postForecast);

module.exports = router;