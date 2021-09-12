import axios from "axios";


const API_BASE_URL = 'http://localhost:4000/';
// export const API_BASE_URL = 'https://blueskyapi.herokuapp.com/';

const fetchUser = async () => {
    const response = await axios(`${API_BASE_URL}users/`);
    return response.data;
};

const fetchNews = async () => {
    const response = await axios(`${API_BASE_URL}news/`);
    return response.data;
};


export {API_BASE_URL, fetchUser, fetchNews}
