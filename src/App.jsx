import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieDetail from './components/MovieDetail'; 

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie-details/:imdbID" element={<MovieDetail />} /> 
        </Routes>
      </>
    </Router>
  );
}

export default App;
