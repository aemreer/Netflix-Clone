import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { SiDsautomobiles } from 'react-icons/si';
import { useNavigate, useParams } from 'react-router-dom'

function Player() {
    const navigate = useNavigate()

    const { id } = useParams()

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    })

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDdjNmJhNDA1MjViM2FiNzQ3YmE1MWQ3NDQ4NTIyMSIsIm5iZiI6MTc0MTg3MTI1Ni45MjcsInN1YiI6IjY3ZDJkODk4MjU3NWYwMWIzYTYwOTkyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8m5a6j88JSaajT79t2aoaSxMOyLuMkvwMHuCRfdfKVM'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0]))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className="player">
            <img onClick={() => (navigate('/'))} src={back_arrow_icon} alt="" />
            <iframe width='90%' height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" title='trailer' allowFullScreen ></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player