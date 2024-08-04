import axios from 'axios';
import { getToken } from '../actions';

const interceptor = () => {
    axios.interceptors.request.use((config) => {
        const token = getToken();

        if (token && config?.headers) {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    });
};

export { interceptor, axios };
