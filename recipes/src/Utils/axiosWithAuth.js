import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('authToken');
    return axios.create({
        baseURL: "https://reqres.in/api/login",
        header: { Authorization: token }
    })
}