import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Detailfilm = () => {
    const [film, setFilm] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const { id } = useParams();
    const API_KEY = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
                setFilm(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchFilmData();
    }, [id]); 

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
        <div>
            {film && (
                <div className="CardMovieDetail">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                        alt={film.original_title}
                        className="PosterMovieDetail"
                    />

                    <div className="blocDetail">
                        <h1>{film.original_title}</h1>
                        <div>
                            <p>Date de sortie:</p>
                            <p>{film.release_date}</p>
                        </div>
                        <div>
                            <p className="Resume">Resumé:</p>
                            <p className="DecriptionMovie">{film.overview}</p>
                        </div>

                        <div className="BoutonsDetail">
                            <button
                                className={favorite ? "RemoveFav" : "AddFavories"}
                                onClick={favorite ? removeFromFav : favoriteMovie}
                            >
                                <FontAwesomeIcon icon={faHeart} style={{ marginRight: '5px', color: favorite ? 'red' : 'black' }} />
                                <span>
                                    {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detailfilm;
