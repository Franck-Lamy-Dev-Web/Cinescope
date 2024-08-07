import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Cardfilm = ({ movie, type }) => {
    const navigate = useNavigate();

    const goToDetail = (id, type) => {
        // if (type === 'movie') {
        //     navigate(`/DétailFilm/${id}`);
        // } else if (type === 'tv') {
        //     navigate(`/DétailSerie/${id}`);
        // }
        navigate(`/DétailFilm/${id}`);
    };

    if (!movie.poster_path) {
        return null;
    }

    return (
        <div className="CardSearch">
            <Card style={{ width: '18rem', height: '36rem', margin: '1rem', padding: '0.2rem' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>
                        Titre: {movie.title ? movie.title : movie.name}
                    </Card.Title>
                    <div className="mt-auto">
                        <Button variant="primary" onClick={() => goToDetail(movie.id, type)}>
                            Plus de détails
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Cardfilm;
