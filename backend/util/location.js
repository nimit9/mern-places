const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = process.env.GEOCODING_API_KEY;

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${encodeURIComponent(
      address)}`
  );


  const data = response.data;

  if (!data) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }
  const latitude = data.data[0].latitude;
  const longitude = data.data[0].longitude;
  
  coordinates={lat: latitude, lng: longitude}
  return coordinates;
}

module.exports = getCoordsForAddress;
