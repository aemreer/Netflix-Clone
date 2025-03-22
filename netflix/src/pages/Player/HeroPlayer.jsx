import React from 'react'
import { useNavigate } from 'react-router-dom'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import './Player.css'


function HeroPlayer() {

    const navigate = useNavigate();
    return (
        <div className="player">
            <img onClick={() => (navigate('/'))} src={back_arrow_icon} alt="" />
            <iframe width='90%' height="90%" src={`https://www.youtube.com/embed/80dqOwAOhbo`} frameborder="0" title='trailer' allowFullScreen ></iframe>
            <div className="player-info">
                <p>2018-11-14</p>
                <p>The Protector</p>
                <p>Clip</p>
            </div>
        </div>
    )
}

export default HeroPlayer