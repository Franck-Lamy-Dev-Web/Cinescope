import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Cardfilm = ({ movie }) => {
    const navigate = useNavigate();

    const goToDetail = (id) => {
        console.log(`TestGoToD ${id}`);
        navigate(`/DétailFilm/${id}`);
    };

    if (!movie.poster_path) {
        return null;
    }

    return (
        <div className="CardSearch">
            <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Button variant="primary" onClick={() => { goToDetail(movie.id); console.log(movie.id); }}>
                        Plus de détails
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Cardfilm;
