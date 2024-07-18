// AccueilFilm.jsx

import axios from "axios";
import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Cardfilm from "./CardFilm";
import SearchFilm from './SearchFilm';

const AccueilFilm = ({ showSearch }) => {
  const [films, setFilms] = useState([]);
  const API_KEY = process.env.REACT_APP_API;

  useEffect(() => {
    const filmPopular = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=fr-US&page=1&api_key=${API_KEY}`);
        const result = response.data.results;
        if (result.length > 0) {
          setFilms(result);
        } else {
          setFilms([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };
    filmPopular();
  }, [API_KEY]);

  return (
    <div className='d-flex flex-wrap justify-content-center' style={{ height: '100%' }}>
      {showSearch ? (
        <SearchFilm />
      ) : (
        <>
          <Carousel style={{ width: '100%' }}>
            {films.map((movie) => (
              <Carousel.Item key={movie.id} style={{ width: '100%' }}>
                <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} className='d-block w-100' alt='...' />
                <Carousel.Caption style={{ textAlign: 'left', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <h1 style={{ fontSize: '1.5rem', fontStyle: 'arial', fontWeight: 'bold', paddingLeft: '0.7rem', paddingRight: '1rem' }}>{movie.original_title}</h1>
                  <h2 style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 'bold', paddingLeft: '0.3rem', paddingRight: '2rem' }}>Date de sortie : {movie.release_date}</h2>
                  {/* <p className="texteCarou" >{movie.overview}</p> */}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          {films.map((movie) => (
            <Cardfilm movie={movie} key={movie.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default AccueilFilm;
