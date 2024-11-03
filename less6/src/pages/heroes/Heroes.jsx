import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import classes from './Heroes.module.css'
import {Box, Button, Grid} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {HeroesContext} from "../../context/HeroesContext";
import HeroesService from "../../API/HeroesService";
import {Outlet, useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
const Heroes = () => {
    const navigate = useNavigate();
    const {heroesId, setHeroesId} = useContext(HeroesContext);
    const {isDarkMode, setIsDarkMode} = useContext(HeroesContext);
    const [persons, setPersons] = useState([]);
    const [info, setInfo] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);


    const {data} = useRequest( () => {
        HeroesService.getAllHeroes().then((res) => {
            const responseResults = res.data;
            setPersons(responseResults.results);
            setInfo(responseResults.info);
            setLoading(false);
        })
    });

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

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
        }
    ];

    const renderCharacters = () => {
        return (
            <Box sx={{ height: 600,
                width: '100%',
                backgroundColor: isDarkMode ? 'lightblue'  : 'white' }}>
                <DataGrid
                    rows={persons}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    onRowClick={(params) => { setHeroesId(params.id); navigate(`/heroes/${params.id}`)}}
                />
            </Box>
        );
    };


    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
            <h1>Rick and Morty Characters</h1>
            {loading && <div className="loading" id="loading">Loading…</div>}
            {!loading && (
                <Grid className={classes.containerHeroes} id="character-container">{renderCharacters()}</Grid>)
            }
            <Grid className={classes.pagination}>
                <Button variant="contained" id="prev-btn" onClick={previousButtonHandler} disabled={info && info.prev === null}>Previous 20
                </Button >
                <span id="page-num">Page {currentPage}</span>
                <Button variant="contained"  id="next-btn" onClick={nextButtonHandler} disabled={info && info.next === null}>Next 20</Button >
            </Grid>
            </Grid>
            <Grid item xs={5}>
            <Outlet/>
            </Grid>
        </Grid>
    );
};

export default Heroes;