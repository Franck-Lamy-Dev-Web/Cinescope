import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const DetailSerie = () => {
    const [serie, setSerie] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const { id } = useParams();
    const API_KEY = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchSerieData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=fr-FR`);
                setSerie(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchSerieData();
    }, [id, API_KEY]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favoriteSeries");

        if (storedFavorites) {
            const favoritesArray = JSON.parse(storedFavorites);
            const isSerieInFavorites = favoritesArray.some(fav => fav.id === serie?.id);
            setFavorite(isSerieInFavorites);
        } else {
            setFavorite(false);
        }
    }, [serie]);

    const favoriteSerie = () => {
        let tabFavSerie = [];

        if (localStorage.getItem('favoriteSeries')) {
            tabFavSerie = JSON.parse(localStorage.getItem('favoriteSeries'));
        }

        const isSerieInFavorites = tabFavSerie.some(fav => fav.id === serie.id);

        if (!isSerieInFavorites) {
            tabFavSerie.push(serie);
            localStorage.setItem('favoriteSeries', JSON.stringify(tabFavSerie));
            setFavorite(true);
        }
    };

    const removeFromFav = () => {
        let storedFavorites = localStorage.getItem('favoriteSeries');
        if (storedFavorites) {
            let favoritesArray = JSON.parse(storedFavorites);
            let updatedFavorites = favoritesArray.filter(fav => fav.id !== serie.id);
            localStorage.setItem('favoriteSeries', JSON.stringify(updatedFavorites));
            setFavorite(false);
        }
    };

    return (
        <div className="d-flex justify-content-center" style={{ minHeight: '100vh', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            {serie && (
                <Card className="mt-4 mb-4" style={{ width: '18rem', backgroundColor: 'black', color: 'white' }}>
                    <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                        alt={serie.name}
                    />
                    <Card.Body>
                        <Card.Title>Titre: {serie.name}</Card.Title>
                        <Card.Text>Date de première diffusion: {serie.first_air_date}</Card.Text>
                        <Card.Text>Résumé:</Card.Text>
                        <Card.Text>{serie.overview}</Card.Text>
                        <div className="BoutonsDetail">
                            <Button
                                variant={favorite ? "danger" : "primary"}
                                onClick={favorite ? removeFromFav : favoriteSerie}
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

export default DetailSerie;
