import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://a3-jcharante-api.glitch.me',
});

export default async ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
