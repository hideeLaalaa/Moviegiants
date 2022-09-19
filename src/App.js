import React from 'react'
import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import './App.css'
import SearchIcon from './search.svg'

const API_URL = 'https://www.omdbapi.com?apikey=9b4cef1d'
//const API_URL = 'https://www.velhect.com/station_monitor/api/request.php?sn=VELSM-001L&start=2022-09-01&end=2022-09-02&ch=5c18a705dd6e85b850675864d79529a7'

// const movie1 = {
//   Title: 'Superman, Spiderman or Batman',
//   Year: '2011',
//   imdbID: 'tt2084949',
//   Type: 'movie',
//   Poster:
//     'https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg',
// }
const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    console.log(data);
    setMovies(data.Search)
  }

  return (
    <div className='app'>
      <h1>Movie Giants</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  )
}

export default App
