const cinemas = require("./Paradiso.cinemas.json");
const movies = require("./Paradiso.movies.json");
const fs = require("fs");

/**
 * Selects a random element from an array
 * @param {Array} array - The source array
 * @returns {*} - A random element from the array
 */
const getRandomElement = (array) => {
  if (array.length === 0) {
    throw new Error("Array cannot be empty");
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

/**
 * Gets the current date and a date n months from now
 * @param {number} n - The number of months from now
 * @returns {Array<Date>} - An array containing the current date and the date n months later
 */
const getStartEndDate = (n) => {
  const now = new Date();
  const nMonthsLater = new Date(now);
  nMonthsLater.setMonth(now.getMonth() + n);
  return [now, nMonthsLater];
};

/**
 * Generates a random date between two given dates
 * @param {Date} start - The start date
 * @param {Date} end - The end date
 * @returns {Date} - A random date between the start and end dates
 */
const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

/**
 * Generates a random integer between two values, inclusive
 * @param {number} min - The minimum value (inclusive)
 * @param {number} max - The maximum value (inclusive)
 * @returns {number} - A random integer between min and max, inclusive
 */
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates dummy session data
 * @param {Array} movies - The array of movies
 * @param {Array} cinemas - The array of cinemas
 * @returns {Object} - The generated dummy session data
 */
const generateDummySessionData = (movies, cinemas) => {
  const [startDate, endDate] = getStartEndDate(10);
  const randomMovieId = getRandomElement(movies)._id.$oid;
  const randomCinemaId = getRandomElement(cinemas)._id.$oid;
  const randomDate = generateRandomDate(startDate, endDate);
  const sessionTime = getRandomIntInclusive(10, 20);
  const price = Math.random() < 0.5 ? 25 : 20; // Randomly select either 25 or 20

  return {
    movieId: randomMovieId,
    cinemaId: randomCinemaId, // Use the actual cinema ID if available,
    available_seats: 30,
    date: randomDate,
    time: sessionTime,
    price: parseFloat(price),
  };
};

/**
 * Generates multiple dummy session data
 * @param {Array} movies - The array of movies
 * @param {Array} cinemas - The array of cinemas
 * @param {number} count - The number of dummy session data to generate
 * @returns {Array<Object>} - An array containing generated dummy session data
 */
const generateMultipleDummySessions = (movies, cinemas, count) => {
  const sessions = [];
  for (let i = 0; i < count; i++) {
    sessions.push(generateDummySessionData(movies, cinemas));
  }
  return sessions;
};

const writeArrayToFile = (filename, array) => {
  fs.writeFile(filename, JSON.stringify(array, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log(`Successfully wrote data to ${filename}!`);
    }
  });
};

const dummySessions = generateMultipleDummySessions(movies, cinemas, 300);
writeArrayToFile("sessions.json", dummySessions);
