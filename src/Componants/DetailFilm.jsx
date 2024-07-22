import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Detailfilm = () => {
    const [film, setFilm] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const { id } = useParams();
    const API_KEY = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
                setFilm(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchFilmData();
    }, [id, API_KEY]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorite");

        if (storedFavorites) {
            const favoritesArray = JSON.parse(storedFavorites);
            const isMovieInFavorites = favoritesArray.some(fav => fav.id === film?.id);
            setFavorite(isMovieInFavorites);
        } else {
            setFavorite(false);
        }
    }, [film]);

    const favoriteMovie = () => {
        let tabFavMov = [];

        if (localStorage.getItem('favorite')) {
            tabFavMov = JSON.parse(localStorage.getItem('favorite'));
        }

        const isMovieInFavorites = tabFavMov.some(fav => fav.id === film.id);

        if (!isMovieInFavorites) {
            tabFavMov.push(film);
            localStorage.setItem('favorite', JSON.stringify(tabFavMov));
            setFavorite(true);
        }
    };

    const removeFromFav = () => {
        let storedFavorites = localStorage.getItem('favorite');
        if (storedFavorites) {
            let favoritesArray = JSON.parse(storedFavorites);
            let updatedFavorites = favoritesArray.filter(fav => fav.id !== film.id);
            localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
            setFavorite(false);
        }
    };

    return (
        <div className="d-flex justify-content-center" style={{ minHeight: '100vh', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            {film && (
                <Card className="mt-4 mb-4" style={{ width: '18rem', backgroundColor: 'black', color: 'white' }}>
                    <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                        alt={film.title}
                    />
                    <Card.Body>
                        <Card.Title>Titre: {film.title}</Card.Title>
                        <Card.Text>Date de sortie: {film.release_date}</Card.Text>
                        <Card.Text>Résumé:</Card.Text>
                        <Card.Text>{film.overview}</Card.Text>
                        <div className="BoutonsDetail">
                            <Button
                                variant={favorite ? "danger" : "primary"}
                                onClick={favorite ? removeFromFav : favoriteMovie}
                            >
                                <FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.32px', color: favorite ? 'red' : 'white' }} />
                                <span>
                                    {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                                </span>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default Detailfilm;


//URL de recherche série par titre 
// url = https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}&language=fr-FR&page=1`);