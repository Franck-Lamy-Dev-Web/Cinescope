import React, { useState, useEffect } from "react";
import axios from "axios";
import photoSalle from '../assets/images/vue-salle-cinema.jpg';
import CardFilm from "./CardFilm";

const RechercheGenre = () => {
  const [listeGenres, setListeGenres] = useState([]);
  const [filmGenre, setFilmGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const API_KEY = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`
        );
        setListeGenres(response.data.genres);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des genres :", error);
      }
    };
    fetchGenres();
  }, [API_KEY]);

  useEffect(() => {
    if (selectedGenre) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&with_genres=${selectedGenre}`
          );
          setFilmGenre(response.data.results);
        } catch (error) {
          console.error("Erreur lors de la récupération des films :", error);
        }
      };
      fetchMovies();
    }
  }, [selectedGenre, API_KEY]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Recherche par genre</h1>
      <select
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
        onChange={handleGenreChange}
      >
        <option value="">Sélectionnez un genre</option>
        {listeGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      {selectedGenre && (
        <div>
          <h2>Films du genre sélectionné</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filmGenre.map((movie) => (
              <CardFilm movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!selectedGenre && (
          <img src={photoSalle} alt="Salle de cinéma" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
      </div>
    </div>
  );
};

export default RechercheGenre;
