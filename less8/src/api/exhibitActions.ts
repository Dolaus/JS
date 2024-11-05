import axiosInstance from "./axiosInstance";

export const getAllExhibitions = async (page: number, limit: number) => {
    const response = await axiosInstance.get(`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/exhibits?page=${page}&limit=${limit}`);
    return response.data;
}
