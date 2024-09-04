import API_URL from "./apiConfig";

import axios from "axios";

const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${movieId}`);
    return response.data.movie;
  } catch (err) {
    throw new Error("fetchMovieById failed");
  }
};

const fetchCinemaById = async (cinemaId) => {
  try {
    const response = await axios.get(`${API_URL}/cinemas/${cinemaId}`);
    return response.data.cinema;
  } catch (err) {
    throw new Error("fetchCinemaById failed");
  }
};

const fetchSessionById = async (sessionId) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/${sessionId}`);
    return response.data.session;
  } catch (err) {
    throw new Error("fetchSessionById failed");
  }
};

const fetchSessions = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/${endpoint}`);
    return response.data.sessions;
  } catch (err) {
    throw new Error(`Error fetching sessions from ${endpoint}`);
  }
};

const placeOrder = async ({ sessionId, userId, tickets }) => {
  try {
    const orderData = {
      sessionId,
      userId,
      tickets,
    };
    console.log(orderData);
    console.log(`${API_URL}/purchases`);
    const response = await axios.post(`${API_URL}/purchases/`, orderData);

    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.message);
    throw new Error("Faild to place order");
  }
};

export {
  fetchMovieById,
  fetchCinemaById,
  fetchSessionById,
  fetchSessions,
  placeOrder,
};
