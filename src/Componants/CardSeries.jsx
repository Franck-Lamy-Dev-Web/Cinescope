import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const CardSeries = ({ movie }) => {
    const navigate = useNavigate();

    const goToDetail = (id) => {
        navigate(`/DétailSerie/${id}`);
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
                        Titre: {movie.name}
                    </Card.Title>
                    <div className="mt-auto">
                        <Button variant="primary" onClick={() => goToDetail(movie.id)}>
                            Plus de détails
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CardSeries;
