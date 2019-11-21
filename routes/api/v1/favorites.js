var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.post('/', (request, response) => {
  database('users').first()
    .then(user => {
      let userCredential = request.body.api_key
      let location = request.body.location
      if (userCredential === user.apiKey) {
        database('users').where('apiKey', userCredential)
          .then(user => {
            database('locations').insert({name: location, user_id: user})
            var data = {
                          "message": `${location} has been added to your favorites`
                        }
            response.status(200).send(data)
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
