const OMDB_API_KEY = "9f5ac0a4";

export const fetchMovies = async (
  searchQuery = "Pokemon",
  mediaType = "",
  year = ""
) => {
  let url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${OMDB_API_KEY}&page=1`;
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
    const totalResults = parseInt(data.totalResults);
    const remainingPages = Math.ceil((totalResults - 10) / 10);
    const remainingData = [];

    for (let i = 2; i <= remainingPages + 1; i++) {
      const nextPageUrl = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${OMDB_API_KEY}&page=${i}`;
      const nextPageResponse = await fetch(nextPageUrl);
      if (!nextPageResponse.ok) {
        throw new Error("Failed to fetch movies");
      }
      const nextPageData = await nextPageResponse.json();
      remainingData.push(...nextPageData.Search);
    }
    const allData = data.Search.concat(remainingData);
    return allData;
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
