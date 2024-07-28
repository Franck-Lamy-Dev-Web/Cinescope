import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardSeries from './CardSeries';

const RechercheSeries = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSerie, setSearchSerie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_KEY = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchSeries = async () => {
            if (searchTerm.trim() === '') {
                setSearchSerie([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchTerm}&language=fr-FR&page=1`);
                const result = response.data.results;
                const seriesData = result
                    .filter(serie => serie.poster_path)
                    .map(serie => ({
                        id: serie.id,
                        name: serie.name,
                        overview: serie.overview,
                        poster_path: serie.poster_path,
                    }));

                setSearchSerie(seriesData);
            } catch (error) {
                setError('Erreur lors de la récupération des séries.');
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, [searchTerm, API_KEY]);

    return (
        <div>
            <div style={{ backgroundColor: 'grey', width: '100%' }}>
                <div className='d-flex flex-column align-items-center mb-4'>
                    <h1 className='titreBar'>Recherche de séries par titre:</h1>
                    <input 
                        className='form-control w-50' 
                        type="text" 
                        placeholder="Titre de série" 
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)} 
                    />
                </div>

                {loading && <p className="text-white">Chargement...</p>}
                {error && <p className="text-white">{error}</p>}

                <div className='d-flex flex-wrap justify-content-center' style={{ backgroundColor: 'black', padding: '20px' }}>
                    {searchSerie.length > 0 ? searchSerie.map((serie) => (
                        <div key={serie.id} className='m-2'>
                            <CardSeries movie={serie} />
                        </div>
                    )) : !loading && <p className="text-white">Aucune série avec image trouvée.</p>}
                </div>
            </div>
        </div>
    );
};

export default RechercheSeries;
