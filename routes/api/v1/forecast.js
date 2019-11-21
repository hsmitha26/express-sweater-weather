var _env = require('dotenv').config();
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) =>  {
  database('users').first()
    .then(user => {
      let userCredential = request.body.api_key

      let location = request.query.location
      let geocode = process.env.GEOCODE_API_KEY

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
                var currentForecast = result.currently
                var hourlyForecast = result.hourly
                var dailyForecast = result.daily
                console.log(dailyForecast, 'daily forecast')
                // format data per spec for currentForecast, hourlyForecast and dailyForecast and then pass it to data
                // var data = {currently: currentForecast, hourly: hourlyForecast}
                // response.status(200).send(data)
              })
            })
          } else {
            response.status(401).send("Unauthorized")
          }
    })
  });

module.exports = router;
