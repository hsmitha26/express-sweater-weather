var _env = require('dotenv').config();
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.post('/', (request, response) => {
  let userCredential = request.body.api_key
  let location = request.body.location

  database('users').where('apiKey', userCredential).first()
    .then(user => {
      if (userCredential === user.apiKey) {
        var data = {
                        "message": `${location} has been added to your favorites`
                      }
        database('locations').insert({name: location, user_id: user.id})
          .then(response.status(200).send(data))
      } else {
        response.sendStatus(401)
      }
    })
});

router.get('/', (request, response) => {
  let userCredential = request.body.api_key
  database('users').where({apiKey: userCredential}).first()
    .then(user => {
      if (userCredential === user.apiKey) {
        database('locations').where({user_id: user.id}).select('name')
          .then(locations => {
              forecastArray(locations)
              .then(locationForecast => {
                response.status(200).send(locationForecast)
              })
            })
      } else {
        response.sendStatus(401)
      }
    })
});

async function forecastArray(locations) {
  let data = await Promise.all(locations.map(async (location) => {
    let forecast = await fetchForecast(location)
    return forecast;
  }))
  return data;
};

async function fetchForecast(location) {
  let geocode = process.env.GEOCODE_API_KEY
  let darkSky = process.env.DARKSKY_API_KEY

  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${geocode}`);
    let result = await response.json();
    let latitude = result.results[0].geometry.location.lat
    let longitude = result.results[0].geometry.location.lng

    let darkSkyResponse = await fetch(`https://api.darksky.net/forecast/${darkSky}/${latitude},${longitude}`)
      let forecastData = await darkSkyResponse.json();
      var currentForecast = forecastData.currently
      var data = {location: location.name, currently: currentForecast}
      return data;
};

router.delete('/', (request, response) => {
  let userCredential = request.body.api_key
  let location = request.body.location

  database('users').where('apiKey', userCredential).first()
    .then(user => {
      if (userCredential === user.apiKey) {
        database('locations').where({user_id: user.id, name: location}).del()
        .then(response.sendStatus(204))
      } else {
      response.sendStatus(401)
      }
    })
});

module.exports = router;
