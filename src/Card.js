import { useState } from 'react';

function Card({ result }) {
    const Url = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
    const ms = result.dt * 1000;
    const weekdayName = new Date(ms).toLocaleString('eng', { weekday: 'long' });

    return (
        <div className="Card">
            <h3>{weekdayName}</h3>
            <img src={Url} />
            <div className="descr">
                <p>{result.weather[0].main}</p>
                <p>Avg.temp: {result.main.temp}</p>
                <p>Pressure: {result.main.pressure}</p>
                <p>Wind speed: {result.wind.speed}</p>
                <p>Humidity: {result.main.humidity}</p>
            </div>
        </div>
    );
}

export default Card;