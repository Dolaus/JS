import React, { useContext, useState } from 'react';
import axios from "axios";
import classes from './Heroes.module.css';
import { Box, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { HeroesContext } from "../../context/HeroesContext";
import HeroesService from "../../API/HeroesService";
import { Outlet, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";

const Heroes = () => {
    const navigate = useNavigate();
    const { heroesId, setHeroesId, isDarkMode } = useContext(HeroesContext);
    const [info, setInfo] = useState({ results: [], info: null });
    const [currentPage, setCurrentPage] = useState(1);

    const { loading } = useRequest(HeroesService.getAllHeroes, {
        onSuccess: (res) => {
            setInfo({ results: res.data.results, info: res.data.info });
            setCurrentPage(res.data.info.next ? res.data.info.next.split('=')[1] - 1 : res.data.info.pages);
        }
    });

    const handlePagination = (url) => {
        if (!url) return;
        axios.get(url).then((res) => {
            setInfo({ results: res.data.results, info: res.data.info });
            setCurrentPage(res.data.info.next ? res.data.info.next.split('=')[1] - 1 : res.data.info.pages);
        });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 }
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <h1>Rick and Morty Characters</h1>
                {loading ? (
                    <div className="loading" id="loading">Loading…</div>
                ) : (
                    <Box sx={{
                        height: 600,
                        width: '100%',
                        backgroundColor: isDarkMode ? 'lightblue' : 'white'
                    }}>
                        <DataGrid
                            rows={info.results}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            onRowClick={(params) => {
                                setHeroesId(params.id);
                                navigate(`/heroes/${params.id}`);
                            }}
                        />
                    </Box>
                )}
                <Grid className={classes.pagination}>
                    <Button variant="contained" id="prev-btn" onClick={() => handlePagination(info?.info?.prev)} disabled={!info?.info?.prev}>
                        Previous 20
                    </Button>
                    <span id="page-num">Page {currentPage}</span>
                    <Button variant="contained" id="next-btn" onClick={() => handlePagination(info?.info?.next)} disabled={!info?.info?.next}>
                        Next 20
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={5}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default Heroes;
