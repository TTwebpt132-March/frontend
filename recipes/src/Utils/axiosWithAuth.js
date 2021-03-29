import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('authToken');
    return axios.create({
        baseURL: "https://recipeslambda.herokuapp.com",
        header: { Authorization: token }
    })
}

export default axiosWithAuth;