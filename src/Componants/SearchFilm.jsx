import React, { useState, useEffect } from "react";
import axios from "axios";
import Cardfilm from "./CardFilm";


function SearchFilm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [films, setFilms] = useState([]);
  const API_KEY = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
        const result = response.data.results;
        if (result.length > 0) {
          const filmsData = result.map(film => ({
            id: film.id,
            titre: film.original_title,
            overview: film.overview,
            release_date: film.release_date,
            poster_path: film.poster_path ? `https://image.tmdb.org/t/p/w500/${film.poster_path}` : 'https://static.vecteezy.com/ti/vecteur-libre/p1/4141669-aucune-photo-ou-image-blanche-icone-chargement-images-ou-image-manquante-marque-image-non-disponible-ou-image-coming-soon-sign-simple-nature-silhouette-in-frame-illustrationle-isolee-vectoriel.jpg',
          }));
          setFilms(filmsData);
        } else {
          setFilms([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };

    fetchFilms();
  }, [searchTerm]);

  return (
    <>
    <div style={{backgroundColor: 'grey', width: '100%'}}>

      <div className='d-flex flex-wrap justify-content-center' style={{ height: '100%' }}>
        <div className='barHaut d-flex flex-column align-items-center mb-4'>
          <h1 className='titreBar'>CinéScope</h1>
          <input className='w-500 m-lg-4' size="lg" type="text" placeholder="Titre de film" onChange={(event) => setSearchTerm(event.target.value)} />
        </div>

        <div className='d-flex flex-wrap justify-content-center' style={{ backgroundColor: 'black' }}>
          {films.map((movie) => (
            <div key={movie.id} className='m-2'>
              <Cardfilm movie={movie} />
            </div>
          ))}
        </div>
      </div>
      </div>

    </>
  );
}

export default SearchFilm;
