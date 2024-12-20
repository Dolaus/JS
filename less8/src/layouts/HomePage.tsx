import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import PaginationFooter from "./PaginationFooter";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/hooks";
import { fetchExhibits } from "../store/slices/exhibitSlice";
import { deleteExhibition } from "../api/exhibitActions";
import { checkUser } from "../store/slices/userSlice";
import PostItem from "./PostItem";
import { IExhibition } from "../../interface/IExhibition";
import useSocket from "../hooks/useSocket";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const exhibitsArray = useSelector((state: RootState) => state.exhibit.exhibitions);
    const totalPageFromExhibitSlice = useSelector((state: RootState) => state.exhibit.totalPage);
    const currentUser = useSelector((state: RootState) => state.user.username);
    const url = useSelector((state: RootState) => state.exhibit.url);

    const [exhibitions, setExhibitions] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedExhibitId, setSelectedExhibitId] = useState<number | null>(null);

    const setCurrentPageHandler = (currentPage: number) => {
        setCurrentPage(currentPage);
    };

    useSocket(currentPage, url, () => {
        dispatch(fetchExhibits({ currentPage, url }));
    });

    useEffect(() => {
        dispatch(checkUser());
    }, []);

    useEffect(() => {
        setSelectedExhibitId(null);
        dispatch(fetchExhibits({ currentPage: 1, url }));

        setExhibitions(exhibitsArray);
        setCurrentPage(1);
    }, [url]);

    useEffect(() => {
        setExhibitions(exhibitsArray);
        setTotalPage(totalPageFromExhibitSlice);
    }, [exhibitsArray]);

    useEffect(() => {
        dispatch(fetchExhibits({ currentPage, url }));
    }, [currentPage]);

    const deleteExhibitHandler = async (id: number) => {
        await deleteExhibition(id);
        dispatch(fetchExhibits({ currentPage, url }));
    };

    const toggleComments = (id: number) => {
        setSelectedExhibitId(selectedExhibitId === id ? null : id);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ px: 10, py: 1 }}>
                {exhibitions.length > 0 ? (
                    exhibitions.map((exhibition: IExhibition, index: number) => (
                        <PostItem
                            deleteExhibitHandler={deleteExhibitHandler}
                            exhibition={exhibition}
                            key={index}
                            index={index}
                            toggleComments={toggleComments}
                            selectedExhibitId={selectedExhibitId}
                            currentUser={currentUser}
                        />
                    ))
                ) : (
                    <p>No exhibitions found</p>
                )}
            </Grid>
            {totalPage > 1 ? (
                <PaginationFooter lastPage={totalPage} currentPageHandler={setCurrentPageHandler} currentPage={currentPage} />
            ) : (
                ""
            )}
        </Box>
    );
};

export default HomePage;
