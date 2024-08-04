import { axios } from "./apiMiddleware";
import { BASE_URL } from '../globals';
import { AxiosInstance } from "axios";

const AUTH_URL: string = `${BASE_URL}/api/admin/login`;

const newAxios: AxiosInstance = axios.create({
    baseURL: AUTH_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

newAxios.interceptors.request = axios.interceptors.request;

export default newAxios;
