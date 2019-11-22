var _env = require('dotenv').config();
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var currentWeather = require('../../../formattedData/currentWeather');
var hourlyWeather = require('../../../formattedData/hourlyWeather');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) =>  {
  let userCredential = request.body.api_key
  let location = request.query.location
  let geocode = process.env.GEOCODE_API_KEY

  database('users').where({apiKey: userCredential}).first()
    .then(user => {
      if (userCredential === user.apiKey) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${geocode}`)
          .then(response => response.json())
          .then(result => {
            let latitude = result.results[0].geometry.location.lat
            let longitude = result.results[0].geometry.location.lng
            let darkSky = process.env.DARKSKY_API_KEY

            fetch(`https://api.darksky.net/forecast/${darkSky}/${latitude},${longitude}`)
              .then(response => response.json())
              .then(result => {
                var currentForecast = new currentWeather(result.currently)
                var hourlyForecast = new hourlyWeather(result.hourly)
                var dailyForecast = result.daily
                var data = {location: location, currently: currentForecast, hourly: hourlyForecast, daily: dailyForecast}
                response.status(200).send(data)
              })
            })
          } else {
            response.status(401).send("Unauthorized")
          }
    })
  });

module.exports = router;
