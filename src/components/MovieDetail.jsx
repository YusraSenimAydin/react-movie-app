import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/api';
import {  Spin } from 'antd';


const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { imdbID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieDetails(imdbID);
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchData();
  }, [imdbID]);

  if (!movieDetails) {
    return <div className="flex justify-center items-center h-screen">  
    <Spin size="large" tip="Loading..."/>
    </div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="object-cover md:w-48" src={movieDetails.Poster} alt={movieDetails.Title} />
        </div>
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-2">{movieDetails.Title}</h2>
          <p className="text-gray-600">Release Year: {movieDetails.Year}</p>
          <p className="text-gray-600">Duration: {movieDetails.Runtime}</p>
          <p className="text-gray-600">Genre: {movieDetails.Genre}</p>
          <p className="text-gray-600">Director: {movieDetails.Director}</p>
          <p className="text-gray-600">Cast: {movieDetails.Actors}</p>
          <p className="text-gray-600">IMDb Rating: {movieDetails.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;