import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorite");
        if (storedFavorites) {
            const favoritesArray = JSON.parse(storedFavorites);
            setFavorites(favoritesArray);
        }
    }, []);

    const removeFromFav = (id) => {
        const storedFavorites = localStorage.getItem("favorite");
        if (storedFavorites) {
            const favoritesArray = JSON.parse(storedFavorites);
            const updatedFavorites = favoritesArray.filter(favorite => favorite.id !== id);
            localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        }
    };

    return (
        <div className="result">
            {favorites.map((fav, index) => (
                <div key={index} className="d-flex justify-content-center" style={{ minHeight: '100vh', alignItems: 'center', backgroundColor: '#313131' }}>
                    <Card className="mt-4 mb-4" style={{ width: '18rem', backgroundColor: 'black', color: 'white' }}>
                        <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`}
                            alt={fav.original_title}
                        />
                        <Card.Body>
                            <Card.Title>{fav.original_title}</Card.Title>
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
                </div>
            ))}
        </div>
    );
};

export default Favorites;
