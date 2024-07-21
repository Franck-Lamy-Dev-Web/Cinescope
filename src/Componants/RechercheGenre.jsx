import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import photoSalle from '../assets/images/vue-salle-cinema.jpg';
import { useNavigate } from "react-router-dom";

const RechercheGenre = () => {
  const [listeGenres, setListeGenres] = useState([]);
  const API_KEY = process.env.REACT_APP_API;
  const navigate = useNavigate();

  useEffect(() => {
    const ListeParGenre = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`
        );
        const result = response.data.genres;
        if (result.length > 0) {
          setListeGenres(result);
        } else {
          setListeGenres([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des genres :", error);
      }
    };
    ListeParGenre();
  }, [API_KEY]);

  const HandleGenreChange = (event) =>{
    navigate('/PageEnConstruction');
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Recherche par genre</h1>
      <select style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      onChange={HandleGenreChange}
      >
        {listeGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={photoSalle} alt="Salle de cinéma" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default RechercheGenre;
