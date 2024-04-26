import React, { useState, useEffect } from 'react';
import { Table, Spin, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api/api';
import MovieSearch from './MovieSearch';

const { Option } = Select;

const MovieList = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("Pokemon");
  const [mediaType, setMediaType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();
  useEffect(() => {
    fetchMovieData();
  }, [searchText, mediaType, selectedYear, currentPage]);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(searchText, mediaType, selectedYear);
      setAllData(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
    setLoading(false);
  };

  const handleMediaTypeChange = (value) => {
    setMediaType(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchMovieData();
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
      title: 'Type',
      dataIndex: 'Type',
      width: '10%',
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allData.slice(startIndex, endIndex);
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
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={getPaginatedData().map((item) => ({ ...item, key: item.imdbID }))}
          onRow={(record) => ({
            onClick: () => handleMovieClick(record),
          })}
          pagination={{
            showSizeChanger: false,
            total: 50,
            current: currentPage,
            pageSize: pageSize,
            onChange: handlePageChange,
          }}
        />
      </Spin>
    </div>
  );
};

export default MovieList;
