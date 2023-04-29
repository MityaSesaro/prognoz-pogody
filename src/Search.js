import React, { useState, useRef, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addCards } from './store/cardsSlice';
import { removeAll } from './store/cardsSlice';

function Search() {
    const [results, setResults] = useState([]);
    const [visible, setVisible] = useState('visible');
    const inputEl = useRef(null);


    const dispatch = useDispatch();

    const handleTintClick = useCallback((value) => {
        inputEl.current.value = value;
        setResults([]);
        setVisible('visible');
    }, [inputEl]);



    const addClick = () => {
        if (inputEl.current.value != '') {
            let a = inputEl.current.value;
            let str = localStorage.getItem('CityName') ? localStorage.getItem('CityName') : '[]';
            let arr = JSON.parse(str);

            if (arr.includes(a) == true) {
                let index = arr.indexOf(a);
                arr.splice(index, 1);
            }
            else {
                arr.push(a)
            }
            localStorage.setItem("CityName", JSON.stringify(arr));

            dispatch(addCards({ a }));
            inputEl.current.value = '';
        }
    }

    const removeClick = () => {
        dispatch(removeAll());
        localStorage.setItem("CityName", '[]');
    }

    const handleInputChange = useMemo(() => debounce(e => {
        const { value } = e.target;

        if (value.length < 3) return;

        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=c24c9a8974426d093953acf24d5bacc2`;
        axios.get(apiUrl).then((resp) => {
            const allCities = resp.data;
            setResults(allCities);
            setVisible('hidden')
        });
    }, 800), []);

    const style = { visibility: visible }

    return (
        <div className="Search">
            <input placeholder='Введите город' className="input-city" ref={inputEl} onChange={handleInputChange}></input>
            {results.length > 0 && (
                <ul className='city-table'>
                    {results.map((result, i) => (
                        <li key={i} onClick={() => handleTintClick(result.name)} className='table-token'>
                            {result.name}
                        </li>
                    ))}
                </ul>
            )
            }
            <div className="add-remove" style={style} onClick={() => addClick()}>Добавить</div>
            <div className="add-remove" style={style} onClick={() => removeClick()}>Очистить все</div>
        </div >
    );
}

export default Search;