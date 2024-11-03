import React, { useContext, useEffect, useState } from 'react';
import { HeroesContext } from "../../context/HeroesContext";
import HeroesService from "../../API/HeroesService";
import { Card, CardContent } from "@mui/material";
import { useRequest } from 'ahooks';

const CurrentHero = () => {
    const { heroesId } = useContext(HeroesContext);
    const { isDarkMode } = useContext(HeroesContext);

    const { data: hero, loading, error } = useRequest(async () => {
        if (heroesId !== 0) {
            return await HeroesService.getHeroById(heroesId).then((r) => r.data);
        }
        return Promise.resolve(null);
    }, {
        refreshDeps: [heroesId],
        onError: (err) => console.error('Error fetching hero:', err)
    });

    if (heroesId === 0) {
        return <p>Choose hero from list</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !hero) {
        return <p>Failed to load hero data.</p>;
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: isDarkMode ? 'lightblue' : 'white'
            }}>
                <img src={hero.image} alt={hero.name} style={{ width: '100%', maxWidth: '200px' }} />
                <p>{hero.id + '. ' + hero.name}</p>
                <p>{hero.status}</p>
            </CardContent>
        </Card>
    );
};

export default CurrentHero;
