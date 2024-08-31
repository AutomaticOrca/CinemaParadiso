const axios = require("axios");
const fs = require("fs");

const { movieTitles } = require("./movies");

// Your OMDB API key
const apiKey = "d8446e18";

// Function to fetch movie data from OMDB API
const getMovieData = async (title) => {
  try {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(
      title
    )}&apikey=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;
    const movieData = {
      plot: data.Plot,
      genres: data.Genre.split(", "),
      runtime: parseInt(data.Runtime),
      cast: data.Actors.split(", ").map((actor) => actor.trim()),
      poster: data.Poster,
      title: data.Title,
      countries: data.Country.split(", "),
      released: new Date(data.Released),
      directors: data.Director.split(", "),
      awards: data.Awards,
      year: parseInt(data.Year),
      rated: data.Rated,
      rateTomato: parseInt(
        data.Ratings.find((r) => r.Source === "Rotten Tomatoes")?.Value.replace(
          "%",
          ""
        ) || 0
      ),
      rateImdb: parseFloat(data.imdbRating),
      rateMetacritic: parseInt(data.Metascore),
    };
    return movieData;
  } catch (error) {
    console.error(`Error fetching data for ${title}:`, error);
    return null;
  }
};

const fetchAllMovies = async () => {
  let AllMoviesData = [];
  for (const mt of movieTitles) {
    const movieData = await getMovieData(mt);
    AllMoviesData.push(movieData);
  }
  return AllMoviesData;
};

const writeMoviesToFile = async (filename) => {
  const allMoviesData = await fetchAllMovies();
  fs.writeFile(filename, JSON.stringify(allMoviesData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log(`Successfully wrote data to ${filename}!`);
    }
  });
};

writeMoviesToFile("moviesData.json");
