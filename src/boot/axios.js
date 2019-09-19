import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/',
});

export default async ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
