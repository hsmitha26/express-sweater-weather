var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

// pass in JSON with location and api_key into url

router.post('/', (request, response) => {
  database('users').first()
    .then(user => {
      let userCredential = request.body.api_key
      let location = request.body.location

      if (userCredential === user.apiKey) {
        console.log(userCredential, location, "got it!")
        // add location to user's locations
        // data = {
                  //   "message": "Denver, CO has been added to your favorites",
                  // }
        // response.status(200).send(data)
      } else {
        response.sendStatus(401)
      }

    })
});

module.exports = router;
