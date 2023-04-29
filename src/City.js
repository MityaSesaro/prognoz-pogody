import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeCards } from './store/cardsSlice';

function City() {
    const [results, setResults] = useState([]);
    const array = JSON.parse(localStorage.getItem('CityName'));
    const dispatch = useDispatch();
    const addCard = useSelector(state => state.addCard.cards);

    useEffect(() => {
        setResults([]);
        if (array.length > 0) array.map((cityName) => {
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a6894b6ba946cfeefbfc60bd9b1ee7c4`;
            axios.get(apiUrl).then((resp) => {
                setResults(results => [...results, resp.data]);
            })
        })
    }, [addCard.length]);

    function Delete(name) {
        let index = array.indexOf(name);
        array.splice(index, 1);
        localStorage.setItem('CityName', JSON.stringify(array))
        setResults(results.filter(objects => objects.city.name != name));

        dispatch(removeCards({ name }))
    }

    return (
        <div>
            {(results.length == array.length) && (
                results.map((objects) => {
                    return <div className="City" key={objects.city.name}>
                        <div className="title">
                            <h2>{objects.city.name}</h2>
                            <div className="close" onClick={() => Delete(objects.city.name)}></div>
                        </div>
                        <div className="content">
                            {objects.list.map((data, index) => {
                                if (data.dt_txt.includes('12:00:00')) {
                                    return < Card key={index} result={data} />
                                }
                            })
                            }
                        </div>
                    </div>
                })
            )}
        </div >
    );
}

export default City;