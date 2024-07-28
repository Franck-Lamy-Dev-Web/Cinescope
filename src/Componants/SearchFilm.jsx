import React, { useState, useEffect } from "react";
import axios from "axios";
import Cardfilm from "./CardFilm";

function SearchFilm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [films, setFilms] = useState([]);
  const API_KEY = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchFilms = async () => {
      if (searchTerm.trim() === '') {
        setFilms([]);
        return;
      }

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
        const result = response.data.results;

        const filmsData = result
          .filter(film => film.poster_path)
          .map(film => ({
            id: film.id,
            titre: film.title,
            overview: film.overview,
            release_date: film.release_date,
            poster_path: `https://image.tmdb.org/t/p/w500/${film.poster_path}`
          }));

        setFilms(filmsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };

    fetchFilms();
  }, [searchTerm, API_KEY]);

  return (
    <div>
      <div style={{ backgroundColor: 'grey', width: '100%' }}>
        <div className='d-flex flex-column align-items-center mb-4'>
          <h1 className='titreBar'>Recherche par titre:</h1>
          <input 
            className='form-control w-50' 
            type="text" 
            placeholder="Titre de film" 
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)} 
          />
        </div>

        <div className='d-flex flex-wrap justify-content-center' style={{ backgroundColor: 'black', padding: '20px' }}>
          {films.length > 0 ? films.map((movie) => (
            <div key={movie.id} className='m-2'>
              <Cardfilm movie={movie} />
            </div>
          )) : <p className="text-white">Aucun film avec image trouvé.</p>}
        </div>
      </div>
    </div>
  );
}

export default SearchFilm;
