import React, {useEffect, useState} from 'react';

import '../styles/style.css'
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState();
    const [info, setInfo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = 'https://rickandmortyapi.com/api/character';
        axios.get(apiUrl).then((res) => {
            const responseResults = res.data;
            setPersons(responseResults.results);
            setInfo(responseResults.info);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        console.log(persons);
        console.log(info);
    }, [persons]);

    function previousButtonHandler() {
        axios.get(info.prev).then((res) => {
            const responseResults = res.data;
            setPersons(responseResults.results);
            setInfo(responseResults.info);
            setCurrentPage(responseResults.info.next ? responseResults.info.next.split('=')[1] - 1 : responseResults.info.pages)
        })
    }

    function nextButtonHandler() {
        axios.get(info.next).then((res) => {
            const responseResults = res.data;
            setPersons(responseResults.results);
            setInfo(responseResults.info);
            setCurrentPage(responseResults.info.next ? responseResults.info.next.split('=')[1] - 1 : responseResults.info.pages)
        })
    }

    const renderCharacters = () => {
        if (!persons) return null;
        return persons.map((person) => (
            <div key={person.id}>
                <img src={person.image} alt={person.name}/>
                <h3>{person.name}</h3>
                <p className="status">{person.status}</p>
            </div>
        ));
    };


    return (
        <div>
            <h1>Rick and Morty Characters</h1>
            {loading && <div className="loading" id="loading">Loading…</div>}
            {!loading && (
                <div className="container" id="character-container">{renderCharacters()}</div>)
            }
            <div className="pagination">
                <button id="prev-btn" onClick={previousButtonHandler} disabled={info && info.prev === null}>Previous
                </button>
                <span id="page-num">Page {currentPage}</span>
                <button id="next-btn" onClick={nextButtonHandler} disabled={info && info.next === null}>Next</button>
            </div>
        </div>
    );
}

export default App;