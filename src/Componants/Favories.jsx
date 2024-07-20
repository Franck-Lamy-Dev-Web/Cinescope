import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const API_KEY = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchFavorites = async () => {
            const storedFavorites = localStorage.getItem("favorite");
            if (storedFavorites) {
                const favoritesArray = JSON.parse(storedFavorites);

                // Fetch localized details for each favorite movie
                const updatedFavorites = await Promise.all(
                    favoritesArray.map(async (favorite) => {
                        const response = await axios.get(`https://api.themoviedb.org/3/movie/${favorite.id}?api_key=${API_KEY}&language=fr-FR`);
                        return response.data;
                    })
                );
                
                setFavorites(updatedFavorites);
            }
        };
        fetchFavorites();
    }, [API_KEY]);

    const removeFromFav = (id) => {
        const storedFavorites = localStorage.getItem("favorite");
        if (storedFavorites) {
            const favoritesArray = JSON.parse(storedFavorites);
            const updatedFavorites = favoritesArray.filter(favorite => favorite.id !== id);
            localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites.filter(favorite => favorite.id !== id));
        }
    };

    return (
        <div className="result d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#313131', padding: '20px' }}>
            {favorites.map((fav, index) => (
                <Card key={index} className="m-2" style={{ width: '18rem', backgroundColor: 'black', color: 'white', flex: '0 1 18rem' }}>
                    <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`}
                        alt={fav.title}
                    />
                    <Card.Body>
                        <Card.Title>{fav.title}</Card.Title>
                        <Card.Text>Date de sortie: {fav.release_date}</Card.Text>
                        <Card.Text>Résumé:</Card.Text>
                        <Card.Text>{fav.overview}</Card.Text>
                        <div className="BoutonsDetail">
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
            ))}
        </div>
    );
};

export default Favorites;
