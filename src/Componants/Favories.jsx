import React, { useState, useEffect } from "react";
import { json } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorite");

        if (storedFavorites) {
            const favoritesArray = JSON.parse(storedFavorites);
            setFavorites(favoritesArray);
        } else {
            setFavorites([]);
        }
    }, []);

    
    const RemoveFromFav = (id)=> {
        let storedFavorites = localStorage.getItem('favorite');
        if (storedFavorites) {
            let favoritesArray = JSON.parse(storedFavorites);
            let updatedFavorites = favoritesArray.filter((favorites) =>favorites.id !==id);
            updatedFavorites = localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
            document.location.reload();
            
        }
    };

    return (
        <>

        <div className="result">
            {favorites.map((fav, index) => (
                <div key={index} className="CardFavMovi">

            <img src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`} alt={`Favorite ${index}`} className="imageFav" /> 
                <h2 className="titreFav">{fav.original_title}</h2>
                <p>{fav.overview}</p>

                <div>
                    <button className="boutonFavPage" onClick={()=>RemoveFromFav(fav.id)}>Retirer des favories</button>

                </div>

        </div>

                
            ))}
        </div>

        </>
    );
};

export default Favorites;
