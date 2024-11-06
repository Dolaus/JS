import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import PaginationFooter from "./PaginationFooter";
import {getUserInformation} from "../api/userActions";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useAppDispatch} from "../hooks/hooks";
import {fetchExhibits} from "../store/slices/exhibitSlice";
import {deleteExhibition} from "../api/exhibitActions";
import CommentPage from "./CommentPage";

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
    const dispatch = useAppDispatch();
    const exhibitsArray = useSelector((state: RootState) => state.exhibit.exhibitions);
    const totalPageFromExhibitSlice = useSelector((state: RootState) => state.exhibit.totalPage);
    const url = useSelector((state: RootState) => state.exhibit.url);

    const staticUrl = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com';
    const [exhibitions, setExhibitions] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUser, setCurrentUser] = useState({username: ''});
    const [selectedExhibitId, setSelectedExhibitId] = useState<number | null>(null);

    const setCurrentPageHandler = (currentPage: number) => {
        setCurrentPage(currentPage);
    }

    useEffect(() => {
        setSelectedExhibitId(null);
        const fetchCurrentUser = async () => await getUserInformation();
        dispatch(fetchExhibits({currentPage: 1, url: url}));

        setExhibitions(exhibitsArray)
        setCurrentPage(1)
        fetchCurrentUser().then(r => {
            setCurrentUser(r.data);
        });
    }, [url]);

    useEffect(() => {
        setExhibitions(exhibitsArray)
        setTotalPage(totalPageFromExhibitSlice);
    }, [exhibitsArray]);

    useEffect(() => {
        dispatch(fetchExhibits({currentPage: currentPage, url: url}));
        setExhibitions(exhibitsArray)

    }, [currentPage]);

    const deleteExhibitHandler = async (id: number) => {
        await deleteExhibition(id);
        dispatch(fetchExhibits({currentPage: currentPage, url: url}));
    }

    const toggleComments = (id: number) => {
        setSelectedExhibitId(selectedExhibitId === id ? null : id);
    };

    return (
        <Box sx={{flexGrow: 1, px: 2}}>
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
                                    <Button onClick={() => toggleComments(exhibition.id)}>
                                        Comments
                                    </Button>
                                    {currentUser.username === exhibition.user.username ? <Button onClick={() => deleteExhibitHandler(exhibition.id)}>

                                    Delete
                                    </Button> : ""}
                                </CardContent>
                                {selectedExhibitId === exhibition.id && <CommentPage id={exhibition.id}/>}

                            </Card>
                        </Grid>
                    ))
                ) : (
                    <p>No exhibitions found</p>
                )}
            </Grid>
            { totalPage > 1 ? <PaginationFooter lastPage={totalPage} currentPageHandler={setCurrentPageHandler}
                              currentPage={currentPage}/> : ''}
        </Box>
    );
};

export default HomePage;
