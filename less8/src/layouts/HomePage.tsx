import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent, Grid} from "@mui/material";
import {useRequest} from "ahooks";
import {getAllExhibitions} from "../api/exhibitActions";
import Typography from "@mui/material/Typography";
import PaginationFooter from "./PaginationFooter";
import {getUserInformation} from "../api/userActions";
import Button from "@mui/material/Button";

interface IUser {
    id: number;
    username: string
}

interface IExhibition {
    commentCount: number;
    createdAt: Date;
    description: string;
    id: number;
    imageUrl: string;
    user: IUser
}

const HomePage = () => {
    const staticUrl = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com';
    const [exhibitions, setExhibitions] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUser, setCurrentUser] = useState({username: ''});

    const setCurrentPageHandler = (currentPage: number) => {
        setCurrentPage(currentPage);
    }

    const {data, loading} = useRequest(async () => getAllExhibitions(currentPage, 10), {
        onSuccess: (result) => {
            setExhibitions(result.data)
            setCurrentPage(+result.page)
            setTotalPage(result.lastPage)
        }
    });

    useEffect(() => {
        const fetchExhibitions = async () => await getAllExhibitions(currentPage, 10)

        fetchExhibitions().then(result => {
            setExhibitions(result.data)
            setCurrentPage(+result.page)
            setTotalPage(result.lastPage)
        });
    }, [currentPage]);

    useEffect(() => {
        const fetchCurrentUser = async () => await getUserInformation();

        fetchCurrentUser().then(r => {
            setCurrentUser(r.data);
        });
    }, []);

    return (
        <Box sx={{flexGrow: 1, px: 2}}>
            {loading && <p>Loading...</p>}
            <Grid container spacing={2} sx={{px: 10, py: 1}}>
                {exhibitions.length > 0 ? (
                    exhibitions.map((exhibition: IExhibition, index: number) => (
                        <Grid item xs={12} sm={12} md={12} key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Card style={{width: '100%', maxWidth: '700px'}}>
                                <CardContent>
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}>
                                        <img src={staticUrl + exhibition.imageUrl}
                                             style={{width: '100%', maxWidth: '200px'}}/>
                                    </CardContent>
                                    <Typography variant="body2">
                                        {exhibition.description}
                                    </Typography>
                                    <Button>
                                        Comments
                                    </Button>
                                    {currentUser.username === exhibition.user.username ? <Button>
                                        Delete
                                    </Button> : ""}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <p>No exhibitions found</p>
                )}
            </Grid>
            <PaginationFooter lastPage={totalPage} currentPageHandler={setCurrentPageHandler}
                              currentPage={currentPage}/>
        </Box>
    );
};

export default HomePage;
