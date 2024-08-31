const { cinemasAddresses } = require("./cinemas");
const getCoordsForAddress = require("./location");
const fs = require("fs");

// getLocation("45 St Pauls St, Randwick NSW");
// return { lat: -33.920051, lng: 151.2433397 }
const getLocation = async (address) => {
  try {
    const coordinates = await getCoordsForAddress(address);
    return coordinates;
  } catch (error) {
    console.error("get coordinates failed...", error);
  }
};

const getAllLocations = async (allAddress) => {
  const allLocations = [];
  for (const address of allAddress) {
    const coordinates = await getLocation(address.address);
    if (coordinates) {
      const locationData = {
        name: address.name,
        address: address.address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
      allLocations.push(locationData);
    }
  }

  return allLocations;
};

const writeCinemasToFile = async (filename) => {
  const allCinemaData = await getAllLocations(cinemasAddresses);
  console.log(allCinemaData);
  fs.writeFile(filename, JSON.stringify(allCinemaData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log(`Successfully wrote data to ${filename}!`);
    }
  });
};

writeCinemasToFile("cinemas");
