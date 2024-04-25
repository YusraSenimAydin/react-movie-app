
import { useState } from 'react';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;

// eslint-disable-next-line react/prop-types
const MovieSearch = ({ onSearch, handleMediaTypeChange, handleYearChange }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <Search
        placeholder="Search movie title"
        enterButton="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={handleSearch}
        style={{ width: 300 }}
      />
      <Select defaultValue="movie" style={{ width: 120, marginRight: 10 }} onChange={handleMediaTypeChange}>
        <Option value="movie">Movies</Option>
        <Option value="series">TV Series</Option>
        <Option value="episode">TV Episodes</Option>
      </Select>
      <Select defaultValue="" style={{ width: 120 }} onChange={handleYearChange}>
        <Option value="">All Years</Option>
        {[...Array(30)].map((_, i) => {
          const year = new Date().getFullYear() - i;
          return <Option key={year} value={year}>{year}</Option>;
        })}
      </Select>
    </div>
  );
};

export default MovieSearch;
