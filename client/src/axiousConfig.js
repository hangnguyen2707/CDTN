import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    // withCredentials: true
});

instance.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1,-1)
    console.log(token)
    config.headers = {
        Authorization: token ? `${token}` : null 
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default instance;
