import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_KEY = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            const storedFavoritesMovies = localStorage.getItem("favorite");
            const storedFavoritesSeries = localStorage.getItem("favoriteSeries");

            let favoritesArray = [];

            if (storedFavoritesMovies) {
                const moviesArray = JSON.parse(storedFavoritesMovies);
                const updatedMovies = await Promise.all(
                    moviesArray.map(async (favorite) => {
                        const response = await axios.get(`https://api.themoviedb.org/3/movie/${favorite.id}?api_key=${API_KEY}&language=fr-FR`);
                        return response.data;
                    })
                );
                favoritesArray = [...favoritesArray, ...updatedMovies];
            }

            if (storedFavoritesSeries) {
                const seriesArray = JSON.parse(storedFavoritesSeries);
                const updatedSeries = await Promise.all(
                    seriesArray.map(async (favorite) => {
                        const response = await axios.get(`https://api.themoviedb.org/3/tv/${favorite.id}?api_key=${API_KEY}&language=fr-FR`);
                        return response.data;
                    })
                );
                favoritesArray = [...favoritesArray, ...updatedSeries];
            }

            setFavorites(favoritesArray);
            setLoading(false);
        };
        fetchFavorites();
    }, [API_KEY]);

    const removeFromFav = (id) => {
        const storedFavoritesMovies = localStorage.getItem("favorite");
        const storedFavoritesSeries = localStorage.getItem("favoriteSeries");

        let updatedFavoritesMovies = [];
        let updatedFavoritesSeries = [];

        if (storedFavoritesMovies) {
            const favoritesArray = JSON.parse(storedFavoritesMovies);
            updatedFavoritesMovies = favoritesArray.filter(favorite => favorite.id !== id);
            localStorage.setItem("favorite", JSON.stringify(updatedFavoritesMovies));
        }

        if (storedFavoritesSeries) {
            const favoritesArray = JSON.parse(storedFavoritesSeries);
            updatedFavoritesSeries = favoritesArray.filter(favorite => favorite.id !== id);
            localStorage.setItem("favoriteSeries", JSON.stringify(updatedFavoritesSeries));
        }

        setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== id));
    };

    return (
        <div className="result d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#313131', padding: '20px' }}>
            {loading ? (
                <p className="text-white">Chargement...</p>
            ) : (
                favorites.map((fav, index) => (
                    <Card key={index} className="m-2 d-flex flex-column justify-content-between" style={{ width: '18rem', backgroundColor: 'black', color: 'white', flex: '0 1 18rem' }}>
                        <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`}
                            alt={fav.title || fav.name}
                        />
                        <Card.Body className="d-flex flex-column">
                            <div>
                                <Card.Title>{fav.title || fav.name}</Card.Title>
                                <Card.Text>
                                    {fav.release_date ? `Date de sortie: ${fav.release_date}` : `Date de première diffusion: ${fav.first_air_date}`}
                                </Card.Text>
                                <Card.Text>Résumé:</Card.Text>
                                <Card.Text>{fav.overview}</Card.Text>
                            </div>
                            <div className="mt-auto BoutonsDetail d-flex justify-content-center">
                                <Button
                                    variant="danger"
                                    onClick={() => removeFromFav(fav.id)}
                                >
                                    <FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.32px', color: 'red' }} />
                                    <span>Retirer des favoris</span>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export default Favorites;
