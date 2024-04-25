// api/api.js
const OMDB_API_KEY = "9f5ac0a4";

export const fetchMovies = async (searchQuery = "Pokemon", mediaType = "", year = "") => {
  let url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${OMDB_API_KEY}`;
  if (mediaType) {
    url += `&type=${mediaType}`;
  }
  if (year) {
    url += `&y=${year}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
