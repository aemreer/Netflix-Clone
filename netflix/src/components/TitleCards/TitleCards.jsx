import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



function TitleCards({ category, title }) {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDdjNmJhNDA1MjViM2FiNzQ3YmE1MWQ3NDQ4NTIyMSIsIm5iZiI6MTc0MTg3MTI1Ni45MjcsInN1YiI6IjY3ZDJkODk4MjU3NWYwMWIzYTYwOTkyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8m5a6j88JSaajT79t2aoaSxMOyLuMkvwMHuCRfdfKVM'
        }
    };

    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));
        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])

    return (
        <div className="title-cards">
            <h2>{title ? title : "Populer on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}

            </div>
        </div>
    )
}

export default TitleCards