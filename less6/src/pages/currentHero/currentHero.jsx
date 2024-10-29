import React, {useContext, useEffect, useState} from 'react';
import {HeroesContext} from "../../context/HeroesContext";
import HeroesService from "../../API/HeroesService";
import {Card, CardContent} from "@mui/material";

const CurrentHero = () => {
    const {heroesId, setHeroesId} = useContext(HeroesContext);
    const {isDarkMode, setIsDarkMode} = useContext(HeroesContext);
    const [hero, setHero] = useState({});
    useEffect(() => {
        if (heroesId !== 0) {
        HeroesService.getHeroById(heroesId).then((p) => setHero(p.data));
        console.log(heroesId)
        }
    }, [heroesId]);

    if (heroesId === 0) {
        return <p>Choose hero from list</p>;
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: isDarkMode ? 'lightblue'  : 'white'
            }}>
                <img src={hero.image} alt={hero.name} style={{ width: '100%', maxWidth: '200px' }} />
                <p>{hero.id + '. ' + hero.name}</p>
                <p>{hero.status}</p>
            </CardContent>
        </Card>

    );
};

export default CurrentHero;