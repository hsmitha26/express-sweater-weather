var express = require('express');
var router = express.Router();

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
  database('users').where('apiKey', userCredential).first()
    .then(user => {
      if (userCredential === user.apiKey) {
        database('locations').where({user_id: user.id})
        .then(locations => {
          // map over locations array and make api call for each element.  Will need to use async/await so api doesn't time out.
          console.log(locations, "locations found")
        })
      } else {
        response.sendStatus(401)
      }
    })
});

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
