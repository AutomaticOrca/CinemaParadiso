const axios = require("axios");

const API_KEY = "AIzaSyB0MaGwLqaYurrPZF2jRTXX3Wd4c3-GjOE";

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new Error(
      "Could not find location for the specified address."
    );
    error.code = 422;
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  console.log(data.results);
  return coordinates;
}

module.exports = getCoordsForAddress;
