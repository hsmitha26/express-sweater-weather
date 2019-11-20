var express = require('express');
var router = express.Router();

require('dotenv').config()
const geocode = process.env.GEOCODE_API_KEY
const darkSky = process.env.DARKSKY_API_KEY

const fetch = require('node-fetch');
