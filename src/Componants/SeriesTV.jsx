import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CardSeries from './CardSeries';

const SeriesTV = () => {
    const [series, setSeries] = useState([]);
    const API_KEY = process.env.REACT_APP_API;

    useEffect(() => {
        const seriesPopular = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=fr-FR`);
                const result = response.data.results;
                if (result.length > 0) {
                    setSeries(result);
                } else {
                    setSeries([]);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des séries:', error);
            }
        };
        seriesPopular();
    }, [API_KEY]);

    return (
        <Container>
            <h1 className="my-4" style={{textAlign:'center'}}>Séries TV Populaires</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {series.map((serie) => (
                    <CardSeries key={serie.id} movie={serie} />
                ))}
            </div>
        </Container>
    );
}

export default SeriesTV;
