var express = require('express');
var router = express.Router();

// pass in JSON with location and api_key into url

router.post('/', (request, response) => {
  console.log(request.body, "got it!")
});

module.exports = router;
