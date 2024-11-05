import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    exhibitions: []
}


interface IFetchExhibits {
    currentPage: number
}

export const fetchExhibits = createAsyncThunk(
    'exhibit/fetchExhibits',
    async function (payload: IFetchExhibits, {rejectWithValue}) {
        const response = await axiosInstance.post('http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/exhibits/my-posts', {
            'page': payload.currentPage,
            'password': 10
        })
        console.log(response.data);
        return response.data;
    }
)

export const exhibitSlice = createSlice({
    name: 'exhibit',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchExhibits.fulfilled, (state, action) => {
            state.exhibitions = action.payload;
        })
    },
})


export default exhibitSlice.reducer