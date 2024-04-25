import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/api';
import MovieSearch from './MovieSearch';

const MovieList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieData('Pokemon');
  }, []);

  const fetchMovieData = async (searchQuery) => {
    setLoading(true);
    try {
      const data = await fetchMovies(searchQuery);
      if (data && data.length > 0) {
        setFilteredData(data);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
    setLoading(false);
  };


  const handleMediaTypeChange = (value) => {
    console.log('media', value)
  }

  const handleYearChange = (value) => {
    console.log('Selected year:', value);
  };


  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      width: '30%',
      render: (text, record) => (
        <a key={record.imdbID} onClick={() => navigate(`/movie-details/${record.imdbID}`)}>{text}</a>
      ),
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      key: 'Year',
      width: '20%',
      sorter: (a, b) => a.Year - b.Year,
    },
    {
      title: 'IMDb ID',
      dataIndex: 'imdbID',
      key: 'imdbID',
      width: '20%',
      sorter: (a, b) => a.imdbID.localeCompare(b.imdbID), 
    },
  ];
  

  const handleMovieClick = (record) => {
    navigate(`/movie-details/${record.imdbID}`);
  };

  return (
    <div>
      <MovieSearch
        onSearch={fetchMovieData}
        handleMediaTypeChange={handleMediaTypeChange}
        handleYearChange={handleYearChange}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        onRow={(record) => ({
          onClick: () => handleMovieClick(record),
        })}
      />
    </div>
  );
};

export default MovieList;
