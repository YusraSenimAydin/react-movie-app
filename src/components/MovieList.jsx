import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/api';
import MovieSearch from './MovieSearch';

const MovieList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("Pokemon");
  const [mediaType, setMediaType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieData();
  }, [searchText, mediaType, selectedYear]);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(searchText, mediaType, selectedYear);
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
    setMediaType(value);
  }

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleSearch = (value) => {
    setSearchText(value);
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
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
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
