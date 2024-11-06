import axiosInstance from "./axiosInstance";

export const getUserInformation = async () => {
    return await axiosInstance.get(`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/users/my-profile`);
}