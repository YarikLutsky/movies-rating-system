import { axios } from "./apiMiddleware";
import { BASE_URL } from '../globals';
import { AxiosInstance } from "axios";

const MOVIES_URL: string = `${BASE_URL}/api/admin/GetMovies/`;

const newAxios: AxiosInstance = axios.create({
    baseURL: MOVIES_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

newAxios.interceptors.request = axios.interceptors.request;

export default newAxios;
